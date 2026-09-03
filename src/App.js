import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import ProtectedRoute from './admin/ProtectedRoute';
import './styles/index.css';

// Lazy load public pages
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services'));
const ContactPage = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

// Service Pages
const WebsiteDevelopment = lazy(() => import('./pages/services/WebsiteDevelopment'));
const SoftwareDevelopment = lazy(() => import('./pages/services/SoftwareDevelopment'));
const MobileApplication = lazy(() => import('./pages/services/MobileApplication'));
const DataScienceAnalyst = lazy(() => import('./pages/services/DataScienceAnalyst'));

// Marketing Pages
const SocialMedia = lazy(() => import('./pages/marketing/SocialMedia'));
const PPCAds = lazy(() => import('./pages/marketing/PPCAds'));
const ContentMarketing = lazy(() => import('./pages/marketing/ContentMarketing'));
const Analytics = lazy(() => import('./pages/marketing/Analytics'));
const SocialMediaContent = lazy(() => import('./pages/marketing/SocialMediaContent'));
const OnlineAdCampaigns = lazy(() => import('./pages/marketing/OnlineAdCampaigns'));
const InfluencerMarketing = lazy(() => import('./pages/marketing/InfluencerMarketing'));

// Creative & Specialized Pages
const BrandIdentity = lazy(() => import('./pages/creative/BrandIdentity'));
const PhotoEditing = lazy(() => import('./pages/creative/PhotoEditing'));
const PrintDesign = lazy(() => import('./pages/creative/PrintDesign'));
const ArchitecturalDesign = lazy(() => import('./pages/creative/ArchitecturalDesign'));
const BusinessContent = lazy(() => import('./pages/content/BusinessContent'));
const BookEbookPublishing = lazy(() => import('./pages/content/BookEbookPublishing'));
const ProfessionalPhotography = lazy(() => import('./pages/specialized/ProfessionalPhotography'));

