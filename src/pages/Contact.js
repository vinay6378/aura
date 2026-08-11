import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { validateContactForm, sanitizeContactForm } from '../utils/validation';

// Local data management
const saveContactData = (data) => {
  const existingContacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');
  const newContact = {
    id: existingContacts.length > 0 ? Math.max(...existingContacts.map(c => c.id)) + 1 : 1,
    ...data,
    status: 'new',
    date: new Date().toISOString().split('T')[0]
  };
  existingContacts.push(newContact);
  localStorage.setItem('admin_contacts', JSON.stringify(existingContacts));
  return true;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'vs8890864@gmail.com',
      description: 'Get in touch for project inquiries'
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+91 90798 85925',
      description: 'Call us for immediate assistance'
    },
    {
      icon: '📍',
      title: 'Address',
      details: 'Gurugram, Haryana, India',
      description: 'Visit our office for consultations'
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      description: 'Weekend: Available by appointment'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Sanitize and save to localStorage for admin panel
    const sanitizedData = sanitizeContactForm(formData);
    const contactData = {
      ...sanitizedData,
      subject: formData.service || 'General Inquiry'
    };
    
    saveContactData(contactData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      budget: '',
      timeline: ''
    });
    setErrors({});
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-95"></div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-5"
            style={{
              background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'][i]}, transparent)`,
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 12)}%`
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your digital presence? Let's discuss your project and bring your ideas to life.
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass-effect rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">We've received your message and will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <label className="block text-gray-300 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-opacity-20 transition-all ${errors.name ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <label className="block text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-opacity-20 transition-all ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <label className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-opacity-20 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <label className="block text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-opacity-20 transition-all"
                        placeholder="Your Company"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                   
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <label className="block text-gray-300 mb-2">Project Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-opacity-20 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'}`}
                      placeholder="Tell us about your project requirements..."
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8c0-2.386-1.063-4.517-2.75-6"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{info.title}</h4>
                      <p className="text-cyan-400 font-medium">{info.details}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/vinay-sharma-475398169/' },
                  { name: 'X (Twitter)', icon: '𝕏', href: 'https://x.com/Vinaygautam939' },
                  { name: 'GitHub', icon: '⚡', href: 'https://github.com/vinay6378/aura1' },
                  { name: 'YouTube', icon: '▶', href: 'https://www.youtube.com/@AuraDigitalSolution' },
                  { name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/aura_ai.tech/' },
                  { name: 'Website', icon: '🌐', href: 'https://auraofficial.in' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 hover:from-white/20 hover:to-white/10 hover:border-cyan-400/50 transition-all group shadow-lg hover:shadow-cyan-400/25"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <span className="relative text-3xl font-bold bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                        {social.icon}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white font-medium transition-colors">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose AURA?</h3>
              <div className="space-y-4">
                {[
                  '500+ Projects Delivered',
                  '50+ Happy Clients',
                  '10+ Years Experience',
                  '24/7 Support Available'
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">{stat}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'How long does a typical project take?',
                a: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 3-6 months.'
              },
              {
                q: 'What is your pricing structure?',
                a: 'We offer flexible pricing based on project scope. Contact us for a custom quote tailored to your specific needs.'
              },
              {
                q: 'Do you provide ongoing support?',
                a: 'Yes, we offer comprehensive maintenance and support packages to ensure your project runs smoothly.'
              },
              {
                q: 'Can you work with our existing team?',
                a: 'Absolutely! We can integrate seamlessly with your in-house team or work independently based on your preferences.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
