import Script from 'next/script';

const SchemaMarkup = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pune Caterers",
    "image": "https://thepunecaterers.com/logo.jpg",
    "@id": "",
    "url": "https://thepunecaterers.com",
    "telephone": "+91-8087889252",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "MH",
      "postalCode": "411001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": ["https://www.facebook.com/punecaterers", "https://www.instagram.com/punecaterers"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the cost of catering services in Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Packages start at ₹500 per plate; a 100-guest event in Chinchwad may range ₹50,000-₹1,00,000 with customizations."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book caterers in Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fill our form for a complimentary consult. We serve all areas like Wakad, Kothrud, and Kondhwa with ease."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
};

export default SchemaMarkup;