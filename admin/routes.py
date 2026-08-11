# admin/routes.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from models import User, ContactMessage, ChatbotConversation, ChatbotMessage, PageView, VisitorSession, BlogPost, BlogCategory, PortfolioItem, Testimonial, TeamMember, SiteSettings, EmailCampaign, NewsletterSubscriber, db
from datetime import datetime, timezone

admin_bp = Blueprint('admin', __name__)

# Admin access control
def admin_required(f):
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin:
            flash('Admin access required.', 'error')
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

@admin_bp.route('/')
@login_required
@admin_required
def admin_home():
    """Default admin route - redirect to dashboard"""
    return redirect(url_for('admin.dashboard'))

@admin_bp.route('/dashboard')
@login_required
@admin_required
def dashboard():
    """Admin dashboard with overview stats"""
    # Get statistics
    total_contacts = ContactMessage.query.count()
    unread_contacts = ContactMessage.query.filter_by(is_read=False).count()
    total_chatbot_conversations = ChatbotConversation.query.count()
    active_chatbot_conversations = ChatbotConversation.query.filter_by(status='active').count()
    total_page_views = PageView.query.count()
    total_sessions = VisitorSession.query.count()
    
    # Get message counts for template
    total_messages = ContactMessage.query.count()
    new_messages = ContactMessage.query.filter_by(status='new').count()
    pending_messages = ContactMessage.query.filter_by(status='pending').count()
    responded_messages = ContactMessage.query.filter_by(status='responded').count()
    closed_messages = ContactMessage.query.filter_by(status='closed').count()
    
    # Get recent activities
    recent_contacts = ContactMessage.query.order_by(ContactMessage.created_at.desc()).limit(5).all()
    recent_chatbot = ChatbotConversation.query.order_by(ChatbotConversation.created_at.desc()).limit(5).all()
    
    return render_template('admin/dashboard.html', 
                         total_contacts=total_contacts,
                         unread_contacts=unread_contacts,
                         total_chatbot_conversations=total_chatbot_conversations,
                         active_chatbot_conversations=active_chatbot_conversations,
                         total_page_views=total_page_views,
                         total_sessions=total_sessions,
                         recent_contacts=recent_contacts,
                         recent_chatbot=recent_chatbot,
                         total_messages=total_messages,
                         new_messages=new_messages,
                         pending_messages=pending_messages,
                         responded_messages=responded_messages,
                         closed_messages=closed_messages)

