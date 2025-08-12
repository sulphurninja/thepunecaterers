import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Pune Caterers – Leading Catering Service in Pune',
  description: 'Discover Pune Caterers\' story, team, and values. Experts in sustainable, customized catering for events across Pune since 2015. Learn more!',
  keywords: 'about Pune Caterers, catering company Pune, our team Pune Caterers, sustainable catering Pune',
  authors: [{ name: 'Pune Caterers' }],
  openGraph: {
    title: 'About Us | Pune Caterers – Leading Catering Service in Pune',
    description: 'Discover Pune Caterers\' story, team, and values. Experts in sustainable, customized catering for events across Pune since 2015.',
    images: ['/about-pune-caterers.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Pune Caterers – Leading Catering Service in Pune',
    description: 'Discover Pune Caterers\' story, team, and values. Experts in sustainable, customized catering for events across Pune since 2015.',
    images: ['/about-pune-caterers.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://punecaterers.com/about-us',
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pune Caterers",
            "image": "https://punecaterers.com/logo.jpg",
            "@id": "",
            "url": "https://punecaterers.com/about-us",
            "telephone": "+91-8087889252",
            "priceRange": "$$",
            "foundingDate": "2015",
            "numberOfEmployees": "50+",
            "description": "Leading catering service in Pune since 2015, specializing in sustainable, customized events across 14 neighborhoods.",
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
            "sameAs": ["https://www.facebook.com/punecaterers", "https://www.instagram.com/punecaterers"],
            "founder": [
              {
                "@type": "Person",
                "name": "Rajesh Kumar",
                "jobTitle": "Head Chef"
              },
              {
                "@type": "Person", 
                "name": "Priya Desai",
                "jobTitle": "Event Manager"
              }
            ]
          })
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who is Pune Caterers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We're a leading catering service in Pune, founded in 2015, specializing in customized events across 14 neighborhoods."
                }
              },
              {
                "@type": "Question",
                "name": "What sets your team apart?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our 50+ experts combine culinary innovation with logistical precision, led by seasoned chefs and planners."
                }
              },
              {
                "@type": "Question",
                "name": "Do you focus on sustainability?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We prioritize farm-to-table sourcing and zero-waste practices for eco-friendly events."
                }
              },
              {
                "@type": "Question",
                "name": "How has Pune Caterers grown?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "From local weddings to 1,000+ events, mirroring Pune's expansion to 7.5 million by 2025."
                }
              },
              {
                "@type": "Question",
                "name": "Can I visit your kitchen or meet the team?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Contact us to schedule a consultation and tour our facilities."
                }
              }
            ]
          })
        }}
      />

      {children}
    </div>
  )
}