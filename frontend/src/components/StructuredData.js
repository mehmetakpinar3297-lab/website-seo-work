import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://atlantahourlyride.com",
    "name": "Atlanta Hourly Ride",
    "alternateName": "Atlanta Luxury Chauffeur Service",
    "description": "Premium hourly chauffeur service in Atlanta. Professional private drivers available 24/7 for airport transfers, business travel, special events, and personal use.",
    "url": "https://atlantahourlyride.com",
    "telephone": "+19298678846",
    "email": "info@atlantahourlyride.com",
    "priceRange": "$75-$500",
    "image": "https://atlantahourlyride.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.812713,
      "longitude": -84.355350
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 33.812713,
        "longitude": -84.355350
      },
      "geoRadius": "50000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "paymentAccepted": "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    "currenciesAccepted": "USD",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Chauffeur Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hourly Chauffeur Service",
            "description": "Premium chauffeur service available by the hour with 2-hour minimum"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Airport Transfer Service",
            "description": "Professional airport transportation to and from Hartsfield-Jackson Atlanta International Airport"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Special Events Chauffeur",
            "description": "Luxury transportation for weddings, corporate events, and special occasions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Travel Chauffeur",
            "description": "Executive chauffeur service for business meetings and corporate travel"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/atlantahourlyride",
      "https://www.instagram.com/atlantahourlyride",
      "https://www.linkedin.com/company/atlantahourlyride"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;