@admin_bp.route('/messages')
@login_required
@admin_required
def messages():
    """Manage contact messages"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = ContactMessage.query
    
    # Get counts for template
    total_messages = ContactMessage.query.count()
    new_messages = ContactMessage.query.filter_by(status='new').count()
    pending_messages = ContactMessage.query.filter_by(status='pending').count()
    responded_messages = ContactMessage.query.filter_by(status='responded').count()
    closed_messages = ContactMessage.query.filter_by(status='closed').count()
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    messages = query.order_by(ContactMessage.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/messages.html', 
                         messages=messages, 
                         status=status,
                         total_messages=total_messages,
                         new_messages=new_messages,
                         pending_messages=pending_messages,
                         responded_messages=responded_messages,
                         closed_messages=closed_messages)

@admin_bp.route('/messages/<int:message_id>')
@login_required
@admin_required
def view_message(message_id):
    """View individual message"""
    message = ContactMessage.query.get_or_404(message_id)
    
    # Mark as read
    if not message.is_read:
        message.is_read = True
        message.read_at = datetime.now(timezone.utc)
        db.session.commit()
    
    return render_template('admin/view_message.html', message=message)

@admin_bp.route('/messages/<int:message_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_message(message_id):
    """Delete message"""
    message = ContactMessage.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    
    flash('Message deleted successfully.', 'success')
    return redirect(url_for('admin.messages'))

@admin_bp.route('/messages/<int:message_id>/toggle-status', methods=['POST'])
@login_required
@admin_required
def toggle_message_status(message_id):
    """Toggle message status"""
    message = ContactMessage.query.get_or_404(message_id)
    
    status_cycle = ['new', 'pending', 'responded', 'closed']
    current_index = status_cycle.index(message.status) if message.status in status_cycle else 0
    next_index = (current_index + 1) % len(status_cycle)
    message.status = status_cycle[next_index]
    
    db.session.commit()
    
    return jsonify({'status': message.status})

@admin_bp.route('/messages/bulk', methods=['POST'])
@login_required
@admin_required
def bulk_message_operations():
    """Bulk operations on messages"""
    action = request.json.get('action')
    message_ids = request.json.get('message_ids', [])
    
    if not message_ids:
        return jsonify({'error': 'No messages selected'}), 400
    
    messages = ContactMessage.query.filter(ContactMessage.id.in_(message_ids)).all()
    
    if action == 'mark_read':
        for message in messages:
            message.is_read = True
            message.read_at = datetime.now(timezone.utc)
        db.session.commit()
        return jsonify({'success': True, 'message': f'Marked {len(messages)} messages as read'})
    
    elif action == 'mark_unread':
        for message in messages:
            message.is_read = False
            message.read_at = None
        db.session.commit()
        return jsonify({'success': True, 'message': f'Marked {len(messages)} messages as unread'})
    
    elif action == 'change_status':
        new_status = request.json.get('status')
        if new_status not in ['new', 'pending', 'responded', 'closed']:
            return jsonify({'error': 'Invalid status'}), 400
        
        for message in messages:
            message.status = new_status
        db.session.commit()
        return jsonify({'success': True, 'message': f'Changed {len(messages)} messages to {new_status}'})
    
    elif action == 'delete':
        for message in messages:
            db.session.delete(message)
        db.session.commit()
        return jsonify({'success': True, 'message': f'Deleted {len(messages)} messages'})
    
    elif action == 'archive':
        for message in messages:
            message.is_archived = True
        db.session.commit()
        return jsonify({'success': True, 'message': f'Archived {len(messages)} messages'})
    
    elif action == 'unarchive':
        for message in messages:
            message.is_archived = False
        db.session.commit()
        return jsonify({'success': True, 'message': f'Unarchived {len(messages)} messages'})
    
    else:
        return jsonify({'error': 'Invalid action'}), 400

@admin_bp.route('/chatbot')
@login_required
@admin_required
def chatbot():
    """Manage chatbot conversations"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = ChatbotConversation.query
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    # Get counts for template
    total_conversations = ChatbotConversation.query.count()
    active_conversations = ChatbotConversation.query.filter_by(status='active').count()
    completed_conversations = ChatbotConversation.query.filter_by(status='completed').count()
    follow_up_conversations = ChatbotConversation.query.filter_by(status='follow_up').count()
    
    conversations = query.order_by(ChatbotConversation.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/chatbot.html', 
                         conversations=conversations, 
                         status=status,
                         total_conversations=total_conversations,
                         active_conversations=active_conversations,
                         completed_conversations=completed_conversations,
                         follow_up_conversations=follow_up_conversations)

@admin_bp.route('/chatbot/<int:conversation_id>')
@login_required
@admin_required
def view_conversation(conversation_id):
    """View individual chatbot conversation"""
    conversation = ChatbotConversation.query.get_or_404(conversation_id)
    messages = ChatbotMessage.query.filter_by(conversation_id=conversation_id).order_by(ChatbotMessage.created_at).all()
    
    return render_template('admin/view_conversation.html', conversation=conversation, messages=messages)

