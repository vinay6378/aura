from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from datetime import timedelta
import sqlite3
import bcrypt
import os
import re
import requests
from functools import wraps
from bleach import clean
from marshmallow import Schema, fields, ValidationError, validate
from analytics import AnalyticsManager, SEOManager

app = Flask(__name__)

# Security Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'change_this_in_production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['DATABASE'] = os.environ.get('DATABASE_URL', 'aura.db')
app.config['GOOGLE_ANALYTICS_PROPERTY_ID'] = os.environ.get('GA4_PROPERTY_ID', '')
app.config['N8N_WEBHOOK_URL'] = os.environ.get('N8N_WEBHOOK_URL', '')
app.config['GUMLOOP_WEBHOOK_URL'] = os.environ.get('GUMLOOP_WEBHOOK_URL', '')

# Security Headers
Talisman(app, force_https=True, strict_transport_security=True)

# CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
        "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Rate Limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

jwt = JWTManager(app)

# Input Validation Schemas
class ContactSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    phone = fields.Str(validate=validate.Length(max=20))
    company = fields.Str(validate=validate.Length(max=100))
    service = fields.Str(validate=validate.Length(max=50))
    subject = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    message = fields.Str(required=True, validate=validate.Length(min=1, max=5000))

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

class SignupSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

# Database initialization
def init_db():
    conn = sqlite3.connect(app.config['DATABASE'])
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Contacts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            service TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            enriched_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Analytics cache table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analytics_cache (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            metric_type TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create default admin user if not exists
    cursor.execute('SELECT * FROM users WHERE email = ?', ('admin@auraofficial.in',))
    if not cursor.fetchone():
        password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        cursor.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ('Admin User', 'admin@auraofficial.in', password_hash, 'admin')
        )
    
    conn.commit()
    conn.close()

# Database helper with connection pooling
def get_db_connection():
    conn = sqlite3.connect(app.config['DATABASE'], check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

# Input sanitization
def sanitize_input(text):
    """Sanitize input to prevent XSS attacks"""
    if text is None:
        return None
    return clean(text, tags=[], attributes={}, strip=True)

# Error handler
def handle_error(e, message="An error occurred"):
    print(f"Error: {e}")
    return jsonify({'error': message}), 500

# Webhook trigger for automation
def trigger_automation_webhook(contact_data, webhook_type):
    """Trigger n8n or Gumloop webhook for automation"""
    webhook_url = None
    
    if webhook_type == 'n8n' and app.config['N8N_WEBHOOK_URL']:
        webhook_url = app.config['N8N_WEBHOOK_URL']
    elif webhook_type == 'gumloop' and app.config['GUMLOOP_WEBHOOK_URL']:
        webhook_url = app.config['GUMLOOP_WEBHOOK_URL']
    
    if webhook_url:
        try:
            response = requests.post(webhook_url, json=contact_data, timeout=5)
            return response.status_code == 200
        except Exception as e:
            print(f"Webhook error: {e}")
            return False
    return False

# Phase 1: Contact Form Data Flow - FIXED
@app.route('/api/contacts', methods=['POST'])
@limiter.limit("10 per minute")
def create_contact():
    """Create contact with proper validation and sanitization"""
    try:
        schema = ContactSchema()
        data = schema.load(request.json)
        
        # Sanitize all text inputs
        sanitized_data = {
            'name': sanitize_input(data['name']),
            'email': sanitize_input(data['email']),
            'phone': sanitize_input(data.get('phone', '')),
            'company': sanitize_input(data.get('company', '')),
            'service': sanitize_input(data.get('service', 'General Inquiry')),
            'subject': sanitize_input(data['subject']),
            'message': sanitize_input(data['message'])
        }
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contacts (name, email, phone, company, service, subject, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            sanitized_data['name'],
            sanitized_data['email'],
            sanitized_data['phone'],
            sanitized_data['company'],
            sanitized_data['service'],
            sanitized_data['subject'],
            sanitized_data['message']
        ))
        conn.commit()
        contact_id = cursor.lastrowid
        conn.close()
        
        # Prepare data for automation
        automation_data = {
            'contact_id': contact_id,
            'name': sanitized_data['name'],
            'email': sanitized_data['email'],
            'phone': sanitized_data['phone'],
            'company': sanitized_data['company'],
            'service': sanitized_data['service'],
            'subject': sanitized_data['subject'],
            'message': sanitized_data['message'],
            'timestamp': str(timedelta(hours=24))
        }
        
        # Trigger automation webhooks
        trigger_automation_webhook(automation_data, 'n8n')
        trigger_automation_webhook(automation_data, 'gumloop')
        
        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully',
            'contact_id': contact_id
        }), 201
        
    except ValidationError as e:
        return jsonify({'error': 'Validation failed', 'details': e.messages}), 400
    except Exception as e:
        return handle_error(e, 'Failed to submit contact form')

