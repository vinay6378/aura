import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm } from '../services/dataService';
import supabase from '../lib/supabaseClient';

const DEFAULT_SERVICE_OPTIONS = [
  'General Inquiry', 'Website Development', 'Software Development', 'Mobile Application',
  'Data Science & Analytics', 'Social Media Marketing', 'PPC Advertising', 'Content Marketing',
  'Brand Identity', 'Photo Editing', 'Print Design', 'Business Content', 'Book Publishing'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    service: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [serviceOptions, setServiceOptions] = useState(DEFAULT_SERVICE_OPTIONS);

  useEffect(() => {
    let mounted = true;
    supabase
      .from('services')
      .select('title')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (!mounted || !data || data.length === 0) return;
        const titles = ['General Inquiry', ...data.map((s) => s.title)];
        setServiceOptions(titles);
      });
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('Sending...');

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', service: 'General Inquiry', message: '' });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('Error sending message. Please try again.');
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('Error sending message. Please try again.');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative" aria-label="Contact section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get In <span className="gradient-text">Touch</span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to start your next project? Let's create something amazing together.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                <div>
                  <label className="block text-white mb-2" htmlFor="name">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="email">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="company">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="service">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                  >
                    {serviceOptions.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aura-cyan resize-none transition-all"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`mt-4 p-4 rounded-lg text-center ${
                      submitStatus.includes('successfully')
                        ? 'bg-green-500 bg-opacity-20 border-green-500'
                        : 'bg-blue-500 bg-opacity-20 border-blue-500'
                    }`}
                  >
                    {submitStatus}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">vs8890864@gmail.com</div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl">📍</div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-300">Kishangarh, Ajmer, India</div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media Links */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                      className="flex items-center justify-center space-x-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 hover:from-white/20 hover:to-white/10 hover:border-cyan-400/50 transition-all group shadow-lg hover:shadow-cyan-400/25"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <span className="relative text-xl font-bold bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                          {social.icon}
                        </span>
                      </div>
                      <span className="text-xs text-gray-300 group-hover:text-white font-medium transition-colors">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