@admin_bp.route('/chatbot/<int:conversation_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_conversation(conversation_id):
    """Delete chatbot conversation"""
    conversation = ChatbotConversation.query.get_or_404(conversation_id)
    db.session.delete(conversation)
    db.session.commit()
    
    flash('Conversation deleted successfully.', 'success')
    return redirect(url_for('admin.chatbot'))

@admin_bp.route('/analytics')
@login_required
@admin_required
def analytics():
    """Website analytics"""
    # Get page view statistics
    total_page_views = PageView.query.count()
    unique_sessions = VisitorSession.query.count()
    
    # Get recent page views
    recent_views = PageView.query.order_by(PageView.created_at.desc()).limit(100).all()
    
    # Get top pages
    top_pages = db.session.query(
        PageView.page_url, 
        db.func.count(PageView.id).label('views')
    ).group_by(PageView.page_url).order_by(db.func.count(PageView.id).desc()).limit(10).all()
    
    return render_template('admin/analytics.html', 
                         total_page_views=total_page_views,
                         unique_sessions=unique_sessions,
                         recent_views=recent_views,
                         top_pages=top_pages)

@admin_bp.route('/profile')
@login_required
@admin_required
def profile():
    """Admin profile settings"""
    return render_template('admin/profile.html')

@admin_bp.route('/profile/update', methods=['POST'])
@login_required
@admin_required
def update_profile():
    """Update admin profile"""
    username = request.form.get('username')
    email = request.form.get('email')
    current_password = request.form.get('current_password')
    new_password = request.form.get('new_password')
    
    if not username or not email:
        flash('Username and email are required.', 'error')
        return redirect(url_for('admin.profile'))
    
    # Check if email is being changed and if it's already taken
    if email != current_user.email:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists.', 'error')
            return redirect(url_for('admin.profile'))
    
    # Update user info
    current_user.username = username
    current_user.email = email
    
    # Update password if provided
    if new_password:
        if not current_password or not current_user.check_password(current_password):
            flash('Current password is incorrect.', 'error')
            return redirect(url_for('admin.profile'))
        
        if len(new_password) < 6:
            flash('New password must be at least 6 characters long.', 'error')
            return redirect(url_for('admin.profile'))
        
        current_user.set_password(new_password)
        flash('Password updated successfully.', 'success')
    
    db.session.commit()
    flash('Profile updated successfully.', 'success')
    return redirect(url_for('admin.profile'))

# User Management Routes
@admin_bp.route('/users')
@login_required
@admin_required
def users():
    """Manage users"""
    page = request.args.get('page', 1, type=int)
    users = User.query.order_by(User.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    return render_template('admin/users.html', users=users)

@admin_bp.route('/users/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_user():
    """Create new user"""
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        is_admin = request.form.get('is_admin') == 'on'
        
        if not username or not email or not password:
            flash('All fields are required.', 'error')
            return redirect(url_for('admin.create_user'))
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            flash('Username already exists.', 'error')
            return redirect(url_for('admin.create_user'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already exists.', 'error')
            return redirect(url_for('admin.create_user'))
        
        # Create user
        user = User(username=username, email=email, is_admin=is_admin)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        flash('User created successfully.', 'success')
        return redirect(url_for('admin.users'))
    
    return render_template('admin/users_form.html')

@admin_bp.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_user(user_id):
    """Edit user"""
    user = User.query.get_or_404(user_id)
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        is_admin = request.form.get('is_admin') == 'on'
        is_active = request.form.get('is_active') == 'on'
        
        if not username or not email:
            flash('Username and email are required.', 'error')
            return redirect(url_for('admin.edit_user', user_id=user_id))
        
        # Check if username/email is being changed and if it's already taken
        if username != user.username:
            if User.query.filter_by(username=username).first():
                flash('Username already exists.', 'error')
                return redirect(url_for('admin.edit_user', user_id=user_id))
        
        if email != user.email:
            if User.query.filter_by(email=email).first():
                flash('Email already exists.', 'error')
                return redirect(url_for('admin.edit_user', user_id=user_id))
        
        user.username = username
        user.email = email
        user.is_admin = is_admin
        user.is_active = is_active
        db.session.commit()
        
        flash('User updated successfully.', 'success')
        return redirect(url_for('admin.users'))
    
    return render_template('admin/users_form.html', user=user)

@admin_bp.route('/users/<int:user_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_user(user_id):
    """Delete user"""
    user = User.query.get_or_404(user_id)
    
    # Prevent deleting self
    if user.id == current_user.id:
        flash('You cannot delete your own account.', 'error')
        return redirect(url_for('admin.users'))
    
    db.session.delete(user)
    db.session.commit()
    
    flash('User deleted successfully.', 'success')
    return redirect(url_for('admin.users'))

@admin_bp.route('/users/<int:user_id>/reset-password', methods=['POST'])
@login_required
@admin_required
def reset_user_password(user_id):
    """Reset user password"""
    user = User.query.get_or_404(user_id)
    new_password = request.form.get('new_password')
    
    if not new_password or len(new_password) < 6:
        flash('Password must be at least 6 characters long.', 'error')
        return redirect(url_for('admin.edit_user', user_id=user_id))
    
    user.set_password(new_password)
    db.session.commit()
    
    flash('Password reset successfully.', 'success')
    return redirect(url_for('admin.edit_user', user_id=user_id))

# Export Routes
@admin_bp.route('/export/leads')
@login_required
@admin_required
def export_leads():
    """Export leads as CSV"""
    import csv
    from io import StringIO
    from flask import Response
    
    # Get all contact messages
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    
    # Create CSV
    output = StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow(['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Priority', 'Created At'])
    
    # Write data
    for msg in messages:
        writer.writerow([
            msg.id,
            msg.name,
            msg.email,
            msg.phone or '',
            msg.subject,
            msg.message,
            msg.status,
            msg.priority,
            msg.created_at.strftime('%Y-%m-%d %H:%M:%S') if msg.created_at else ''
        ])
    
    # Create response
    output.seek(0)
    response = Response(output.getvalue(), mimetype='text/csv')
    response.headers['Content-Disposition'] = 'attachment; filename=aura_leads_export.csv'
    
    return response

# Blog Management Routes
@admin_bp.route('/blog')
@login_required
@admin_required
def blog_posts():
    """Manage blog posts"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = BlogPost.query
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    posts = query.order_by(BlogPost.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/blog.html', posts=posts, status=status)

@admin_bp.route('/blog/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_blog_post():
    """Create new blog post"""
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        excerpt = request.form.get('excerpt')
        category_id = request.form.get('category_id')
        status = request.form.get('status', 'draft')
        featured_image = request.form.get('featured_image')
        meta_title = request.form.get('meta_title')
        meta_description = request.form.get('meta_description')
        
        if not title or not content:
            flash('Title and content are required.', 'error')
            return redirect(url_for('admin.create_blog_post'))
        
        # Generate slug from title
        slug = title.lower().replace(' ', '-').replace(',', '-').replace('.', '-').replace('/', '-')
        
        # Check if slug already exists
        if BlogPost.query.filter_by(slug=slug).first():
            flash('A post with this title already exists.', 'error')
            return redirect(url_for('admin.create_blog_post'))
        
        # Create blog post
        post = BlogPost(
            title=title,
            slug=slug,
            content=content,
            excerpt=excerpt,
            category_id=category_id if category_id else None,
            status=status,
            featured_image=featured_image,
            meta_title=meta_title,
            meta_description=meta_description,
            author_id=current_user.id
        )
        
        if status == 'published':
            post.published_at = datetime.now(timezone.utc)
        
        db.session.add(post)
        db.session.commit()
        
        flash('Blog post created successfully.', 'success')
        return redirect(url_for('admin.blog_posts'))
    
    categories = BlogCategory.query.all()
    return render_template('admin/blog_form.html', categories=categories)

@admin_bp.route('/blog/<int:post_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_blog_post(post_id):
    """Edit blog post"""
    post = BlogPost.query.get_or_404(post_id)
    
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        excerpt = request.form.get('excerpt')
        category_id = request.form.get('category_id')
        status = request.form.get('status', 'draft')
        featured_image = request.form.get('featured_image')
        meta_title = request.form.get('meta_title')
        meta_description = request.form.get('meta_description')
        
        if not title or not content:
            flash('Title and content are required.', 'error')
            return redirect(url_for('admin.edit_blog_post', post_id=post_id))
        
        # Update slug if title changed
        if title != post.title:
            slug = title.lower().replace(' ', '-').replace(',', '-').replace('.', '-').replace('/', '-')
            # Check if slug already exists (excluding current post)
            existing = BlogPost.query.filter(BlogPost.slug == slug, BlogPost.id != post_id).first()
            if existing:
                flash('A post with this title already exists.', 'error')
                return redirect(url_for('admin.edit_blog_post', post_id=post_id))
            post.slug = slug
        
        post.title = title
        post.content = content
        post.excerpt = excerpt
        post.category_id = category_id if category_id else None
        post.status = status
        post.featured_image = featured_image
        post.meta_title = meta_title
        post.meta_description = meta_description
        
        # Update published_at if status changed to published
        if status == 'published' and post.status != 'published':
            post.published_at = datetime.now(timezone.utc)
        
        db.session.commit()
        
        flash('Blog post updated successfully.', 'success')
        return redirect(url_for('admin.blog_posts'))
    
    categories = BlogCategory.query.all()
    return render_template('admin/blog_form.html', post=post, categories=categories)

@admin_bp.route('/blog/<int:post_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_blog_post(post_id):
    """Delete blog post"""
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    
    flash('Blog post deleted successfully.', 'success')
    return redirect(url_for('admin.blog_posts'))

# Blog Categories
@admin_bp.route('/blog/categories')
@login_required
@admin_required
def blog_categories():
    """Manage blog categories"""
    categories = BlogCategory.query.order_by(BlogCategory.name).all()
    return render_template('admin/blog_categories.html', categories=categories)

@admin_bp.route('/blog/categories/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_blog_category():
    """Create new blog category"""
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        
        if not name:
            flash('Category name is required.', 'error')
            return redirect(url_for('admin.create_blog_category'))
        
        # Generate slug
        slug = name.lower().replace(' ', '-').replace(',', '-').replace('.', '-')
        
        # Check if slug already exists
        if BlogCategory.query.filter_by(slug=slug).first():
            flash('A category with this name already exists.', 'error')
            return redirect(url_for('admin.create_blog_category'))
        
        category = BlogCategory(name=name, slug=slug, description=description)
        db.session.add(category)
        db.session.commit()
        
        flash('Category created successfully.', 'success')
        return redirect(url_for('admin.blog_categories'))
    
    return render_template('admin/blog_category_form.html')

@admin_bp.route('/blog/categories/<int:category_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_blog_category(category_id):
    """Edit blog category"""
    category = BlogCategory.query.get_or_404(category_id)
    
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        
        if not name:
            flash('Category name is required.', 'error')
            return redirect(url_for('admin.edit_blog_category', category_id=category_id))
        
        # Update slug if name changed
        if name != category.name:
            slug = name.lower().replace(' ', '-').replace(',', '-').replace('.', '-')
            # Check if slug already exists (excluding current category)
            existing = BlogCategory.query.filter(BlogCategory.slug == slug, BlogCategory.id != category_id).first()
            if existing:
                flash('A category with this name already exists.', 'error')
                return redirect(url_for('admin.edit_blog_category', category_id=category_id))
            category.slug = slug
        
        category.name = name
        category.description = description
        db.session.commit()
        
        flash('Category updated successfully.', 'success')
        return redirect(url_for('admin.blog_categories'))
    
    return render_template('admin/blog_category_form.html', category=category)

@admin_bp.route('/blog/categories/<int:category_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_blog_category(category_id):
    """Delete blog category"""
    category = BlogCategory.query.get_or_404(category_id)
    
    # Check if category has posts
    if category.posts:
        flash('Cannot delete category with existing posts.', 'error')
        return redirect(url_for('admin.blog_categories'))
    
    db.session.delete(category)
    db.session.commit()
    
    flash('Category deleted successfully.', 'success')
    return redirect(url_for('admin.blog_categories'))

# Portfolio Management Routes
@admin_bp.route('/portfolio')
@login_required
@admin_required
def portfolio_items():
    """Manage portfolio items"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = PortfolioItem.query
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    items = query.order_by(PortfolioItem.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/portfolio.html', items=items, status=status)

@admin_bp.route('/portfolio/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_portfolio_item():
    """Create new portfolio item"""
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        client_name = request.form.get('client_name')
        project_url = request.form.get('project_url')
        featured_image = request.form.get('featured_image')
        gallery_images = request.form.getlist('gallery_images')  # Multiple images
        services_used = request.form.getlist('services_used')  # Multiple services
        status = request.form.get('status', 'draft')
        featured = request.form.get('featured') == 'on'
        meta_title = request.form.get('meta_title')
        meta_description = request.form.get('meta_description')
        
        if not title or not description:
            flash('Title and description are required.', 'error')
            return redirect(url_for('admin.create_portfolio_item'))
        
        # Generate slug from title
        slug = title.lower().replace(' ', '-').replace(',', '-').replace('.', '-').replace('/', '-')
        
        # Check if slug already exists
        if PortfolioItem.query.filter_by(slug=slug).first():
            flash('A portfolio item with this title already exists.', 'error')
            return redirect(url_for('admin.create_portfolio_item'))
        
        # Create portfolio item
        item = PortfolioItem(
            title=title,
            slug=slug,
            description=description,
            client_name=client_name,
            project_url=project_url,
            featured_image=featured_image,
            gallery_images=gallery_images if gallery_images else None,
            services_used=services_used if services_used else None,
            status=status,
            featured=featured,
            meta_title=meta_title,
            meta_description=meta_description,
            author_id=current_user.id
        )
        
        db.session.add(item)
        db.session.commit()
        
        flash('Portfolio item created successfully.', 'success')
        return redirect(url_for('admin.portfolio_items'))
    
    return render_template('admin/portfolio_form.html')

@admin_bp.route('/portfolio/<int:item_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_portfolio_item(item_id):
    """Edit portfolio item"""
    item = PortfolioItem.query.get_or_404(item_id)
    
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        client_name = request.form.get('client_name')
        project_url = request.form.get('project_url')
        featured_image = request.form.get('featured_image')
        gallery_images = request.form.getlist('gallery_images')
        services_used = request.form.getlist('services_used')
        status = request.form.get('status', 'draft')
        featured = request.form.get('featured') == 'on'
        meta_title = request.form.get('meta_title')
        meta_description = request.form.get('meta_description')
        
        if not title or not description:
            flash('Title and description are required.', 'error')
            return redirect(url_for('admin.edit_portfolio_item', item_id=item_id))
        
        # Update slug if title changed
        if title != item.title:
            slug = title.lower().replace(' ', '-').replace(',', '-').replace('.', '-').replace('/', '-')
            # Check if slug already exists (excluding current item)
            existing = PortfolioItem.query.filter(PortfolioItem.slug == slug, PortfolioItem.id != item_id).first()
            if existing:
                flash('A portfolio item with this title already exists.', 'error')
                return redirect(url_for('admin.edit_portfolio_item', item_id=item_id))
            item.slug = slug
        
        item.title = title
        item.description = description
        item.client_name = client_name
        item.project_url = project_url
        item.featured_image = featured_image
        item.gallery_images = gallery_images if gallery_images else None
        item.services_used = services_used if services_used else None
        item.status = status
        item.featured = featured
        item.meta_title = meta_title
        item.meta_description = meta_description
        
        db.session.commit()
        
        flash('Portfolio item updated successfully.', 'success')
        return redirect(url_for('admin.portfolio_items'))
    
    return render_template('admin/portfolio_form.html', item=item)

@admin_bp.route('/portfolio/<int:item_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_portfolio_item(item_id):
    """Delete portfolio item"""
    item = PortfolioItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    
    flash('Portfolio item deleted successfully.', 'success')
    return redirect(url_for('admin.portfolio_items'))

# Testimonials Management
@admin_bp.route('/testimonials')
@login_required
@admin_required
def testimonials():
    """Manage testimonials"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = Testimonial.query
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    testimonials_list = query.order_by(Testimonial.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/testimonials.html', testimonials=testimonials_list, status=status)

@admin_bp.route('/testimonials/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_testimonial():
    """Create new testimonial"""
    if request.method == 'POST':
        client_name = request.form.get('client_name')
        client_company = request.form.get('client_company')
        client_avatar = request.form.get('client_avatar')
        content = request.form.get('content')
        rating = request.form.get('rating', 5, type=int)
        project_id = request.form.get('project_id')
        featured = request.form.get('featured') == 'on'
        status = request.form.get('status', 'published')
        
        if not client_name or not content:
            flash('Client name and testimonial content are required.', 'error')
            return redirect(url_for('admin.create_testimonial'))
        
        testimonial = Testimonial(
            client_name=client_name,
            client_company=client_company,
            client_avatar=client_avatar,
            content=content,
            rating=rating,
            project_id=project_id if project_id else None,
            featured=featured,
            status=status
        )
        
        db.session.add(testimonial)
        db.session.commit()
        
        flash('Testimonial created successfully.', 'success')
        return redirect(url_for('admin.testimonials'))
    
    portfolio_items = PortfolioItem.query.filter_by(status='published').all()
    return render_template('admin/testimonial_form.html', portfolio_items=portfolio_items)

@admin_bp.route('/testimonials/<int:testimonial_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_testimonial(testimonial_id):
    """Edit testimonial"""
    testimonial = Testimonial.query.get_or_404(testimonial_id)
    
    if request.method == 'POST':
        client_name = request.form.get('client_name')
        client_company = request.form.get('client_company')
        client_avatar = request.form.get('client_avatar')
        content = request.form.get('content')
        rating = request.form.get('rating', 5, type=int)
        project_id = request.form.get('project_id')
        featured = request.form.get('featured') == 'on'
        status = request.form.get('status', 'published')
        
        if not client_name or not content:
            flash('Client name and testimonial content are required.', 'error')
            return redirect(url_for('admin.edit_testimonial', testimonial_id=testimonial_id))
        
        testimonial.client_name = client_name
        testimonial.client_company = client_company
        testimonial.client_avatar = client_avatar
        testimonial.content = content
        testimonial.rating = rating
        testimonial.project_id = project_id if project_id else None
        testimonial.featured = featured
        testimonial.status = status
        
        db.session.commit()
        
        flash('Testimonial updated successfully.', 'success')
        return redirect(url_for('admin.testimonials'))
    
    portfolio_items = PortfolioItem.query.filter_by(status='published').all()
    return render_template('admin/testimonial_form.html', testimonial=testimonial, portfolio_items=portfolio_items)

@admin_bp.route('/testimonials/<int:testimonial_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_testimonial(testimonial_id):
    """Delete testimonial"""
    testimonial = Testimonial.query.get_or_404(testimonial_id)
    db.session.delete(testimonial)
    db.session.commit()
    
    flash('Testimonial deleted successfully.', 'success')
    return redirect(url_for('admin.testimonials'))

# Team Management
@admin_bp.route('/team')
@login_required
@admin_required
def team_members():
    """Manage team members"""
    members = TeamMember.query.order_by(TeamMember.order, TeamMember.name).all()
    return render_template('admin/team.html', members=members)

@admin_bp.route('/team/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_team_member():
    """Create new team member"""
    if request.method == 'POST':
        name = request.form.get('name')
        role = request.form.get('role')
        bio = request.form.get('bio')
        image = request.form.get('image')
        linkedin_url = request.form.get('linkedin_url')
        twitter_url = request.form.get('twitter_url')
        order = request.form.get('order', 0, type=int)
        status = request.form.get('status', 'published')
        
        if not name:
            flash('Team member name is required.', 'error')
            return redirect(url_for('admin.create_team_member'))
        
        member = TeamMember(
            name=name,
            role=role,
            bio=bio,
            image=image,
            linkedin_url=linkedin_url,
            twitter_url=twitter_url,
            order=order,
            status=status
        )
        
        db.session.add(member)
        db.session.commit()
        
        flash('Team member created successfully.', 'success')
        return redirect(url_for('admin.team_members'))
    
    return render_template('admin/team_form.html')

@admin_bp.route('/team/<int:member_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_team_member(member_id):
    """Edit team member"""
    member = TeamMember.query.get_or_404(member_id)
    
    if request.method == 'POST':
        name = request.form.get('name')
        role = request.form.get('role')
        bio = request.form.get('bio')
        image = request.form.get('image')
        linkedin_url = request.form.get('linkedin_url')
        twitter_url = request.form.get('twitter_url')
        order = request.form.get('order', 0, type=int)
        status = request.form.get('status', 'published')
        
        if not name:
            flash('Team member name is required.', 'error')
            return redirect(url_for('admin.edit_team_member', member_id=member_id))
        
        member.name = name
        member.role = role
        member.bio = bio
        member.image = image
        member.linkedin_url = linkedin_url
        member.twitter_url = twitter_url
        member.order = order
        member.status = status
        
        db.session.commit()
        
        flash('Team member updated successfully.', 'success')
        return redirect(url_for('admin.team_members'))
    
    return render_template('admin/team_form.html', member=member)

@admin_bp.route('/team/<int:member_id>/delete', methods=['POST'])
@login_required
@admin_required
def delete_team_member(member_id):
    """Delete team member"""
    member = TeamMember.query.get_or_404(member_id)
    db.session.delete(member)
    db.session.commit()
    
    flash('Team member deleted successfully.', 'success')
    return redirect(url_for('admin.team_members'))

# Settings Management
@admin_bp.route('/settings', methods=['GET', 'POST'])
@login_required
@admin_required
def settings():
    """Site settings"""
    settings = SiteSettings.query.first()
    
    if request.method == 'POST':
        if not settings:
            settings = SiteSettings()
            db.session.add(settings)
        
        settings.site_name = request.form.get('site_name')
        settings.site_tagline = request.form.get('site_tagline')
        settings.contact_email = request.form.get('contact_email')
        settings.contact_phone = request.form.get('contact_phone')
        settings.address = request.form.get('address')
        settings.facebook_url = request.form.get('facebook_url')
        settings.twitter_url = request.form.get('twitter_url')
        settings.linkedin_url = request.form.get('linkedin_url')
        settings.instagram_url = request.form.get('instagram_url')
        settings.google_analytics_id = request.form.get('google_analytics_id')
        
        db.session.commit()
        
        flash('Settings updated successfully.', 'success')
        return redirect(url_for('admin.settings'))
    
    return render_template('admin/settings.html', settings=settings)

# Marketing Routes
@admin_bp.route('/marketing/newsletter')
@login_required
@admin_required
def newsletter_subscribers():
    """Manage newsletter subscribers"""
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', 'all')
    
    query = NewsletterSubscriber.query
    
    if status != 'all':
        query = query.filter_by(status=status)
    
    subscribers = query.order_by(NewsletterSubscriber.subscribed_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/newsletter.html', subscribers=subscribers, status=status)

@admin_bp.route('/marketing/campaigns')
@login_required
@admin_required
def email_campaigns():
    """Manage email campaigns"""
    campaigns = EmailCampaign.query.order_by(EmailCampaign.created_at.desc()).all()
    return render_template('admin/campaigns.html', campaigns=campaigns)

@admin_bp.route('/marketing/campaigns/create', methods=['GET', 'POST'])
@login_required
@admin_required
def create_email_campaign():
    """Create new email campaign"""
    if request.method == 'POST':
        name = request.form.get('name')
        subject = request.form.get('subject')
        content = request.form.get('content')
        scheduled_for = request.form.get('scheduled_for')
        status = request.form.get('status', 'draft')
        
        if not name or not subject or not content:
            flash('Name, subject, and content are required.', 'error')
            return redirect(url_for('admin.create_email_campaign'))
        
        campaign = EmailCampaign(
            name=name,
            subject=subject,
            content=content,
            status=status,
            created_by=current_user.id
        )
        
        if scheduled_for:
            campaign.scheduled_for = datetime.strptime(scheduled_for, '%Y-%m-%d %H:%M')
        
        db.session.add(campaign)
        db.session.commit()
        
        flash('Email campaign created successfully.', 'success')
        return redirect(url_for('admin.email_campaigns'))
    
    return render_template('admin/campaign_form.html')

@admin_bp.route('/marketing/campaigns/<int:campaign_id>/send', methods=['POST'])
@login_required
@admin_required
def send_email_campaign(campaign_id):
    """Send email campaign"""
    from lib.email import EmailService
    
    campaign = EmailCampaign.query.get_or_404(campaign_id)
    
    if campaign.status == 'sent':
        flash('This campaign has already been sent.', 'error')
        return redirect(url_for('admin.email_campaigns'))
    
    # Get active subscribers
    subscribers = NewsletterSubscriber.query.filter_by(status='active').all()
    recipient_emails = [sub.email for sub in subscribers]
    
    # Send campaign
    email_svc = EmailService(mail)
    sent_count = email_svc.send_campaign(campaign, recipient_emails)
    
    # Update campaign
    campaign.status = 'sent'
    campaign.sent_at = datetime.now(timezone.utc)
    campaign.total_recipients = sent_count
    db.session.commit()
    
    flash(f'Campaign sent successfully to {sent_count} subscribers.', 'success')
    return redirect(url_for('admin.email_campaigns'))