@app.route('/api/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    """Get contacts with optional status filter"""
    status = request.args.get('status', 'all')
    conn = get_db_connection()
    
    query = 'SELECT * FROM contacts'
    params = []
    
    if status != 'all':
        query += ' WHERE status = ?'
        params.append(status)
    
    query += ' ORDER BY created_at DESC'
    
    contacts = conn.execute(query, params).fetchall()
    conn.close()
    
    return jsonify({
        'contacts': [dict(contact) for contact in contacts]
    })

@app.route('/api/contacts', methods=['DELETE'])
@jwt_required()
def delete_contact():
    """Delete contact by ID"""
    contact_id = request.args.get('id')
    
    if not contact_id:
        return jsonify({'error': 'Contact ID required'}), 400
    
    conn = get_db_connection()
    try:
        conn.execute('DELETE FROM contacts WHERE id = ?', (contact_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return handle_error(e, 'Failed to delete contact')

@app.route('/api/contacts', methods=['PATCH'])
@jwt_required()
def update_contact_status():
    """Update contact status"""
    data = request.json
    contact_id = data.get('id')
    new_status = data.get('status')
    
    if not contact_id or not new_status:
        return jsonify({'error': 'ID and status required'}), 400
    
    valid_statuses = ['pending', 'in_review', 'contacted', 'completed']
    if new_status not in valid_statuses:
        return jsonify({'error': 'Invalid status'}), 400
    
    conn = get_db_connection()
    try:
        conn.execute('UPDATE contacts SET status = ? WHERE id = ?', (new_status, contact_id))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return handle_error(e, 'Failed to update status')

# Phase 2: Security Hardened Authentication
@app.route('/api/auth', methods=['POST'])
@limiter.limit("5 per minute")
def auth():
    """Authentication with rate limiting and bcrypt"""
    action = request.json.get('action')
    
    if action == 'login':
        return login()
    elif action == 'signup':
        return signup()
    else:
        return jsonify({'error': 'Invalid action'}), 400

def login():
    """Login with bcrypt password verification"""
    try:
        schema = LoginSchema()
        data = schema.load(request.json)
        
        email = sanitize_input(data['email'])
        password = data['password']
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verify password using bcrypt
        stored_password = user['password'].encode('utf-8') if isinstance(user['password'], str) else user['password']
        if not bcrypt.checkpw(password.encode('utf-8'), stored_password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'token': access_token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role']
            }
        })
        
    except ValidationError as e:
        return jsonify({'error': 'Validation failed', 'details': e.messages}), 400
    except Exception as e:
        return handle_error(e, 'Login failed')

def signup():
    """Signup with bcrypt password hashing"""
    try:
        schema = SignupSchema()
        data = schema.load(request.json)
        
        name = sanitize_input(data['name'])
        email = sanitize_input(data['email'])
        password = data['password']
        
        conn = get_db_connection()
        
        # Check if user exists
        existing = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        if existing:
            conn.close()
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password using bcrypt
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        try:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                (name, email, password_hash, 'admin')
            )
            conn.commit()
            user_id = cursor.lastrowid
            conn.close()
            
            access_token = create_access_token(identity=user_id)
            
            return jsonify({
                'token': access_token,
                'user': {
                    'id': user_id,
                    'name': name,
                    'email': email,
                    'role': 'admin'
                }
            })
        except Exception as e:
            conn.close()
            return handle_error(e, 'Registration failed')
            
    except ValidationError as e:
        return jsonify({'error': 'Validation failed', 'details': e.messages}), 400
    except Exception as e:
        return handle_error(e, 'Registration failed')

