import type { Metadata } from 'next'
import { getLocationBySlug, getAllLocationSlugs } from '@/data/locations'
import { notFound } from 'next/navigation'

interface LocationLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locationData = getLocationBySlug(params.slug)
  
  if (!locationData) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page could not be found.'
    }
  }

  const title = `Catering Services in ${locationData.fullName} | Weddings, Parties & More`
  const description = `Top catering services in ${locationData.fullName} by Pune Caterers. Premium cuisine for events. Population: ${locationData.population}. Free quote!`

  return {
    title,
    description,
    keywords: `catering services in ${locationData.name} Pune, caterers in ${locationData.name} Pune, ${locationData.name} catering, wedding catering ${locationData.name}, corporate catering ${locationData.name}`,
    authors: [{ name: 'Pune Caterers' }],
    openGraph: {
      title,
      description,
      images: [`/catering-${locationData.slug}-pune.jpg`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/catering-${locationData.slug}-pune.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://thepunecaterers.com/locations/${locationData.slug}`,
    }
  }
}

export default function LocationLayout({ children, params }: LocationLayoutProps) {
  const locationData = getLocationBySlug(params.slug)
  
  if (!locationData) {
    notFound()
  }

  return (
    <div>
      {/* Location Business Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Pune Caterers - ${locationData.name}`,
            "image": "https://thepunecaterers.com/logo.jpg",
            "url": `https://thepunecaterers.com/locations/${locationData.slug}`,
            "telephone": "+91-8087889252",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": locationData.name,
              "addressLocality": "Pune",
              "addressRegion": "MH",
              "postalCode": locationData.postalCode,
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": locationData.coordinates.lat,
              "longitude": locationData.coordinates.lng
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": ["https://www.facebook.com/punecaterers", "https://www.instagram.com/punecaterers"],
            "areaServed": {
              "@type": "Place",
              "name": `${locationData.name}, Pune`
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
            "mainEntity": locationData.faqs.map(faq => ({
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
            locationData.testimonials.map(testimonial => ({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Service",
                "name": `Catering in ${locationData.name}`
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

      {children}
    </div>
  )
}