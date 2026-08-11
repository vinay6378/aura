# api/routes.py
from flask import Blueprint, request, jsonify
from flask_login import current_user
from models import ChatbotConversation, ChatbotMessage, PageView, VisitorSession, BlogPost, BlogCategory, PortfolioItem, Testimonial, TeamMember, ContactMessage, NewsletterSubscriber, db
from datetime import datetime, timezone
import uuid
from datetime import timedelta

api_bp = Blueprint('api', __name__)

@api_bp.route('/track/pageview', methods=['POST'])
def track_pageview():
    try:
        data = request.get_json()
        
        # Create or update visitor session
        session = VisitorSession.query.filter_by(session_id=data['session_id']).first()
        if not session:
            session = VisitorSession(
                session_id=data['session_id'],
                ip_address=request.remote_addr,
                user_agent=data.get('user_agent'),
                start_time=datetime.now(timezone.utc),
                last_activity=datetime.now(timezone.utc),
                page_views_count=1
            )
            db.session.add(session)
        else:
            session.last_activity = datetime.now(timezone.utc)
            session.page_views_count += 1
        
        # Create page view record
        page_view = PageView(
            page_url=data['page_url'],
            page_title=data.get('page_title'),
            ip_address=request.remote_addr,
            user_agent=data.get('user_agent'),
            referrer=data.get('referrer'),
            session_id=data['session_id']
        )
        
        db.session.add(page_view)
        db.session.commit()
        
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@api_bp.route('/track/event', methods=['POST'])
def track_event():
    try:
        data = request.get_json()
        # Store event data (you might want to create an Event model for this)
        # For now, just return success
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@api_bp.route('/analytics/realtime', methods=['GET'])
def realtime_analytics():
    try:
        # Get real-time statistics
        total_visitors = VisitorSession.query.count()
        total_page_views = PageView.query.count()
        active_sessions = VisitorSession.query.filter(
            VisitorSession.last_activity >= datetime.now(timezone.utc).replace(microsecond=0) - timedelta(minutes=30)
        ).count()
        
        return jsonify({
            'total_visitors': total_visitors,
            'total_page_views': total_page_views,
            'active_sessions': active_sessions,
            'timestamp': datetime.now(timezone.utc).isoformat()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now(timezone.utc).isoformat()
    })

@api_bp.route('/chatbot/save', methods=['POST'])
def save_chatbot_conversation():
    try:
        data = request.get_json()
        
        # Create new conversation
        conversation = ChatbotConversation(
            session_id=str(uuid.uuid4()),
            user_name=data.get('name'),
            user_email=data.get('email'),
            user_phone=data.get('phone'),
            service_requested=data.get('service'),
            status='active'
        )
        
        db.session.add(conversation)
        db.session.flush()  # Get the ID without committing
        
        # Add bot messages
        bot_messages = [
            "👋 Hello! I'm Aura Assistant, your friendly AI helper!",
            f"Nice to meet you, {data.get('name')}! 🎉",
            "What's your email address?",
            "Thank you! 📧",
            "What's your contact number?",
            "Thank you! 📞",
            "What service do you need?",
            f"Perfect! I've noted that you need {data.get('service')}. ✅",
            "Thank you for providing your information! Our team will contact you soon. 🚀"
        ]
        
        user_messages = [
            data.get('name'),
            data.get('email'),
            data.get('phone'),
            data.get('service')
        ]
        
        # Add conversation messages
        message_order = [
            ('bot', bot_messages[0]),
            ('user', data.get('name')),
            ('bot', bot_messages[1]),
            ('user', data.get('email')),
            ('bot', bot_messages[2]),
            ('bot', bot_messages[3]),
            ('user', data.get('phone')),
            ('bot', bot_messages[4]),
            ('bot', bot_messages[5]),
            ('bot', bot_messages[6]),
            ('user', data.get('service')),
            ('bot', bot_messages[7]),
            ('bot', bot_messages[8])
        ]
        
        for sender, message_text in message_order:
            message = ChatbotMessage(
                conversation_id=conversation.id,
                sender=sender,
                message_text=message_text
            )
            db.session.add(message)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'conversation_id': conversation.id,
            'message': 'Conversation saved successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Blog API Routes