@app.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    """Get dashboard statistics"""
    conn = get_db_connection()
    
    # Get counts by status
    stats = conn.execute('''
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'in_review' THEN 1 ELSE 0 END) as in_review,
            SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
        FROM contacts
    ''').fetchone()
    
    # Get service breakdown
    services = conn.execute('''
        SELECT service, COUNT(*) as count 
        FROM contacts 
        GROUP BY service 
        ORDER BY count DESC
    ''').fetchall()
    
    # Get timeline
    timeline = conn.execute('''
        SELECT 
            DATE(created_at) as date,
            COUNT(*) as count
        FROM contacts
        GROUP BY DATE(created_at)
        ORDER BY date DESC
        LIMIT 30
    ''').fetchall()
    
    conn.close()
    
    return jsonify({
        'totalInquiries': stats['total'] or 0,
        'pendingInquiries': stats['pending'] or 0,
        'inReview': stats['in_review'] or 0,
        'contacted': stats['contacted'] or 0,
        'completed': stats['completed'] or 0,
        'serviceBreakdown': [
            {'service': s['service'], 'count': s['count']} 
            for s in services
        ],
        'timeline': [
            {'date': t['date'], 'count': t['count']} 
            for t in timeline
        ]
    })

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    """Get all admin users"""
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return jsonify({
        'users': [dict(user) for user in users]
    })

@app.route('/api/users', methods=['DELETE'])
@jwt_required()
def delete_user():
    """Delete admin user"""
    user_id = request.args.get('id')
    
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400
    
    # Prevent deleting the last admin
    conn = get_db_connection()
    admin_count = conn.execute("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").fetchone()['count']
    
    if admin_count <= 1:
        conn.close()
        return jsonify({'error': 'Cannot delete the last admin'}), 400
    
    try:
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return handle_error(e, 'Failed to delete user')

# Phase 3: Google Analytics 4 Integration
@app.route('/api/analytics/traffic', methods=['GET'])
@jwt_required()
def get_analytics_traffic():
    """Get traffic data from Google Analytics 4"""
    try:
        days = request.args.get('days', 7, type=int)
        traffic_data = analytics_manager.get_traffic_overview(days)
        return jsonify(traffic_data)
    except Exception as e:
        return handle_error(e, 'Failed to fetch analytics data')

@app.route('/api/analytics/traffic-sources', methods=['GET'])
@jwt_required()
def get_traffic_sources():
    """Get traffic sources breakdown"""
    try:
        days = request.args.get('days', 30, type=int)
        sources = analytics_manager.get_traffic_sources(days)
        return jsonify({'sources': sources})
    except Exception as e:
        return handle_error(e, 'Failed to fetch traffic sources')

@app.route('/api/analytics/top-pages', methods=['GET'])
@jwt_required()
def get_top_pages():
    """Get top performing pages"""
    try:
        days = request.args.get('days', 30, type=int)
        limit = request.args.get('limit', 10, type=int)
        pages = analytics_manager.get_top_pages(days, limit)
        return jsonify({'pages': pages})
    except Exception as e:
        return handle_error(e, 'Failed to fetch top pages')

@app.route('/api/analytics/devices', methods=['GET'])
@jwt_required()
def get_device_breakdown():
    """Get device category breakdown"""
    try:
        days = request.args.get('days', 30, type=int)
        devices = analytics_manager.get_device_breakdown(days)
        return jsonify({'devices': devices})
    except Exception as e:
        return handle_error(e, 'Failed to fetch device breakdown')

