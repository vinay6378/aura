# main/routes.py
from flask import Blueprint, render_template,request, redirect, url_for, flash, current_app, jsonify
from datetime import datetime, timezone
from models import ContactMessage, Event, User, NewsletterSubscriber
from extensions import db, mail
from flask_login import login_user
from lib.email import EmailService

bp = Blueprint('main', __name__, template_folder='../templates')

# Initialize email service
email_service = None

def get_email_service():
    global email_service
    if email_service is None:
        email_service = EmailService(mail)
    return email_service

@bp.route('/')
def index():
    return render_template("index.html", title="Aura — One Company. Three Superpowers.")

@bp.route('/about')
def about():
    return render_template("about.html", title="About Us")

@bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form.get('phone', '')  # Optional field
        inquiry_type = request.form.get('inquiry_type', 'general')  # Get inquiry type
        message = request.form['message']
        
        # Create subject from inquiry type
        subject_map = {
            'general': 'General Inquiry',
            'web': 'Web Development Inquiry',
            'software': 'Software Development Inquiry',
            'marketing': 'Digital Marketing Inquiry',
            'support': 'Technical Support',
            'partnership': 'Partnership Opportunity'
        }
        subject = subject_map.get(inquiry_type, 'General Inquiry')
        
        # Save to database
        new_msg = ContactMessage(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message
        )
        
        db.session.add(new_msg)
        db.session.commit()
        
        # Send email notification using new email service
        email_svc = get_email_service()
        contact_data = {
            'name': name,
            'email': email,
            'phone': phone,
            'subject': subject,
            'message': message
        }
        
        # Send notification to admin
        email_svc.send_contact_notification(contact_data)
        
        # Send auto-reply to user
        email_svc.send_auto_reply(contact_data)

        flash('Your message has been sent successfully! We will get back to you soon.', 'success')
        return redirect(url_for('main.contact'))

    return render_template('contact.html')

