import type { Metadata } from 'next'
import { getEventBySlug, getAllEventSlugs } from '@/data/events'
import { notFound } from 'next/navigation'

interface EventLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const eventData = getEventBySlug(params.slug)
  
  if (!eventData) {
    return {
      title: 'Event Not Found',
      description: 'The requested event catering page could not be found.'
    }
  }

  const title = `${eventData.fullName} | Premium Catering Services in Pune`
  const description = `${eventData.description.substring(0, 150)}... Contact us for specialized ${eventData.name.toLowerCase()} catering services across Pune. Free quote!`

  return {
    title,
    description,
    keywords: `${eventData.name.toLowerCase()} catering Pune, ${eventData.name.toLowerCase()} caterers Pune, ${eventData.name.toLowerCase()} catering services, Pune ${eventData.name.toLowerCase()} catering, best ${eventData.name.toLowerCase()} caterers Pune`,
    authors: [{ name: 'Pune Caterers' }],
    openGraph: {
      title,
      description,
      images: [`/${eventData.slug}-catering-pune.jpg`],
      type: 'website',
      siteName: 'Pune Caterers'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/${eventData.slug}-catering-pune.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://thepunecaterers.com/events/${eventData.slug}`,
    }
  }
}

export default function EventLayout({ children, params }: EventLayoutProps) {
  const eventData = getEventBySlug(params.slug)
  
  if (!eventData) {
    notFound()
  }

  return (
    <div>
      {/* Event Business Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${eventData.name} Catering Services`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Pune Caterers",
              "image": "https://thepunecaterers.com/logo.jpg",
              "url": "https://thepunecaterers.com",
              "telephone": "+91-8087889252",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "MH",
                "addressCountry": "IN"
              }
            },
            "serviceType": `${eventData.name} Catering`,
            "description": eventData.description,
            "areaServed": {
              "@type": "City",
              "name": "Pune"
            },
            "offers": {
              "@type": "Offer",
              "priceRange": `₹${eventData.priceRange.starter}-₹${eventData.priceRange.premium}`,
              "priceCurrency": "INR"
            },
            "url": `https://thepunecaterers.com/events/${eventData.slug}`,
            "category": "Catering Service",
            "audience": {
              "@type": "Audience",
              "name": `${eventData.name} Celebrations`
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
            "mainEntity": eventData.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Reviews Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventData.testimonials.map(testimonial => ({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Service",
                "name": `${eventData.name} Catering Services`
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating.toString(),
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewBody": testimonial.review
            }))
          )
        }}
      />

      {/* Event-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${eventData.name} Catering in Pune`,
            "description": eventData.description,
            "url": `https://thepunecaterers.com/events/${eventData.slug}`,
            "mainEntity": {
              "@type": "Service",
              "name": `${eventData.name} Catering`,
              "description": eventData.description,
              "provider": {
                "@type": "Organization",
                "name": "Pune Caterers"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://thepunecaterers.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Events",
                  "item": "https://thepunecaterers.com/events"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": eventData.name,
                  "item": `https://thepunecaterers.com/events/${eventData.slug}`
                }
              ]
            }
          })
        }}
      />

      {children}
    </div>
  )
}