@app.route('/api/analytics/locations', methods=['GET'])
@jwt_required()
def get_location_data():
    """Get geographic location data"""
    try:
        days = request.args.get('days', 30, type=int)
        limit = request.args.get('limit', 20, type=int)
        locations = analytics_manager.get_location_data(days, limit)
        return jsonify({'locations': locations})
    except Exception as e:
        return handle_error(e, 'Failed to fetch location data')

@app.route('/api/analytics/seo', methods=['GET'])
@jwt_required()
def get_seo_metrics():
    """Get SEO metrics"""
    try:
        days = request.args.get('days', 30, type=int)
        seo_data = seo_manager.get_seo_overview(days)
        return jsonify(seo_data)
    except Exception as e:
        return handle_error(e, 'Failed to fetch SEO metrics')

# Phase 4: Automation Webhooks
@app.route('/api/webhooks/n8n', methods=['POST'])
def n8n_webhook():
    """Webhook endpoint for n8n automation"""
    try:
        data = request.json
        # Process webhook data from n8n
        # This can be used for bidirectional communication
        return jsonify({'success': True, 'message': 'Webhook received'}), 200
    except Exception as e:
        return handle_error(e, 'Webhook processing failed')

@app.route('/api/webhooks/gumloop', methods=['POST'])
def gumloop_webhook():
    """Webhook endpoint for Gumloop automation"""
    try:
        data = request.json
        # Process webhook data from Gumloop
        return jsonify({'success': True, 'message': 'Webhook received'}), 200
    except Exception as e:
        return handle_error(e, 'Webhook processing failed')

@app.route('/api/automation/lead-enrich', methods=['POST'])
@jwt_required()
def enrich_lead():
    """Trigger lead enrichment automation"""
    try:
        contact_id = request.json.get('contact_id')
        if not contact_id:
            return jsonify({'error': 'Contact ID required'}), 400
        
        conn = get_db_connection()
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        # Trigger enrichment webhook
        contact_data = dict(contact)
        success = trigger_automation_webhook(contact_data, 'n8n')
        
        if success:
            return jsonify({'success': True, 'message': 'Lead enrichment triggered'})
        else:
            return jsonify({'error': 'Failed to trigger enrichment'}), 500
            
    except Exception as e:
        return handle_error(e, 'Lead enrichment failed')

@app.route('/api/automation/send-email', methods=['POST'])
@jwt_required()
def send_automated_email():
    """Trigger automated email campaign"""
    try:
        contact_id = request.json.get('contact_id')
        template = request.json.get('template', 'default')
        
        if not contact_id:
            return jsonify({'error': 'Contact ID required'}), 400
        
        conn = get_db_connection()
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        # Prepare email data
        email_data = {
            'contact': dict(contact),
            'template': template,
            'timestamp': str(timedelta(hours=24))
        }
        
        # Trigger email automation webhook
        success = trigger_automation_webhook(email_data, 'gumloop')
        
        if success:
            return jsonify({'success': True, 'message': 'Email automation triggered'})
        else:
            return jsonify({'error': 'Failed to trigger email automation'}), 500
            
    except Exception as e:
        return handle_error(e, 'Email automation failed')

@app.route('/api/automation/social-post', methods=['POST'])
@jwt_required()
def create_social_post():
    """Trigger social media post automation"""
    try:
        project_data = request.json
        if not project_data:
            return jsonify({'error': 'Project data required'}), 400
        
        # Trigger social media automation webhook
        success = trigger_automation_webhook(project_data, 'n8n')
        
        if success:
            return jsonify({'success': True, 'message': 'Social media automation triggered'})
        else:
            return jsonify({'error': 'Failed to trigger social media automation'}), 500
            
    except Exception as e:
        return handle_error(e, 'Social media automation failed')

# Initialize Analytics Manager
analytics_manager = AnalyticsManager(
    property_id=app.config['GOOGLE_ANALYTICS_PROPERTY_ID'],
    credentials_path=os.environ.get('GA4_CREDENTIALS_PATH')
)

seo_manager = SEOManager()

if __name__ == '__main__':
    init_db()
    app.run(debug=False, host='0.0.0.0', port=5000)