@bp.route('/ai-chat', methods=['POST'])
def ai_chat():
    """AI Chat endpoint for chatbot"""
    try:
        user_message = request.json.get('message', '')
        # Simple AI response logic - can be enhanced with OpenAI API
        responses = {
            'hi': 'Hello! How can I help you today?',
            'hello': 'Hi there! Welcome to Aura. How can we assist you?',
            'services': 'We offer web development, software development, and digital marketing services. Which interests you?',
            'price': 'Please contact us for customized pricing based on your requirements.',
            'default': 'Thank you for your message! Our team will get back to you shortly. For urgent inquiries, please email ''vs8890864@gmail.com'
        }
        
        user_lower = user_message.lower()
        for key in responses:
            if key in user_lower:
                return jsonify({'response': responses[key]})
        
        return jsonify({'response': responses['default']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/events')
def events():
    events = Event.query.all()
    return render_template("events.html", events=events)

@bp.route('/webdev')
def webdev():
    return render_template("webdev.html", title="Web Development")

@bp.route('/software')
def software():
    return render_template("software.html", title="Software Development")

@bp.route('/marketing')
def marketing():
    return render_template("marketing.html", title="Marketing Services")

# Digital Marketing Specific Routes
@bp.route('/seo')
def seo():
    return render_template("seo.html", title="SEO Services")

@bp.route('/social-media')
def social_media():
    return render_template("social_media.html", title="Social Media Marketing")

@bp.route('/ppc')
def ppc():
    return render_template("ppc.html", title="PPC & Google Ads")

@bp.route('/content-marketing')
def content_marketing():
    return render_template("content_marketing.html", title="Content Marketing")

@bp.route('/marketing-analytics')
def marketing_analytics():
    return render_template("marketing_analytics.html", title="Marketing Analytics")

@bp.route('/services')
def services():
    return render_template("services.html", title="Our Services")

# Newsletter Routes
@bp.route('/newsletter/subscribe', methods=['POST'])
def newsletter_subscribe():
    """Subscribe to newsletter"""
    email = request.form.get('email')
    name = request.form.get('name', '')
    
    if not email:
        flash('Email address is required.', 'error')
        return redirect(request.referrer or url_for('main.index'))
    
    # Check if already subscribed
    existing = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing:
        if existing.status == 'unsubscribed':
            existing.status = 'active'
            existing.subscribed_at = datetime.now(timezone.utc)
            existing.unsubscribed_at = None
            db.session.commit()
            flash('You have been resubscribed to our newsletter!', 'success')
        else:
            flash('You are already subscribed to our newsletter.', 'info')
    else:
        subscriber = NewsletterSubscriber(email=email, name=name)
        db.session.add(subscriber)
        db.session.commit()
        
        # Send welcome email
        email_svc = get_email_service()
        subscriber_data = {'email': email, 'name': name}
        email_svc.send_newsletter_welcome(subscriber_data)
        
        flash('Thank you for subscribing to our newsletter!', 'success')
    
    return redirect(request.referrer or url_for('main.index'))

@bp.route('/newsletter/unsubscribe', methods=['POST'])
def newsletter_unsubscribe():
    """Unsubscribe from newsletter"""
    email = request.form.get('email')
    
    if not email:
        flash('Email address is required.', 'error')
        return redirect(request.referrer or url_for('main.index'))
    
    subscriber = NewsletterSubscriber.query.filter_by(email=email).first()
    
    if subscriber:
        subscriber.status = 'unsubscribed'
        subscriber.unsubscribed_at = datetime.now(timezone.utc)
        db.session.commit()
        flash('You have been unsubscribed from our newsletter.', 'success')
    else:
        flash('Email not found in our mailing list.', 'error')
    
    return redirect(request.referrer or url_for('main.index'))

# SEO Routes
@bp.route('/sitemap.xml')
def sitemap():
    """Generate dynamic sitemap.xml"""
    from flask import Response
    import xml.etree.ElementTree as ET
    
    base_url = request.host_url.rstrip('/')
    
    # Static pages
    pages = [
        {'loc': f'{base_url}/', 'changefreq': 'weekly', 'priority': '1.0'},
        {'loc': f'{base_url}/about', 'changefreq': 'monthly', 'priority': '0.8'},
        {'loc': f'{base_url}/services', 'changefreq': 'weekly', 'priority': '0.9'},
        {'loc': f'{base_url}/contact', 'changefreq': 'monthly', 'priority': '0.7'},
    ]
    
    # Blog posts
    blog_posts = BlogPost.query.filter_by(status='published').all()
    for post in blog_posts:
        pages.append({
            'loc': f"{base_url}/blog/{post.slug}",
            'changefreq': 'weekly',
            'priority': '0.7',
            'lastmod': post.updated_at.strftime('%Y-%m-%d') if post.updated_at else None
        })
    
    # Portfolio items
    portfolio_items = PortfolioItem.query.filter_by(status='published').all()
    for item in portfolio_items:
        pages.append({
            'loc': f"{base_url}/portfolio/{item.slug}",
            'changefreq': 'monthly',
            'priority': '0.6',
            'lastmod': item.updated_at.strftime('%Y-%m-%d') if item.updated_at else None
        })
    
    # Generate XML
    urlset = ET.Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
    
    for page in pages:
        url = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url, 'loc')
        loc.text = page['loc']
        
        if page.get('lastmod'):
            lastmod = ET.SubElement(url, 'lastmod')
            lastmod.text = page['lastmod']
        
        changefreq = ET.SubElement(url, 'changefreq')
        changefreq.text = page['changefreq']
        
        priority = ET.SubElement(url, 'priority')
        priority.text = str(page['priority'])
    
    xml_str = ET.tostring(urlset, encoding='utf-8', method='xml')
    
    return Response(xml_str, mimetype='application/xml')

@bp.route('/robots.txt')
def robots_txt():
    """Generate dynamic robots.txt"""
    robots_content = """User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

Sitemap: {}/sitemap.xml
""".format(request.host_url.rstrip('/'))
    
    return Response(robots_content, mimetype='text/plain')

# Favicon route
@bp.route('/favicon.ico')
def favicon():
    """Serve favicon"""
    from flask import send_from_directory
    return send_from_directory('static', 'img/favicon.ico')
