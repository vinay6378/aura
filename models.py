from extensions import db
from flask_login import UserMixin
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    last_login = db.Column(db.DateTime)
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.username}>'

class ContactMessage(db.Model):
    """Contact form submissions"""
    __tablename__ = "contact_messages"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    read_at = db.Column(db.DateTime)
    is_archived = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), default='new')  # new, pending, responded, closed
    priority = db.Column(db.String(10), default='medium')  # high, medium, low
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<ContactMessage {self.name} - {self.subject}>'

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255))
    category = db.Column(db.String(100))
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    location = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f"<Event {self.title}>"

class ChatbotConversation(db.Model):
    """Store AI chatbot conversations with users"""
    __tablename__ = "chatbot_conversations"
    
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(120))
    user_phone = db.Column(db.String(20))
    user_email = db.Column(db.String(120))
    service_requested = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')  # active, completed, follow_up
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    last_activity = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationship with messages
    messages = db.relationship('ChatbotMessage', backref='conversation', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<ChatbotConversation {self.user_name or "Anonymous"} - {self.service_requested}>'

class ChatbotMessage(db.Model):
    """Individual messages in chatbot conversations"""
    __tablename__ = "chatbot_messages"
    
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('chatbot_conversations.id'), nullable=False)
    sender = db.Column(db.String(20), nullable=False)  # 'user' or 'bot'
    message_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<ChatbotMessage {self.sender}: {self.message_text[:50]}...>'

class PageView(db.Model):
    """Track page views for analytics"""
    __tablename__ = "page_views"
    
    id = db.Column(db.Integer, primary_key=True)
    page_url = db.Column(db.String(500), nullable=False)
    page_title = db.Column(db.String(200))
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    referrer = db.Column(db.String(500))
    session_id = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationship
    user = db.relationship('User', backref='page_views')
    
    def __repr__(self):
        return f'<PageView {self.page_url} at {self.created_at}>'

class VisitorSession(db.Model):
    """Track visitor sessions"""
    __tablename__ = "visitor_sessions"
    
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), unique=True, nullable=False)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    start_time = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    last_activity = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    page_views_count = db.Column(db.Integer, default=0)
    duration_seconds = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    is_bounce = db.Column(db.Boolean, default=False)
    
    # Relationship
    user = db.relationship('User', backref='sessions')
    
    def __repr__(self):
        return f'<VisitorSession {self.session_id} - {self.page_views_count} views>'

class NewsletterSubscriber(db.Model):
    """Newsletter subscribers"""
    __tablename__ = "newsletter_subscribers"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    name = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')  # active, unsubscribed
    subscribed_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    unsubscribed_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<NewsletterSubscriber {self.email} - {self.status}>'

class BlogCategory(db.Model):
    """Blog categories"""
    __tablename__ = "blog_categories"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationship
    posts = db.relationship('BlogPost', backref='category', lazy=True)
    
    def __repr__(self):
        return f'<BlogCategory {self.name}>'

class BlogPost(db.Model):
    """Blog posts"""
    __tablename__ = "blog_posts"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    featured_image = db.Column(db.String(500))
    meta_title = db.Column(db.String(200))
    meta_description = db.Column(db.Text)
    status = db.Column(db.String(20), default='draft')  # draft, published
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('blog_categories.id'), nullable=True)
    published_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    author = db.relationship('User', backref='blog_posts')
    
    def __repr__(self):
        return f'<BlogPost {self.title}>'

class PortfolioItem(db.Model):
    """Portfolio/Case study items"""
    __tablename__ = "portfolio_items"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    client_name = db.Column(db.String(200))
    project_url = db.Column(db.String(500))
    featured_image = db.Column(db.String(500))
    gallery_images = db.Column(db.JSON)  # Array of image URLs
    services_used = db.Column(db.JSON)  # Array of service IDs/names
    meta_title = db.Column(db.String(200))
    meta_description = db.Column(db.Text)
    status = db.Column(db.String(20), default='draft')
    featured = db.Column(db.Boolean, default=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationship
    author = db.relationship('User', backref='portfolio_items')
    
    def __repr__(self):
        return f'<PortfolioItem {self.title}>'

class Testimonial(db.Model):
    """Client testimonials"""
    __tablename__ = "testimonials"
    
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(200), nullable=False)
    client_company = db.Column(db.String(200))
    client_avatar = db.Column(db.String(500))
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=5)
    project_id = db.Column(db.Integer, db.ForeignKey('portfolio_items.id'), nullable=True)
    featured = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), default='published')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationship
    project = db.relationship('PortfolioItem', backref='testimonials')
    
    def __repr__(self):
        return f'<Testimonial {self.client_name}>'

class TeamMember(db.Model):
    """Team members"""
    __tablename__ = "team_members"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(200))
    bio = db.Column(db.Text)
    image = db.Column(db.String(500))
    linkedin_url = db.Column(db.String(500))
    twitter_url = db.Column(db.String(500))
    order = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='published')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<TeamMember {self.name}>'

class SiteSettings(db.Model):
    """Site-wide settings"""
    __tablename__ = "site_settings"
    
    id = db.Column(db.Integer, primary_key=True)
    site_name = db.Column(db.String(200))
    site_tagline = db.Column(db.String(500))
    contact_email = db.Column(db.String(200))
    contact_phone = db.Column(db.String(50))
    address = db.Column(db.Text)
    facebook_url = db.Column(db.String(500))
    twitter_url = db.Column(db.String(500))
    linkedin_url = db.Column(db.String(500))
    instagram_url = db.Column(db.String(500))
    google_analytics_id = db.Column(db.String(50))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<SiteSettings {self.site_name}>'

class EmailCampaign(db.Model):
    """Email marketing campaigns"""
    __tablename__ = "email_campaigns"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='draft')  # draft, scheduled, sent
    scheduled_for = db.Column(db.DateTime)
    sent_at = db.Column(db.DateTime)
    total_recipients = db.Column(db.Integer, default=0)
    opened_count = db.Column(db.Integer, default=0)
    clicked_count = db.Column(db.Integer, default=0)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationship
    creator = db.relationship('User', backref='email_campaigns')
    
    def __repr__(self):
        return f'<EmailCampaign {self.name}>'
