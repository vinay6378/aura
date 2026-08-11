# lib/email.py
from flask_mail import Mail, Message
from flask import current_app, render_template
from typing import List, Dict, Optional

class EmailService:
    def __init__(self, mail: Mail):
        self.mail = mail
    
    def send_contact_notification(self, contact_data: Dict):
        """Send notification to admin for new contact form submission"""
        try:
            msg = Message(
                subject=f'New Contact Form Submission: {contact_data["subject"]}',
                recipients=[current_app.config['MAIL_DEFAULT_SENDER'][1]],
                html=render_template('email/contact_notification.html', **contact_data)
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send contact notification: {e}")
            return False
    
    def send_auto_reply(self, contact_data: Dict):
        """Send automatic reply to contact form submitter"""
        try:
            msg = Message(
                subject='Thank you for contacting AURA Digital',
                recipients=[contact_data['email']],
                html=render_template('email/auto_reply.html', **contact_data)
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send auto reply: {e}")
            return False
    
    def send_newsletter_welcome(self, subscriber_data: Dict):
        """Send welcome email to new newsletter subscriber"""
        try:
            msg = Message(
                subject='Welcome to AURA Digital Newsletter',
                recipients=[subscriber_data['email']],
                html=render_template('email/newsletter_welcome.html', **subscriber_data)
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send newsletter welcome: {e}")
            return False
    
    def send_campaign(self, campaign, subscribers: List[str]) -> int:
        """Send email campaign to subscribers"""
        sent_count = 0
        failed_count = 0
        
        for email in subscribers:
            try:
                msg = Message(
                    subject=campaign.subject,
                    recipients=[email],
                    html=campaign.content
                )
                self.mail.send(msg)
                sent_count += 1
            except Exception as e:
                print(f"Failed to send campaign to {email}: {e}")
                failed_count += 1
        
        return sent_count
    
    def send_password_reset(self, user: 'User', reset_url: str):
        """Send password reset email"""
        try:
            msg = Message(
                subject='Reset Your Password - AURA Digital',
                recipients=[user.email],
                html=render_template('email/password_reset.html', user=user, reset_url=reset_url)
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send password reset: {e}")
            return False