// Admin Pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminSignup = lazy(() => import('./admin/AdminSignup'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <div className="relative min-h-screen content-overlay">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <motion.div {...pageTransition}>
                <SEO />
                <Navbar />
                <Hero />
                <AboutSection />
                <Services />
                <Contact />
                <Footer />
              </motion.div>
            } />

            {/* Core Pages */}
            <Route path="/about" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="About Us - AURA Digital"
                  description="Learn about AURA Digital - your trusted partner for web development, digital marketing, and software solutions."
                  canonicalUrl="https://auraofficial.in/about"
                />
                <Navbar />
                <About />
                <Footer />
              </motion.div>
            } />

            <Route path="/services" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Our Services - AURA Digital"
                  description="Explore our comprehensive services including web development, digital marketing, software solutions, and creative design."
                  canonicalUrl="https://auraofficial.in/services"
                />
                <Navbar />
                <ServicesPage />
                <Footer />
              </motion.div>
            } />

            <Route path="/contact" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Contact Us - AURA Digital"
                  description="Get in touch with AURA Digital for your web development, digital marketing, and software needs."
                  canonicalUrl="https://auraofficial.in/contact"
                />
                <Navbar />
                <ContactPage />
                <Footer />
              </motion.div>
            } />

            {/* Services Sub-routes */}
            <Route path="/services/website-development" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Website Development - AURA Digital"
                  description="Professional website development services by AURA Digital. Custom, responsive, and SEO-optimized websites for your business."
                  keywords="website development, web design, custom websites, responsive design"
                  canonicalUrl="https://auraofficial.in/services/website-development"
                />
                <Navbar />
                <WebsiteDevelopment />
                <Footer />
              </motion.div>
            } />

            <Route path="/services/software-development" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Software Development - AURA Digital"
                  description="Custom software development solutions by AURA Digital. Tailored software applications to streamline your business operations."
                  keywords="software development, custom software, business applications, software solutions"
                  canonicalUrl="https://auraofficial.in/services/software-development"
                />
                <Navbar />
                <SoftwareDevelopment />
                <Footer />
              </motion.div>
            } />

            <Route path="/services/mobile-application" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Mobile Application Development - AURA Digital"
                  description="iOS and Android mobile app development by AURA Digital. Native and cross-platform mobile solutions."
                  keywords="mobile app development, iOS apps, Android apps, cross-platform"
                  canonicalUrl="https://auraofficial.in/services/mobile-application"
                />
                <Navbar />
                <MobileApplication />
                <Footer />
              </motion.div>
            } />

            <Route path="/services/data-science-analyst" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Data Science & Analytics - AURA Digital"
                  description="Data science and analytics services by AURA Digital. Transform your data into actionable insights."
                  keywords="data science, data analytics, machine learning, business intelligence"
                  canonicalUrl="https://auraofficial.in/services/data-science-analyst"
                />
                <Navbar />
                <DataScienceAnalyst />
                <Footer />
              </motion.div>
            } />

            {/* Marketing Routes */}
            <Route path="/marketing/social-media" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Social Media Marketing - AURA Digital"
                  description="Social media marketing services by AURA Digital. Grow your brand presence across all major platforms."
                  keywords="social media marketing, social media management, brand awareness"
                  canonicalUrl="https://auraofficial.in/marketing/social-media"
                />
                <Navbar />
                <SocialMedia />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/ppc-ads" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="PPC & Advertising - AURA Digital"
                  description="Pay-per-click advertising services by AURA Digital. Maximize your ROI with targeted ad campaigns."
                  keywords="PPC advertising, Google Ads, Facebook Ads, paid advertising"
                  canonicalUrl="https://auraofficial.in/marketing/ppc-ads"
                />
                <Navbar />
                <PPCAds />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/content-marketing" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Content Marketing - AURA Digital"
                  description="Content marketing services by AURA Digital. Engaging content that drives results."
                  keywords="content marketing, content creation, content strategy"
                  canonicalUrl="https://auraofficial.in/marketing/content-marketing"
                />
                <Navbar />
                <ContentMarketing />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/analytics" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Marketing Analytics - AURA Digital"
                  description="Marketing analytics services by AURA Digital. Data-driven insights to optimize your marketing."
                  keywords="marketing analytics, data analysis, marketing insights"
                  canonicalUrl="https://auraofficial.in/marketing/analytics"
                />
                <Navbar />
                <Analytics />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/social-media-content" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Social Media Content - AURA Digital"
                  description="Social media content creation by AURA Digital. Engaging content for all platforms."
                  keywords="social media content, content creation, social media posts"
                  canonicalUrl="https://auraofficial.in/marketing/social-media-content"
                />
                <Navbar />
                <SocialMediaContent />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/online-ad-campaigns" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Online Ad Campaigns - AURA Digital"
                  description="Online advertising campaign management by AURA Digital. Strategic campaigns for maximum impact."
                  keywords="online ad campaigns, digital advertising, ad management"
                  canonicalUrl="https://auraofficial.in/marketing/online-ad-campaigns"
                />
                <Navbar />
                <OnlineAdCampaigns />
                <Footer />
              </motion.div>
            } />

            <Route path="/marketing/influencer-marketing" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Influencer Marketing - AURA Digital"
                  description="Influencer marketing services by AURA Digital. Partner with influencers to grow your brand."
                  keywords="influencer marketing, influencer partnerships, brand collaborations"
                  canonicalUrl="https://auraofficial.in/marketing/influencer-marketing"
                />
                <Navbar />
                <InfluencerMarketing />
                <Footer />
              </motion.div>
            } />

            {/* Creative & Specialized Routes */}
            <Route path="/creative/brand-identity" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Brand Identity - AURA Digital"
                  description="Brand identity services by AURA Digital. Create a memorable brand that resonates with your audience."
                  keywords="brand identity, branding, logo design, brand strategy"
                  canonicalUrl="https://auraofficial.in/creative/brand-identity"
                />
                <Navbar />
                <BrandIdentity />
                <Footer />
              </motion.div>
            } />

            <Route path="/creative/photo-editing" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Photo Editing - AURA Digital"
                  description="Professional photo editing services by AURA Digital. Enhance your images with expert editing."
                  keywords="photo editing, image editing, photo retouching"
                  canonicalUrl="https://auraofficial.in/creative/photo-editing"
                />
                <Navbar />
                <PhotoEditing />
                <Footer />
              </motion.div>
            } />

            <Route path="/creative/print-design" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Print Design - AURA Digital"
                  description="Print design services by AURA Digital. Professional print materials for your business."
                  keywords="print design, graphic design, print materials"
                  canonicalUrl="https://auraofficial.in/creative/print-design"
                />
                <Navbar />
                <PrintDesign />
                <Footer />
              </motion.div>
            } />

            <Route path="/creative/architectural-design" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Architectural Design - AURA Digital"
                  description="Architectural and solar design services by AURA Digital. 2D & 3D design solutions."
                  keywords="architectural design, 3D design, solar design"
                  canonicalUrl="https://auraofficial.in/creative/architectural-design"
                />
                <Navbar />
                <ArchitecturalDesign />
                <Footer />
              </motion.div>
            } />

            <Route path="/content/business-content" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Business Content Writing - AURA Digital"
                  description="Professional business content writing by AURA Digital. High-quality content for your business."
                  keywords="business content, content writing, professional writing"
                  canonicalUrl="https://auraofficial.in/content/business-content"
                />
                <Navbar />
                <BusinessContent />
                <Footer />
              </motion.div>
            } />

            <Route path="/content/book-ebook-publishing" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Book & Ebook Publishing - AURA Digital"
                  description="Complete book and ebook publishing services by AURA Digital. From manuscript to published work."
                  keywords="book publishing, ebook publishing, self-publishing"
                  canonicalUrl="https://auraofficial.in/content/book-ebook-publishing"
                />
                <Navbar />
                <BookEbookPublishing />
                <Footer />
              </motion.div>
            } />

            <Route path="/specialized/professional-photography" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Professional Photography - AURA Digital"
                  description="Professional photography services by AURA Digital. High-quality photography for all your needs."
                  keywords="professional photography, commercial photography, product photography"
                  canonicalUrl="https://auraofficial.in/specialized/professional-photography"
                />
                <Navbar />
                <ProfessionalPhotography />
                <Footer />
              </motion.div>
            } />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Privacy Policy - AURA Digital"
                  description="Privacy policy of AURA Digital. Learn how we protect your data and privacy."
                  canonicalUrl="https://auraofficial.in/privacy-policy"
                />
                <Navbar />
                <PrivacyPolicy />
                <Footer />
              </motion.div>
            } />

            <Route path="/terms-of-service" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Terms of Service - AURA Digital"
                  description="Terms of service of AURA Digital. Understand our service terms and conditions."
                  canonicalUrl="https://auraofficial.in/terms-of-service"
                />
                <Navbar />
                <TermsOfService />
                <Footer />
              </motion.div>
            } />

            <Route path="/cookie-policy" element={
              <motion.div {...pageTransition}>
                <SEO 
                  title="Cookie Policy - AURA Digital"
                  description="Cookie policy of AURA Digital. Learn about our use of cookies and your choices."
                  canonicalUrl="https://auraofficial.in/cookie-policy"
                />
                <Navbar />
                <CookiePolicy />
                <Footer />
              </motion.div>
            } />

            {/* Admin Authentication & Dashboard Routes */}
            <Route path="/admin/login" element={
              <motion.div {...pageTransition}>
                <SEO title="Admin Login - AURA Digital" />
                <AdminLogin />
              </motion.div>
            } />

            <Route path="/admin/signup" element={
              <motion.div {...pageTransition}>
                <SEO title="Admin Signup - AURA Digital" />
                <AdminSignup />
              </motion.div>
            } />

            <Route path="/admin" element={
              <ProtectedRoute>
                <motion.div {...pageTransition}>
                  <SEO title="Admin Dashboard - AURA Digital" />
                  <AdminDashboard />
                </motion.div>
              </ProtectedRoute>
            } />

            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

            {/* Global Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;