import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Briefcase, Calendar, Shield, Star, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function HourlyService() {
  return (
    <>
      <SEO 
        title="Hourly Limo Service in Atlanta | Atlanta Hourly Ride - Luxury Chauffeur"
        description="Premium hourly limo service in Atlanta. Professional chauffeurs, luxury vehicles for business, events, and special occasions. Book your Atlanta hourly limo today. Starting at $75/hour."
        keywords="hourly limo service Atlanta, Atlanta hourly limo, hourly car service Atlanta, limo rentals Atlanta, chauffeur services Atlanta, luxury limo Atlanta"
        canonical="https://atlantahourlyride.com/hourly-service"
      />
      
      <div className="min-h-screen bg-[#F5F5F0]">
        {/* Hero Section */}
        <section className="py-24 px-6 md:px-12 bg-white border-b border-[#1B1B1B]/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-[#B89D62] mb-4 font-manrope">
              Premium Transportation
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl text-[#1B1B1B] tracking-tight mb-6">
              Hourly Limo Service in Atlanta
            </h1>
            <p className="text-xl text-[#2C2C2C] max-w-3xl font-manrope leading-relaxed mb-8">
              Atlanta's most trusted hourly chauffeur service. Professional drivers, luxury vehicles, and flexible hourly rates for any occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                data-testid="book-hourly-service-btn"
                className="bg-[#1B1B1B] text-white px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300"
              >
                Book Now
              </Link>
              <a
                href="tel:+19298678846"
                className="border-2 border-[#1B1B1B] text-[#1B1B1B] px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#1B1B1B] hover:text-white transition-all duration-300"
              >
                Call (929) 867-8846
              </a>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Luxury Limo and Chauffeur Services */}
            <div className="mb-24">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-[#B89D62] mr-4" />
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B]">
                  Luxury Limo and Chauffeur Services by the Hour
                </h2>
              </div>
              <div className="bg-white p-12 border border-[#1B1B1B]/5">
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                  Experience the ultimate in comfort and style with our <strong>hourly limo service in Atlanta</strong>. Whether you need a vehicle for a business meeting, a night out, or a special occasion, our professional chauffeurs ensure a safe and luxurious ride. Our fleet includes high-end sedans and stretch limousines, all maintained to the highest standards.
                </p>
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-8 font-manrope">
                  Enjoy punctual service, privacy, and a personalized experience. Book your <strong>Atlanta hourly limo</strong> today and travel like a VIP!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#B89D62] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-manrope font-medium text-[#1B1B1B] mb-2">2025 Toyota Sienna Fleet</h3>
                      <p className="text-sm text-[#2C2C2C] font-manrope">Premium vehicles maintained to the highest standards</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#B89D62] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-manrope font-medium text-[#1B1B1B] mb-2">Professional Chauffeurs</h3>
                      <p className="text-sm text-[#2C2C2C] font-manrope">Background-checked, licensed drivers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#B89D62] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-manrope font-medium text-[#1B1B1B] mb-2">Flexible Hourly Rates</h3>
                      <p className="text-sm text-[#2C2C2C] font-manrope">Starting at $75/hour, 2-hour minimum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate & Business */}
            <div className="mb-24">
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-[#B89D62] mr-4" />
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B]">
                  Corporate & Business Hourly Car Service in Atlanta
                </h2>
              </div>
              <div className="bg-white p-12 border border-[#1B1B1B]/5">
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                  For business professionals, <strong>Atlanta hourly limo services</strong> provide a seamless way to travel between meetings or airport transfers. Our trained chauffeurs understand the importance of punctuality and discretion. Impress clients or colleagues by choosing a luxury vehicle with reliable service.
                </p>
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-8 font-manrope">
                  Each ride is tailored to your schedule, ensuring maximum productivity. Elevate your corporate travel experience—book your <strong>hourly car service in Atlanta</strong> now.
                </p>
                <div className="bg-[#F5F5F0] p-8 border-l-4 border-[#B89D62]">
                  <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Corporate Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#B89D62] mr-3">•</span>
                      <span className="text-[#2C2C2C] font-manrope">Multi-stop itineraries for back-to-back meetings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B89D62] mr-3">•</span>
                      <span className="text-[#2C2C2C] font-manrope">Hartsfield-Jackson Airport transfers with flight monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B89D62] mr-3">•</span>
                      <span className="text-[#2C2C2C] font-manrope">Corporate account billing available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B89D62] mr-3">•</span>
                      <span className="text-[#2C2C2C] font-manrope">Professional, discrete service for executives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Special Events */}
            <div className="mb-24">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-[#B89D62] mr-4" />
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B]">
                  Special Event and Wedding Limo Rentals
                </h2>
              </div>
              <div className="bg-white p-12 border border-[#1B1B1B]/5">
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                  Make your special day unforgettable with our <strong>luxury limo rentals in Atlanta</strong>. From weddings to birthday parties, prom nights, or anniversaries, our vehicles add elegance and sophistication to any event. Our chauffeurs provide courteous, professional service, ensuring comfort and style from start to finish.
                </p>
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-8 font-manrope">
                  Celebrate in luxury and arrive in style—reserve your <strong>limo for special events in Atlanta</strong> today!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-2xl text-[#1B1B1B] mb-4">Perfect For:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Weddings & Receptions
                      </li>
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Birthday Celebrations
                      </li>
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Prom & Homecoming
                      </li>
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Anniversary Dinners
                      </li>
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Corporate Galas
                      </li>
                      <li className="flex items-center text-[#2C2C2C] font-manrope">
                        <Star className="w-4 h-4 text-[#B89D62] mr-2" />
                        Concerts & Sporting Events
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#1B1B1B] text-white p-8">
                    <h3 className="font-playfair text-2xl mb-4">Premium Package</h3>
                    <p className="text-white/80 mb-4 font-manrope">
                      Book 4+ hours and receive complimentary champagne service for special occasions
                    </p>
                    <Link
                      to="/booking"
                      className="inline-block bg-[#B89D62] text-white px-8 py-3 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#9A8252] transition-all duration-300"
                    >
                      Reserve Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-24">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-[#B89D62] mr-4" />
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1B1B1B]">
                  Why Choose Atlanta Hourly Ride
                </h2>
              </div>
              <div className="bg-white p-12 border border-[#1B1B1B]/5">
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6 font-manrope">
                  <strong>Atlanta Hourly Ride</strong> stands out for its reliability, professional chauffeurs, and commitment to customer satisfaction. We combine luxury vehicles with outstanding service to make every trip memorable. Whether it's for business or pleasure, our focus is on safety, punctuality, and comfort.
                </p>
                <p className="text-lg text-[#2C2C2C] leading-relaxed mb-8 font-manrope">
                  Customers choose us because we consistently deliver a high-quality experience. Experience the difference yourself—book your <strong>Atlanta hourly limo</strong> now and enjoy a premium ride!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-[#F5F5F0]">
                    <div className="text-4xl font-playfair text-[#B89D62] mb-2">24/7</div>
                    <div className="text-sm uppercase tracking-widest font-manrope text-[#1B1B1B]">Availability</div>
                  </div>
                  <div className="text-center p-6 bg-[#F5F5F0]">
                    <div className="text-4xl font-playfair text-[#B89D62] mb-2">$75</div>
                    <div className="text-sm uppercase tracking-widest font-manrope text-[#1B1B1B]">Per Hour</div>
                  </div>
                  <div className="text-center p-6 bg-[#F5F5F0]">
                    <div className="text-4xl font-playfair text-[#B89D62] mb-2">2hr</div>
                    <div className="text-sm uppercase tracking-widest font-manrope text-[#1B1B1B]">Minimum</div>
                  </div>
                  <div className="text-center p-6 bg-[#F5F5F0]">
                    <div className="text-4xl font-playfair text-[#B89D62] mb-2">100%</div>
                    <div className="text-sm uppercase tracking-widest font-manrope text-[#1B1B1B]">Professional</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl text-white tracking-tight mb-6">
              Ready to Book Your Hourly Limo Service?
            </h2>
            <p className="text-xl text-white/80 mb-10 font-manrope">
              Professional chauffeurs. Luxury vehicles. Flexible hourly rates. Available 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                data-testid="cta-book-now-btn"
                className="bg-white text-[#1B1B1B] px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#E4E4DE] transition-all duration-300"
              >
                Book Online Now
              </Link>
              <a
                href="tel:+19298678846"
                className="border-2 border-white text-white px-12 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-white hover:text-[#1B1B1B] transition-all duration-300"
              >
                Call (929) 867-8846
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
