import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Mail, Phone, Send } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
              Contact Us
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl text-[#1B1B1B] tracking-tight mb-6">
              Let's Talk
            </h1>
            <p className="text-xl text-[#2C2C2C] max-w-2xl font-manrope leading-relaxed">
              Questions about our service? Ready to book? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 border border-[#1B1B1B]/5">
              <h2 className="font-playfair text-3xl text-[#1B1B1B] mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="mb-6">
                  <input
                    type="text"
                    data-testid="contact-name-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="email"
                    data-testid="contact-email-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="tel"
                    data-testid="contact-phone-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                    required
                    className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                  />
                </div>

                <div className="mb-8">
                  <textarea
                    data-testid="contact-message-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message"
                    required
                    rows="5"
                    className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={loading}
                  className="w-full bg-[#1B1B1B] text-white px-10 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white p-10 border border-[#1B1B1B]/5 mb-8">
                <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start" data-testid="contact-phone-display">
                    <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#B89D62]" />
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-[#B89D62] mb-1 font-manrope">
                        Phone
                      </div>
                      <a href="tel:+14045551234" className="text-lg text-[#1B1B1B] font-manrope hover:text-[#B89D62] transition-colors">
                        (404) 555-1234
                      </a>
                      <p className="text-sm text-[#2C2C2C] mt-1 font-manrope">
                        Available 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start" data-testid="contact-email-display">
                    <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#B89D62]" />
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-[#B89D62] mb-1 font-manrope">
                        Email
                      </div>
                      <a href="mailto:info@atlantaluxurychauffeur.com" className="text-lg text-[#1B1B1B] font-manrope hover:text-[#B89D62] transition-colors break-all">
                        info@atlantaluxurychauffeur.com
                      </a>
                      <p className="text-sm text-[#2C2C2C] mt-1 font-manrope">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1B1B1B] p-10">
                <h3 className="font-playfair text-2xl text-white mb-4">Business Hours</h3>
                <p className="text-white/90 font-manrope mb-6">
                  We're a mobile service available throughout Atlanta and surrounding areas.
                </p>
                <div className="space-y-3 text-white/80 font-manrope">
                  <div className="flex justify-between">
                    <span>Service Hours</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking</span>
                    <span className="text-white">Online Anytime</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support</span>
                    <span className="text-white">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
