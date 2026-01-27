import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl mb-2">Atlanta Luxury</h3>
            <p className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
              Chauffeur Service
            </p>
            <p className="text-white/70 text-sm font-manrope leading-relaxed">
              Premier hourly chauffeur service in Atlanta. Professional, safe, and luxurious.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 font-manrope">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 font-manrope">Our Services</h4>
            <ul className="space-y-3 text-white/70 text-sm font-manrope">
              <li>Hourly Chauffeur</li>
              <li>Airport Transfers</li>
              <li>Special Events</li>
              <li>Business Travel</li>
              <li>Personal Use</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 font-manrope">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-[#B89D62] mr-3 mt-1 flex-shrink-0" />
                <a href="tel:+14045551234" className="text-white/70 hover:text-white transition-colors font-manrope text-sm">
                  (404) 555-1234
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-[#B89D62] mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:info@atlantaluxurychauffeur.com" className="text-white/70 hover:text-white transition-colors font-manrope text-sm break-all">
                  info@atlantaluxurychauffeur.com
                </a>
              </li>
            </ul>
            <p className="text-white/70 text-sm mt-6 font-manrope">
              Available 24/7
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm font-manrope">
              © {new Date().getFullYear()} Atlanta Luxury Chauffeur Service. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm font-manrope">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm font-manrope">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
