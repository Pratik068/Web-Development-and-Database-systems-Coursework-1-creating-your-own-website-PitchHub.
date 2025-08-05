// src/pages/Home.jsx
import React from 'react';
import { FaRocket, FaUsers, FaChartLine, FaLightbulb, FaStar, FaArrowRight } from 'react-icons/fa';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Connect. <span className="gradient-text">Innovate.</span> Succeed.
            </h1>
            <p className="hero-subtitle">
              Join the ultimate social networking platform for entrepreneurs, investors, and innovators. 
              Share your ideas, connect with like-minded professionals, and turn your vision into reality.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                Get Started Free
                <FaArrowRight className="btn-icon" />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Successful Pitches</span>
              </div>
              <div className="stat">
                <span className="stat-number">$2M+</span>
                <span className="stat-label">Funds Raised</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <FaRocket className="card-icon" />
              <span>Launch Your Idea</span>
            </div>
            <div className="floating-card card-2">
              <FaUsers className="card-icon" />
              <span>Connect Network</span>
            </div>
            <div className="floating-card card-3">
              <FaChartLine className="card-icon" />
              <span>Grow Together</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose PitchHub?</h2>
            <p>Everything you need to build your network and grow your business</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaRocket />
              </div>
              <h3>Pitch Your Ideas</h3>
              <p>Share your innovative ideas with a community of investors and entrepreneurs who can help bring them to life.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Build Your Network</h3>
              <p>Connect with industry leaders, potential investors, and fellow entrepreneurs from around the world.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Track Progress</h3>
              <p>Monitor your pitch performance, engagement metrics, and growth with detailed analytics and insights.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaLightbulb />
              </div>
              <h3>Get Feedback</h3>
              <p>Receive valuable feedback from experts and peers to refine your ideas and improve your pitch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from entrepreneurs who found success on PitchHub</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"PitchHub connected me with the right investors who believed in my vision. Within 3 months, I secured $500K in funding!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Sarah Chen" />
                </div>
                <div className="author-info">
                  <h4>Sarah Chen</h4>
                  <p>Founder, TechFlow</p>
                  <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The networking opportunities on PitchHub are incredible. I've built partnerships that have transformed my business."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Marcus Johnson" />
                </div>
                <div className="author-info">
                  <h4>Marcus Johnson</h4>
                  <p>CEO, GreenTech Solutions</p>
                  <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As an investor, PitchHub has helped me discover amazing startups that I would have never found otherwise."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Emily Rodriguez" />
                </div>
                <div className="author-info">
                  <h4>Emily Rodriguez</h4>
                  <p>Angel Investor</p>
                  <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of entrepreneurs and investors who are already building the future on PitchHub</p>
            <button className="btn-primary btn-large">
              Create Your Account
              <FaArrowRight className="btn-icon" />
            </button>
            <p className="cta-note">Free to join • No credit card required</p>
          </div>
        </div>
      </section>
    </div>
  );
}