@api_bp.route('/blog/posts', methods=['GET'])
def get_blog_posts():
    """Get all blog posts"""
    try:
        status = request.args.get('status', 'published')
        category_id = request.args.get('category_id')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        query = BlogPost.query
        
        if status == 'published':
            query = query.filter_by(status='published')
        
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        posts = query.order_by(BlogPost.published_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'posts': [{
                'id': post.id,
                'title': post.title,
                'slug': post.slug,
                'excerpt': post.excerpt,
                'featured_image': post.featured_image,
                'meta_title': post.meta_title,
                'meta_description': post.meta_description,
                'published_at': post.published_at.isoformat() if post.published_at else None,
                'category': {
                    'id': post.category.id,
                    'name': post.category.name,
                    'slug': post.category.slug
                } if post.category else None,
                'author': {
                    'id': post.author.id,
                    'username': post.author.username
                } if post.author else None
            } for post in posts.items],
            'total': posts.total,
            'pages': posts.pages,
            'current_page': posts.page
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@api_bp.route('/blog/posts/<slug>', methods=['GET'])
def get_blog_post(slug):
    """Get single blog post by slug"""
    try:
        post = BlogPost.query.filter_by(slug=slug, status='published').first_or_404()
        
        return jsonify({
            'id': post.id,
            'title': post.title,
            'slug': post.slug,
            'content': post.content,
            'excerpt': post.excerpt,
            'featured_image': post.featured_image,
            'meta_title': post.meta_title,
            'meta_description': post.meta_description,
            'published_at': post.published_at.isoformat() if post.published_at else None,
            'category': {
                'id': post.category.id,
                'name': post.category.name,
                'slug': post.category.slug
            } if post.category else None,
            'author': {
                'id': post.author.id,
                'username': post.author.username
            } if post.author else None
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 404

@api_bp.route('/blog/categories', methods=['GET'])
def get_blog_categories():
    """Get all blog categories"""
    try:
        categories = BlogCategory.query.all()
        
        return jsonify({
            'categories': [{
                'id': cat.id,
                'name': cat.name,
                'slug': cat.slug,
                'description': cat.description
            } for cat in categories]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Portfolio API Routes
@api_bp.route('/portfolio/items', methods=['GET'])
def get_portfolio_items():
    """Get all portfolio items"""
    try:
        status = request.args.get('status', 'published')
        featured = request.args.get('featured')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        query = PortfolioItem.query
        
        if status == 'published':
            query = query.filter_by(status='published')
        
        if featured == 'true':
            query = query.filter_by(featured=True)
        
        items = query.order_by(PortfolioItem.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'items': [{
                'id': item.id,
                'title': item.title,
                'slug': item.slug,
                'description': item.description,
                'client_name': item.client_name,
                'project_url': item.project_url,
                'featured_image': item.featured_image,
                'gallery_images': item.gallery_images,
                'services_used': item.services_used,
                'featured': item.featured,
                'meta_title': item.meta_title,
                'meta_description': item.meta_description,
                'created_at': item.created_at.isoformat() if item.created_at else None
            } for item in items.items],
            'total': items.total,
            'pages': items.pages,
            'current_page': items.page
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@api_bp.route('/portfolio/items/<slug>', methods=['GET'])
def get_portfolio_item(slug):
    """Get single portfolio item by slug"""
    try:
        item = PortfolioItem.query.filter_by(slug=slug, status='published').first_or_404()
        
        return jsonify({
            'id': item.id,
            'title': item.title,
            'slug': item.slug,
            'description': item.description,
            'client_name': item.client_name,
            'project_url': item.project_url,
            'featured_image': item.featured_image,
            'gallery_images': item.gallery_images,
            'services_used': item.services_used,
            'featured': item.featured,
            'meta_title': item.meta_title,
            'meta_description': item.meta_description,
            'created_at': item.created_at.isoformat() if item.created_at else None,
            'testimonials': [{
                'id': t.id,
                'client_name': t.client_name,
                'client_company': t.client_company,
                'client_avatar': t.client_avatar,
                'content': t.content,
                'rating': t.rating
            } for t in item.testimonials if t.status == 'published']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 404

# Testimonials API
@api_bp.route('/testimonials', methods=['GET'])
def get_testimonials():
    """Get all testimonials"""
    try:
        featured = request.args.get('featured')
        
        query = Testimonial.query.filter_by(status='published')
        
        if featured == 'true':
            query = query.filter_by(featured=True)
        
        testimonials = query.order_by(Testimonial.created_at.desc()).all()
        
        return jsonify({
            'testimonials': [{
                'id': t.id,
                'client_name': t.client_name,
                'client_company': t.client_company,
                'client_avatar': t.client_avatar,
                'content': t.content,
                'rating': t.rating,
                'project_id': t.project_id
            } for t in testimonials]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Team API
@api_bp.route('/team', methods=['GET'])
def get_team_members():
    """Get all team members"""
    try:
        members = TeamMember.query.filter_by(status='published').order_by(TeamMember.order, TeamMember.name).all()
        
        return jsonify({
            'members': [{
                'id': m.id,
                'name': m.name,
                'role': m.role,
                'bio': m.bio,
                'image': m.image,
                'linkedin_url': m.linkedin_url,
                'twitter_url': m.twitter_url
            } for m in members]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Contact API
@api_bp.route('/contact', methods=['POST'])
def submit_contact_form():
    """Submit contact form via API"""
    try:
        data = request.get_json()
        
        # Save to database
        new_msg = ContactMessage(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            subject=data.get('subject'),
            message=data.get('message')
        )
        
        db.session.add(new_msg)
        db.session.commit()
        
        # Send email notification (simplified - could be enhanced)
        from lib.email import EmailService
        from extensions import mail
        email_svc = EmailService(mail)
        
        contact_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'subject': data.get('subject'),
            'message': data.get('message')
        }
        
        email_svc.send_contact_notification(contact_data)
        email_svc.send_auto_reply(contact_data)
        
        return jsonify({'success': True, 'message': 'Contact form submitted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Newsletter API
@api_bp.route('/newsletter/subscribe', methods=['POST'])
def newsletter_subscribe_api():
    """Subscribe to newsletter via API"""
    try:
        data = request.get_json()
        email = data.get('email')
        name = data.get('name', '')
        
        if not email:
            return jsonify({'success': False, 'error': 'Email is required'}), 400
        
        # Check if already subscribed
        existing = NewsletterSubscriber.query.filter_by(email=email).first()
        if existing:
            if existing.status == 'unsubscribed':
                existing.status = 'active'
                existing.subscribed_at = datetime.now(timezone.utc)
                existing.unsubscribed_at = None
                db.session.commit()
                return jsonify({'success': True, 'message': 'Resubscribed successfully'})
            else:
                return jsonify({'success': True, 'message': 'Already subscribed'})
        else:
            subscriber = NewsletterSubscriber(email=email, name=name)
            db.session.add(subscriber)
            db.session.commit()
            
            # Send welcome email
            from lib.email import EmailService
            from extensions import mail
            email_svc = EmailService(mail)
            email_svc.send_newsletter_welcome({'email': email, 'name': name})
            
            return jsonify({'success': True, 'message': 'Subscribed successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Chatbot Message API
@api_bp.route('/chatbot/message', methods=['POST'])
def chatbot_message():
    """AI-powered chatbot responses"""
    try:
        user_message = request.json.get('message', '')
        conversation_id = request.json.get('conversation_id')
        
        # Enhanced rule-based responses with better matching
        responses = {
            # Greetings
            'hi': 'Hello! 👋 Welcome to AURA Digital! How can I help you today?',
            'hello': 'Hi there! 😊 Welcome to AURA Digital. I\'m here to help you with web development, software solutions, and digital marketing services. What can I assist you with?',
            'hey': 'Hey! Welcome to AURA Digital! 🚀 How can I help you transform your business with technology?',
            
            # Services
            'web': 'We offer comprehensive web development services including custom websites, e-commerce solutions, web applications, and CMS development. Would you like to know more about any of these?',
            'app': 'We specialize in mobile app development for both iOS and Android platforms. Our team creates native and cross-platform apps using React Native, Flutter, and native technologies.',
            'software': 'Our software development services include custom enterprise solutions, SaaS products, API development, and system integration. We build scalable and secure software tailored to your needs.',
            'marketing': 'Our digital marketing services include SEO, PPC advertising, social media marketing, content marketing, and email campaigns. We help businesses grow their online presence and reach their target audience effectively.',
            'seo': 'SEO is one of our core services! We offer on-page SEO, technical SEO, link building, and local SEO to improve your search engine rankings and drive organic traffic to your website.',
            'ppc': 'We provide expert PPC campaign management on Google Ads, Facebook Ads, and other platforms. Our team focuses on maximizing ROI through strategic campaign optimization and data-driven decisions.',
            'social': 'Our social media marketing services include content creation, community management, paid social advertising, and social media strategy development to enhance your brand presence across all platforms.',
            
            # Pricing
            'price': 'Pricing varies based on project requirements and scope. We offer customized quotes for each project. Would you like to schedule a consultation to discuss your specific needs and get a detailed quote?',
            'cost': 'Our pricing is competitive and tailored to each project\'s requirements. We focus on delivering value and quality. Let\'s discuss your project details to provide you with an accurate estimate.',
            'budget': 'We work with various budget ranges and can provide solutions that fit your financial requirements. During our consultation, we\'ll recommend the best approach within your budget.',
            
            # Contact
            'contact': 'You can reach us through our contact form on the website, email us at vs8890864@gmail.com, or call us at +91 98765 43210. Our team typically responds within 24 hours.',
            'email': 'Our email address is vs8890864@gmail.com. Feel free to reach out with any questions or project inquiries!',
            'phone': 'You can call us at +91 98765 43210 during business hours (9 AM - 6 PM IST). For urgent inquiries, email is often the fastest way to reach us.',
            
            # Portfolio
            'portfolio': 'We have an impressive portfolio of successful projects across web development, mobile apps, and digital marketing. You can view our case studies on our website to see examples of our work and client success stories.',
            'work': 'We\'ve worked with clients across various industries including healthcare, finance, e-commerce, education, and more. Our portfolio showcases our expertise in delivering innovative solutions.',
            'clients': 'We\'ve had the privilege of working with startups, SMEs, and enterprise clients. Each project is unique, and we pride ourselves on delivering tailored solutions that meet our clients\' specific needs.',
            
            # Process
            'process': 'Our development process typically includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development, 4) Testing & Quality Assurance, 5) Deployment & Launch, 6) Maintenance & Support. We follow agile methodologies for flexibility and transparency.',
            'timeline': 'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while complex applications can take 2-6 months. During our consultation, we\'ll provide a detailed timeline based on your specific requirements.',
            
            # Support
            'support': 'We offer comprehensive post-launch support including bug fixes, updates, security patches, and feature enhancements. We provide various support packages to ensure your digital products continue to perform optimally.',
            'maintenance': 'Our maintenance services include regular updates, security monitoring, performance optimization, and content updates. We help ensure your digital assets remain secure, fast, and up-to-date.',
            
            # Default responses
            'default': 'Thank you for your message! 🙏 Our team at AURA Digital is here to help with web development, software solutions, and digital marketing. For immediate assistance, please email vs8890864@gmail.com or fill out our contact form. How else can I assist you today?',
            'default_short': 'I\'m here to help! Feel free to ask about our web development, software, or marketing services. You can also reach us directly at vs8890864@gmail.com for detailed inquiries.'
        }
        
        user_lower = user_message.lower().strip()
        
        # Check for matches with priority order
        for key in responses:
            if key in user_lower:
                return jsonify({'response': responses[key]})
        
        # If no match, check for partial matches or provide default
        if any(word in user_lower for word in ['help', 'assist', 'information', 'tell me']):
            return jsonify({'response': responses['default_short']})
        
        return jsonify({'response': responses['default']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Notifications API
@api_bp.route('/notifications', methods=['GET'])
def get_notifications():
    """Get admin notifications"""
    try:
        # Get recent unread messages (publicly accessible for demo)
        unread_messages = ContactMessage.query.filter_by(is_read=False).count()
        recent_messages = ContactMessage.query.filter_by(is_read=False).order_by(ContactMessage.created_at.desc()).limit(5).all()
        
        # Get active chatbot conversations
        active_conversations = ChatbotConversation.query.filter_by(status='active').count()
        
        return jsonify({
            'unread_messages': unread_messages,
            'recent_messages': [{
                'id': msg.id,
                'name': msg.name,
                'subject': msg.subject,
                'created_at': msg.created_at.isoformat() if msg.created_at else None
            } for msg in recent_messages],
            'active_conversations': active_conversations
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
