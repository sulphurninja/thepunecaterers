import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Catering Services in Pune | Weddings, Corporates & Parties",
  description: "Premier catering services in Pune by Pune Caterers. Customized menus for events across all locations like Hinjewadi, Koregaon Park. Get a free quote!",
  keywords: "catering services Pune, caterers Pune, wedding catering Pune, corporate catering Pune, party catering Pune, full-service catering Pune",
  authors: [{ name: "Pune Caterers" }],
  creator: "Pune Caterers",
  publisher: "Pune Caterers",
  robots: "index, follow",
  // Favicon and icon metadata
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Best Catering Services in Pune | Weddings, Corporates & Parties",
    description: "Premier catering services in Pune by Pune Caterers. Customized menus for events across all locations like Hinjewadi, Koregaon Park. Get a free quote!",
    url: "https://punecaterers.com",
    siteName: "Pune Caterers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pune Caterers - Premier Catering Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Catering Services in Pune | Weddings, Corporates & Parties",
    description: "Premier catering services in Pune by Pune Caterers. Customized menus for events across all locations like Hinjewadi, Koregaon Park. Get a free quote!",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thepunecaterers.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pune Caterers",
              "image": "https://punecaterers.com/logo.jpg",
              "url": "https://punecaterers.com",
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
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}