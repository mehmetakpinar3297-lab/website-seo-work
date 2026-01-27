import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, Briefcase, Users } from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#1B1B1B]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
            Our Services
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-[#1B1B1B] tracking-tight mb-6">
            Luxury Chauffeur Service<br />By The Hour
          </h1>
          <p className="text-xl text-[#2C2C2C] max-w-3xl font-manrope leading-relaxed">
            Whether you need hourly service for business meetings, airport transfers, or special events, we provide a seamless, luxury experience tailored to your schedule.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hourly Chauffeur - The Core */}
            <div className="lg:col-span-2 bg-white p-16 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300" data-testid="hourly-service-card">
              <div className="max-w-3xl">
                <div className="w-16 h-16 bg-[#B89D62]/10 flex items-center justify-center mb-8">
                  <Clock className="w-8 h-8 text-[#B89D62]" />
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B] mb-6">
                  Hourly Chauffeur Service
                </h2>
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-8 font-manrope">
                  Our signature service. Book your personal chauffeur by the hour with a 2-hour minimum. Perfect for multiple stops, meetings, shopping trips, or simply having a driver at your disposal. Pay only for the time you need.
                </p>
                <div className="border-l-2 border-[#B89D62] pl-6 mb-8">
                  <div className="space-y-3">
                    <p className="text-[#2C2C2C] font-manrope"><strong>Minimum:</strong> 2 hours</p>
                    <p className="text-[#2C2C2C] font-manrope"><strong>Rate:</strong> $75 per hour</p>
                    <p className="text-[#2C2C2C] font-manrope"><strong>Deposit:</strong> 50% upfront, balance due after service</p>
                    <p className="text-[#2C2C2C] font-manrope"><strong>Availability:</strong> 24/7, book in 15-minute increments</p>
                  </div>
                </div>
                <Link
                  to="/booking"
                  data-testid="book-hourly-btn"
                  className="inline-block bg-[#1B1B1B] text-white px-10 py-4 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Airport Transfers */}
            <div className="bg-white p-12 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300" data-testid="airport-service-card">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-8">
                <Plane className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-6">
                Airport Transfers
              </h3>
              <p className="text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Stress-free airport transfers billed hourly. We monitor your flight status and adjust pickup times accordingly. Meet & greet service included.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Hartsfield-Jackson Atlanta International</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">DeKalb-Peachtree Airport</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">All regional airports covered</span>
                </li>
              </ul>
            </div>

            {/* Special Events */}
            <div className="bg-white p-12 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300" data-testid="events-service-card">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-8">
                <Calendar className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-6">
                Special Events
              </h3>
              <p className="text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Make your special occasions unforgettable. Weddings, galas, concerts, sporting events – arrive in style and leave the driving to us.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Weddings & anniversaries</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Corporate events & galas</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Concerts & sporting events</span>
                </li>
              </ul>
            </div>

            {/* Business Travel */}
            <div className="bg-white p-12 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300" data-testid="business-service-card">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-8">
                <Briefcase className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-6">
                Business Travel
              </h3>
              <p className="text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Professional chauffeur service for executives and business travelers. Productive, private, and punctual. Perfect for multi-stop business days.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Multi-stop meeting schedules</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Corporate account billing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Discrete, professional service</span>
                </li>
              </ul>
            </div>

            {/* Personal Use */}
            <div className="bg-white p-12 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300" data-testid="personal-service-card">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-8">
                <Users className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-6">
                Personal Use
              </h3>
              <p className="text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Sometimes you just need a driver. Shopping trips, doctor appointments, social visits – we're here whenever you need us.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Shopping & errands</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Medical appointments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-[#B89D62] mt-2 mr-3"></div>
                  <span className="text-[#2C2C2C] font-manrope">Social occasions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B] tracking-tight mb-8">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg text-[#2C2C2C] mb-10 font-manrope">
            Book your hourly chauffeur service today. 2-hour minimum, flexible scheduling.
          </p>
          <Link
            to="/booking"
            data-testid="book-service-cta-btn"
            className="inline-block bg-[#1B1B1B] text-white px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
          >
            Book Your Ride
          </Link>
        </div>
      </section>
    </div>
  );
}

// Missing import
const Clock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
