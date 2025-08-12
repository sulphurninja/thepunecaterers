import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Pune Caterers – Get a Free Quote for Events in Pune',
  description: 'Contact Pune Caterers for customized catering quotes. Serving weddings, corporates across Pune locations like Hinjewadi, Koregaon Park. Call now!',
  keywords: 'contact Pune Caterers, catering quote Pune, event planning Pune, catering consultation Pune',
  authors: [{ name: 'Pune Caterers' }],
  openGraph: {
    title: 'Contact Us | Pune Caterers – Get a Free Quote for Events in Pune',
    description: 'Contact Pune Caterers for customized catering quotes. Serving weddings, corporates across Pune locations like Hinjewadi, Koregaon Park.',
    images: ['/contact-pune-caterers.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Pune Caterers – Get a Free Quote for Events in Pune',
    description: 'Contact Pune Caterers for customized catering quotes. Serving weddings, corporates across Pune locations like Hinjewadi, Koregaon Park.',
    images: ['/contact-pune-caterers.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://punecaterers.com/contact-us',
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pune Caterers",
            "image": "https://punecaterers.com/logo.jpg",
            "@id": "",
            "url": "https://punecaterers.com/contact-us",
            "telephone": "+91-8087889252",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Central Pune",
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
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8087889252",
              "contactType": "Customer Service",
              "email": "info@punecaterers.com",
              "availableLanguage": "English"
            }
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
                "name": "How quickly will I get a response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We aim to reply within 24 hours, often sooner for urgent queries in high-demand areas like Hinjewadi."
                }
              },
              {
                "@type": "Question",
                "name": "Can I schedule a consultation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Use the form to request an in-person or virtual meet to discuss your event in locations like Baner or Yerwada."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer free quotes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely—share your details, and we'll provide a tailored quote based on guest count, menu, and venue."
                }
              },
              {
                "@type": "Question",
                "name": "What information do you need for a quote?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Event type, date, guest count, location (e.g., Kothrud or Wagholi), and any special requests like vegan options."
                }
              },
              {
                "@type": "Question",
                "name": "Can I visit your facility?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Contact us to arrange a tour of our kitchen, where we prepare sustainable menus for Pune's diverse events."
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