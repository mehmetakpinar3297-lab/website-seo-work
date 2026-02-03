import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Professional Chauffeur Service Atlanta | Atlanta Hourly Ride"
        description="Learn about Atlanta Hourly Ride - Atlanta's premier chauffeur service. Professional drivers, luxury vehicles, 24/7 availability. Safety, professionalism, and cleanliness are our top priorities."
        keywords="Atlanta chauffeur company, professional drivers Atlanta, luxury transportation Atlanta, about Atlanta Hourly Ride"
        canonical="https://atlantahourlyride.com/about"
      />
      
      <div className="min-h-screen bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#1B1B1B]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
            About Us
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-[#1B1B1B] tracking-tight mb-6">
            Driven by Excellence
          </h1>
          <p className="text-xl text-[#2C2C2C] max-w-3xl font-manrope leading-relaxed">
            We are Atlanta's premier hourly chauffeur service, dedicated to providing a luxury transportation experience that prioritizes safety, professionalism, and impeccable service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <img
                src="https://images.unsplash.com/photo-1603087462214-2aadc739429c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjaGF1ZmZldXIlMjBzdGFuZGluZyUyMHByb2Zlc3Npb25hbCUyMHN1aXQlMjBmYWNlJTIwaGlkZGVufGVufDB8fHx8MTc2OTUyOTYzMnww&ixlib=rb-4.1.0&q=85"
                alt="Professional chauffeur"
                className="w-full h-auto shadow-[0_20px_40px_-10px_rgba(27,27,27,0.1)]"
                data-testid="chauffeur-image"
              />
            </div>

            <div>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B] tracking-tight mb-8">
                Professional Chauffeurs You Can Trust
              </h2>
              <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                Every member of our team undergoes rigorous background checks, defensive driving training, and customer service excellence programs. We don't just hire drivers—we select professionals who understand the meaning of discretion and luxury service.
              </p>
              <p className="text-lg text-[#2C2C2C] leading-relaxed font-manrope">
                Our chauffeurs are more than drivers. They are ambassadors of your experience, ensuring every journey is smooth, safe, and exceeds your expectations.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-10 border border-[#1B1B1B]/5" data-testid="safety-value">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-4">Safety First</h3>
              <p className="text-[#2C2C2C] leading-relaxed font-manrope">
                Your safety is our top priority. Fully insured vehicles, defensive driving certified chauffeurs, and real-time GPS tracking on every ride.
              </p>
            </div>

            <div className="bg-white p-10 border border-[#1B1B1B]/5" data-testid="professionalism-value">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-4">Professionalism</h3>
              <p className="text-[#2C2C2C] leading-relaxed font-manrope">
                Impeccable presentation, courteous service, and unwavering attention to detail. We represent your standards, not just ours.
              </p>
            </div>

            <div className="bg-white p-10 border border-[#1B1B1B]/5" data-testid="cleanliness-value">
              <div className="w-14 h-14 bg-[#B89D62]/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#B89D62]" />
              </div>
              <h3 className="font-playfair text-3xl text-[#1B1B1B] mb-4">Cleanliness</h3>
              <p className="text-[#2C2C2C] leading-relaxed font-manrope">
                Every vehicle is professionally detailed before every service. Pristine interiors, fresh scents, and immaculate presentation are standard.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white p-16 border border-[#1B1B1B]/5">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B] tracking-tight mb-12">
              The Luxury Difference
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
                  Our Commitment
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Background-verified chauffeurs with clean driving records</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Professional attire and courteous service at all times</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Vehicles detailed and sanitized before every service</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Real-time GPS tracking for your peace of mind</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">24/7 customer support and dispatch</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
                  Your Experience
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Complimentary bottled water and mints in every vehicle</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Climate-controlled comfort year-round</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Privacy partitions available upon request</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Flexible hourly service – pay only for what you need</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#B89D62] mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-[#2C2C2C] font-manrope">Seamless booking and payment process</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#1B1B1B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-white tracking-tight mb-8">
            Experience the Standard
          </h2>
          <p className="text-lg text-white/80 mb-10 font-manrope">
            Professional chauffeur service, available by the hour. Book your ride today.
          </p>
          <a
            href="/booking"
            data-testid="book-about-cta-btn"
            className="inline-block bg-white text-[#1B1B1B] px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#E4E4DE] transition-all duration-300"
          >
            Book Your Ride
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
