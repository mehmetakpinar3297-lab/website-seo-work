import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Star, Car } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Atlanta Hourly Ride - Premium Chauffeur Service | Private Driver Atlanta"
        description="Atlanta's premier hourly chauffeur service. Professional private drivers available 24/7. Book luxury transportation by the hour with 2-hour minimum. Airport transfers, business travel, special events. Starting at $75/hour."
        keywords="Atlanta hourly ride, Atlanta private driver, Atlanta chauffeur service, luxury chauffeur Atlanta, hourly car service Atlanta, private chauffeur Atlanta, Atlanta airport transfer"
        canonical="https://atlantahourlyride.com"
      />
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1661084423741-7b00ff3fa2ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxBdGxhbnRhJTIwc2t5bGluZSUyMGx1eHVyeSUyMHN1bnNldHxlbnwwfHx8fDE3Njk1Mjk2Mzh8MA&ixlib=rb-4.1.0&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/80 via-[#1B1B1B]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight mb-6">
            Atlanta's Premier<br />Hourly Chauffeur
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 font-manrope">
            Luxury chauffeur service by the hour. Professional, discreet, and always on time.
          </p>
          <div>
            <Link
              to="/booking"
              data-testid="book-ride-hero-btn"
              className="inline-block bg-[#1B1B1B] text-white px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
            >
              Book Your Ride
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300">
              <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Safety First</h3>
              <p className="text-[#2C2C2C] font-manrope leading-relaxed">
                Fully insured, background-checked chauffeurs with impeccable driving records.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300">
              <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Always Punctual</h3>
              <p className="text-[#2C2C2C] font-manrope leading-relaxed">
                Your time is valuable. We guarantee arrival 15 minutes before your scheduled time.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300">
              <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Premium Service</h3>
              <p className="text-[#2C2C2C] font-manrope leading-relaxed">
                White-glove service from booking to destination. Every detail matters.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#1B1B1B]/5 hover:shadow-[0_20px_40px_-10px_rgba(27,27,27,0.05)] transition-all duration-300">
              <div className="w-12 h-12 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Car className="w-6 h-6 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Luxury Fleet</h3>
              <p className="text-[#2C2C2C] font-manrope leading-relaxed">
                Pristine Toyota Sienna vehicles, meticulously maintained and detailed daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
                Our Fleet
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl text-[#1B1B1B] tracking-tight mb-8">
                2025 Toyota Sienna
              </h2>
              <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Our meticulously maintained 2025 Toyota Sienna fleet offers the perfect blend of comfort, space, and sophistication. Each vehicle is professionally detailed before every service.
              </p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4"></div>
                  <span className="text-[#2C2C2C] font-manrope">Premium leather seating for up to 7 passengers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4"></div>
                  <span className="text-[#2C2C2C] font-manrope">Climate control and ambient lighting</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4"></div>
                  <span className="text-[#2C2C2C] font-manrope">Complimentary bottled water and mints</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4"></div>
                  <span className="text-[#2C2C2C] font-manrope">Spacious cargo area for luggage</span>
                </li>
              </ul>
              <div className="space-y-4">
                <Link
                  to="/booking"
                  data-testid="book-ride-fleet-btn"
                  className="inline-block bg-[#1B1B1B] text-white px-16 py-6 text-lg uppercase tracking-widest font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Your Ride
                </Link>
                <div className="text-sm text-[#2C2C2C] font-manrope">
                  Starting at $75/hour • 2-hour minimum
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/20007188/pexels-photo-20007188.jpeg"
                  alt="2025 Black Toyota Sienna - Front View"
                  className="w-full h-auto shadow-[0_20px_40px_-10px_rgba(27,27,27,0.15)]"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#B89D62] text-white px-6 py-3 font-manrope text-sm uppercase tracking-widest">
                  2025 Model
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1716878438300-46c79ffc208c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBsZWF0aGVyJTIwaW50ZXJpb3IlMjBiZWlnZSUyMHNlYXRzJTIwcHJlbWl1bXxlbnwwfHx8fDE3Njk1MzE5MDJ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Premium Leather Interior"
                  className="w-full h-48 object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1583574004402-92cdbaa3528f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXIlMjBsZWF0aGVyJTIwaW50ZXJpb3IlMjBiZWlnZSUyMHNlYXRzJTIwcHJlbWl1bXxlbnwwfHx8fDE3Njk1MzE5MDJ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Spacious Interior Seating"
                  className="w-full h-48 object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 md:px-12 bg-[#1B1B1B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-6xl text-white tracking-tight mb-8">
            Experience Atlanta in Comfort
          </h2>
          <p className="text-xl text-white/80 mb-12 font-manrope">
            Book by the hour, travel at your pace. Your personal chauffeur awaits.
          </p>
          <Link
            to="/booking"
            data-testid="book-ride-footer-btn"
            className="inline-block bg-white text-[#1B1B1B] px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#E4E4DE] transition-all duration-300"
          >
            Book Your Ride
          </Link>
        </div>
      </section>
    </div>
  );
}
