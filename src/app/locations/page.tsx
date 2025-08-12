"use client";

import { motion, useInView } from "framer-motion";
import { locationsData } from "@/data/locations";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { MapPin, Users, Star, ArrowRight } from "lucide-react";

// Main Component
export default function LocationsIndex() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Floating Navigation with Working Mobile Menu */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : -20
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-full px-4 md:px-8 py-2 md:py-3 border border-stone-200/20 shadow-lg relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Main Navigation Bar */}
          <div className="flex items-center space-x-4 md:space-x-8 text-sm font-medium">
            <Link href='/'>
              <motion.span
                className="text-stone-900 font-semibold flex-shrink-0"
                whileHover={{ color: "#f59e0b" }}
              >
                <img src='/logo.png' className=" h-12 w-auto" alt="Pune Caterers Logo" />
              </motion.span>
            </Link>
            {/* Desktop Navigation Items */}
            <div className="hidden sm:flex items-center space-x-8">
              {["Events", "Locations", "About"].map((item, i) => (
                <motion.div key={item}>
                  <Link href={`/${item.toLowerCase()}`}>
                    <motion.span
                      className="text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="sm:hidden text-stone-600 hover:text-amber-800 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>

          {/* Mobile Dropdown Menu */}
          <motion.div
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : -10,
              scale: isMobileMenuOpen ? 1 : 0.95,
              pointerEvents: isMobileMenuOpen ? "auto" : "none"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 sm:hidden"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-200/30 shadow-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {["Events", "Locations", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ duration: 0.2, delay: isMobileMenuOpen ? 0.1 + i * 0.05 : 0 }}
                >
                  <Link href={`/${item.toLowerCase()}`}>
                    <motion.div
                      className="block px-6 py-4 text-stone-700 hover:text-amber-800 hover:bg-amber-50/50 transition-all duration-200 font-medium cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Backdrop */}
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? "auto" : "none"
          }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 -z-10 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </motion.nav>

      <HeroSection />
      <LocationsGrid />
      <StatsSection />
      <FooterSection />
    </div>
  );
}
// Footer Section with Professional Icons
function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-stone-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Events Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="font-serif text-lg text-amber-400">Events</h4>
            </motion.div>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Wedding", link: "/events/wedding" },
                { name: "Birthday", link: "/events/birthday-party" },
                { name: "Corporate", link: "/events/corporate" },
                { name: "Small Party", link: "/events/small-party" },
                { name: "Engagement", link: "/events/engagement" },
                { name: "Baby Shower", link: "/events/baby-shower" },
                { name: "Housewarming", link: "/events/housewarming" },
                { name: "Festival & Religious", link: "/events/festival-religious" },
                { name: "Private Party", link: "/events/private-party" }
              ].map((event, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                >
                  <Link href={event.link}>
                    <motion.div
                      className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      whileHover={{ x: 5, color: "#fbbf24" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {event.name}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Locations Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h4 className="font-serif text-lg text-amber-400">Locations</h4>
            </motion.div>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Chinchwad", slug: "chinchwad" },
                { name: "Wakad", slug: "wakad" },
                { name: "Kothrud", slug: "kothrud" },
                { name: "Wagholi", slug: "wagholi" },
                { name: "Kondhwa", slug: "kondhwa" },
                { name: "Viman Nagar", slug: "viman-nagar" },
                { name: "Kharadi", slug: "kharadi" },
                { name: "Baner", slug: "baner" },
                { name: "Koregaon Park", slug: "koregaon-park" },
                { name: "Hadapsar", slug: "hadapsar" },
                { name: "Aundh", slug: "aundh" },
                { name: "Wanowrie", slug: "wanowrie" },
                { name: "Hinjewadi", slug: "hinjewadi" },
                { name: "Yerwada", slug: "yerwada" }
              ].map((location, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                >
                  <Link href={`/locations/${location.slug}`}>
                    <motion.div
                      className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      whileHover={{ x: 5, color: "#fbbf24" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {location.name}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h4 className="font-serif text-lg text-amber-400">Services</h4>
            </motion.div>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Full-Service", link: "/events/full-service" },
                { name: "Buffet-Style", link: "/events/buffet-style" }
              ].map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <Link href={service.link}>
                    <motion.div
                      className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      whileHover={{ x: 5, color: "#fbbf24" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {service.name}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h4 className="font-serif text-lg text-amber-400">Company</h4>
            </motion.div>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", link: "/about" },
                { name: "Blog", link: "/" },
                { name: "Contact", link: "/contact" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                >
                  <Link href={item.link}>
                    <motion.div
                      className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      whileHover={{ x: 5, color: "#fbbf24" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-stone-700 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-stone-400 text-sm flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>© 2025 Pune Caterers. All Rights Reserved.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative pt-24 min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900 via-amber-900 to-orange-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-orange-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-amber-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Serving Pune's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Premier Locations
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From IT hubs to cultural centers, we bring exceptional catering experiences to every corner of Pune
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-amber-200"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{locationsData.length}+ Locations</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-amber-400"></div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>500K+ Residents Served</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-amber-400"></div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Premium Service Areas</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 bg-amber-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-4 h-4 bg-orange-400 rounded-full opacity-40"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
}

// Locations Grid
function LocationsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-stone-800 mb-6">
            Choose Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Service Location
            </span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive catering services across Pune's most vibrant neighborhoods, each tailored to local preferences and cultural nuances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {locationsData.map((location, i) => (
            <motion.div
              key={location.slug}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-stone-100 hover:border-amber-200 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Location Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-stone-800 group-hover:text-amber-800 transition-colors">
                        {location.name}
                      </h3>
                      <p className="text-stone-500 text-sm">{location.area}</p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {location.population}
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-600 leading-relaxed mb-6 text-sm">
                  {location.description.substring(0, 120)}...
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-stone-800 mb-3 text-sm">Popular For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.keyFeatures.slice(0, 3).map((feature, j) => (
                      <motion.span
                        key={j}
                        className="bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-800 px-3 py-1 rounded-full text-xs transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Popular Events */}
                {location.popularEvents && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-stone-800 mb-2 text-sm">Top Events:</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.popularEvents.slice(0, 3).map((event, j) => (
                        <span key={j} className="text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Link href={`/locations/${location.slug}`}>
                  <motion.button
                    className="w-full bg-stone-100 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white text-stone-800 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ x: 2 }}
                  >
                    <span>Explore {location.name} Catering</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl text-stone-800 mb-4">
              Don't See Your Location?
            </h3>
            <p className="text-stone-600 mb-6">
              We're constantly expanding our services across Pune. Contact us to discuss catering for your specific area.
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Today
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { number: locationsData.length + "+", label: "Service Locations", icon: MapPin },
    { number: "500K+", label: "Residents Served", icon: Users },
    { number: "50+", label: "Events per Month", icon: Star },
    { number: "24/7", label: "Service Availability", icon: ArrowRight }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-stone-900 to-amber-900">
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center text-white mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Pune's Most Trusted Catering Network
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-amber-400 mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-stone-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}