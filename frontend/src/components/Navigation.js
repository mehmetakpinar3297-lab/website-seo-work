import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Booking' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#1B1B1B]/10">
      {/* Top Bar with Contact Info */}
      <div className="hidden md:block bg-[#1B1B1B] py-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end items-center space-x-6 text-sm">
          <a href="tel:+19298678846" className="text-white/80 hover:text-white transition-colors font-manrope flex items-center">
            <Phone className="w-3 h-3 mr-1.5" />
            (929) 867-8846
          </a>
          <a href="mailto:info@atlantahourlyride.com" className="text-white/80 hover:text-white transition-colors font-manrope flex items-center">
            <Mail className="w-3 h-3 mr-1.5" />
            info@atlantahourlyride.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" data-testid="nav-logo">
            <h2 className="font-playfair text-2xl text-[#1B1B1B]">
              Atlanta Luxury
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#B89D62] font-manrope">
              Chauffeur Service
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase()}`}
                className={`text-sm uppercase tracking-widest font-manrope transition-colors ${
                  isActive(link.path)
                    ? 'text-[#1B1B1B] border-b-2 border-[#B89D62]'
                    : 'text-[#2C2C2C] hover:text-[#B89D62]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/booking"
              data-testid="nav-book-now-btn"
              className="bg-[#1B1B1B] text-white px-6 py-3 uppercase tracking-widest text-xs font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            data-testid="mobile-menu-btn"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#1B1B1B]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1B1B1B]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-[#1B1B1B]/10" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-sm uppercase tracking-widest font-manrope transition-colors ${
                  isActive(link.path)
                    ? 'text-[#B89D62]'
                    : 'text-[#2C2C2C] hover:text-[#B89D62]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="block mt-4 bg-[#1B1B1B] text-white px-6 py-3 text-center uppercase tracking-widest text-xs font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
