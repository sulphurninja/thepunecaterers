"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Calendar, CalendarDays, Mail, MapPin, Phone, Send, Users, Heart, Leaf, Star, Rocket, Sparkles } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: null,
    guestCount: '',
    location: '',
    eventType: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form or show success message
  };

  const puneLocations = [
    "Chinchwad", "Wakad", "Kothrud", "Wagholi", "Kondhwa",
    "Viman Nagar", "Kharadi", "Baner", "Koregaon Park",
    "Hadapsar", "Aundh", "Wanowrie", "Hinjewadi", "Yerwada"
  ];

  const eventTypes = [
    "Wedding", "Birthday Party", "Corporate Event", "Small Party",
    "Engagement", "Baby Shower", "Housewarming", "Festival & Religious",
    "Private Party", "Other"
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-red-50">



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
              {["Events", "Locations", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-stone-600 hover:text-amber-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {item}
                </motion.a>
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
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-6 py-4 text-stone-700 hover:text-amber-800 hover:bg-amber-50/50 transition-all duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ duration: 0.2, delay: isMobileMenuOpen ? 0.1 + i * 0.05 : 0 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                </motion.a>
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


      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100"
          style={{
            scale: heroImageScale,
            y: useTransform(scrollYProgress, [0, 1], [0, -150])
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-amber-400/20 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isLoaded ? 0.4 : 0,
                scale: isLoaded ? 1 : 0,
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 15, 0],
                rotate: [0, 360]
              }}
              transition={{
                opacity: { delay: 1 + i * 0.05 },
                scale: { delay: 1 + i * 0.05 },
                y: { repeat: Infinity, duration: 4 + Math.random() * 2 },
                x: { repeat: Infinity, duration: 5 + Math.random() * 2 },
                rotate: { repeat: Infinity, duration: 10 + Math.random() * 5 }
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              style={{ y: heroTextY }}
            >
              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-stone-800"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.span
                  className="block"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  About Us –
                </motion.span>
                <motion.span
                  className="block text-amber-800 italic"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Pune Caterers
                </motion.span>
                <motion.span
                  className="block text-stone-700 font-light"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Your Trusted Partner for Memorable Events in Pune
                </motion.span>
              </motion.h1>

              <motion.div
                className="max-w-5xl mx-auto text-stone-700 leading-relaxed space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <p className="text-lg md:text-xl">
                  At Pune Caterers, we are more than just a catering service—we're passionate creators of unforgettable culinary experiences tailored to Pune's dynamic event landscape. Founded in 2015 amid the city's rapid growth into a 7.5 million+ metropolis by 2025, we started as a small team serving local weddings in Kothrud and have expanded to become the go-to experts for diverse occasions across 14 key neighborhoods, from industrial Chinchwad to upscale Koregaon Park.
                </p>
                <p className="text-base md:text-lg">
                  Our journey reflects Pune's evolution: blending traditional Maharashtrian flavors with global fusions, embracing sustainable practices like farm-to-table sourcing to reduce waste by 30% in our operations, and incorporating 2025 trends such as interactive stations and floral-infused menus. With a team of 50+ experienced chefs, event planners, and logistics specialists, we've catered over 1,000 events, handling everything from intimate 50-guest baby showers in Wanowrie to grand 500+ corporate galas in Hinjewadi's IT parks.
                </p>
                <p className="text-base md:text-lg">
                  What sets us apart is our commitment to customization—whether it's vegan options for health-conscious pros in Kharadi or halal spreads for cultural festivals in Kondhwa. As Pune's catering leaders, we're dedicated to making every bite a celebration of the city's vibrant spirit.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div style={{ scale: heroImageScale }}>
                  <Image
                    src="/pune/300.jpg"
                    alt="Team of Pune Caterers chefs and planners preparing sustainable fusion dishes"
                    width={800}
                    height={500}
                    className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Components */}
      <OurStorySection />
      <OurTeamSection />
      <OurValuesSection />
      <WhyChooseUsSection />
      <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
      <ContactSection
        formData={formData}
        setFormData={setFormData}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        puneLocations={puneLocations}
        eventTypes={eventTypes}
      />
      <FooterSection />
      {/* Enhanced Custom Styles */}
      <style jsx>{`
        .glass-morphism {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(251, 191, 36, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #f59e0b, #d97706);
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #d97706, #b45309);
        }
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
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
                { name: "Wedding", link: "wedding-catering-pune" },
                { name: "Birthday", link: "birthday-party-catering-pune" },
                { name: "Corporate", link: "corporate-catering-pune" },
                { name: "Small Party", link: "small-party-catering-pune" },
                { name: "Engagement", link: "engagement-catering-pune" },
                { name: "Baby Shower", link: "baby-shower-catering-pune" },
                { name: "Housewarming", link: "housewarming-catering-pune" },
                { name: "Festival & Religious", link: "festival-religious-catering-pune" },
                { name: "Private Party", link: "private-party-catering-pune" }
              ].map((event, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                >
                  <motion.a
                    href={`#${event.link}`}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 5, color: "#fbbf24" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {event.name}
                  </motion.a>
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
                { name: "Chinchwad", link: "catering-chinchwad-pune" },
                { name: "Wakad", link: "catering-wakad-pune" },
                { name: "Kothrud", link: "catering-kothrud-pune" },
                { name: "Wagholi", link: "catering-wagholi-pune" },
                { name: "Kondhwa", link: "catering-kondhwa-pune" },
                { name: "Viman Nagar", link: "catering-viman-nagar-pune" },
                { name: "Kharadi", link: "catering-kharadi-pune" },
                { name: "Baner", link: "catering-baner-pune" }
              ].map((location, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                >
                  <motion.a
                    href={`#${location.link}`}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 5, color: "#fbbf24" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {location.name}
                  </motion.a>
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
                { name: "Full-Service", link: "full-service-catering-pune" },
                { name: "Buffet-Style", link: "buffet-style-catering-pune" }
              ].map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <motion.a
                    href={`#${service.link}`}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 5, color: "#fbbf24" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {service.name}
                  </motion.a>
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
                { name: "About Us", link: "about-us" },
                { name: "Blog", link: "blog" },
                { name: "Contact", link: "contact-us" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                >
                  <motion.a
                    href={`#${item.link}`}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 5, color: "#fbbf24" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.name}
                  </motion.a>
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

// Our Story Section
function OurStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-3xl md:text-4xl text-center mb-12 text-stone-800"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full"
              initial={{ scale: 0, x: 50, y: -50 }}
              animate={isInView ? { scale: 1, x: 16, y: -16 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.div
              className="relative text-stone-700 leading-relaxed space-y-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg">
                Pune Caterers began with a simple vision: to elevate everyday events with exceptional food and service. Inspired by Pune's melting pot of cultures—from the automotive hustle of Chinchwad (population 500,000+) to the bohemian wellness of Koregaon Park near Osho Resort—we built a business that adapts to the city's 20-25% annual IT-driven growth in areas like Hinjewadi and Kharadi.
              </p>
              <p className="text-base">
                Over the years, we've navigated challenges like post-pandemic hygiene demands, emerging stronger with eco-friendly protocols that align with Pune's push toward sustainable urban living. Today, as property prices soar in Baner and Viman Nagar, we continue to innovate, introducing 2025 trends like zero-waste buffets and experiential live counters to serve our evolving clientele.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Our Team Section
function OurTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-3xl md:text-4xl text-center mb-12 text-stone-800"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Team
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-stone-700 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our team of experienced chefs and event planners is dedicated to making your event memorable. Led by Head Chef Rajesh Kumar, a culinary expert with 15 years in fusion cuisine, and Event Manager Priya Desai, specializing in logistics for high-density zones like Hadapsar townships, we combine creativity with precision. From sourcing organic ingredients for vegan menus in Aundh to coordinating seamless setups in Yerwada's historical spots, our 50+ professionals ensure every detail shines.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { number: "50+", label: "Team Members", icon: Users, color: "from-blue-500 to-indigo-600" },
                { number: "15", label: "Years Experience", icon: Star, color: "from-amber-500 to-orange-600" },
                { number: "1000+", label: "Events Served", icon: Calendar, color: "from-green-500 to-emerald-600" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6 rounded-xl bg-amber-50 group hover:bg-amber-100 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-amber-800 mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-stone-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Our Values Section - Dynamic Professional Version
function OurValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const values = [
    {
      title: "Sustainability",
      description: "Committed to reducing environmental impact with local, seasonal sourcing—perfect for eco-aware events in green suburbs like Baner.",
      icon: Leaf,
      stats: "30% waste reduction",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-green-100",
      accentColor: "emerald",
      size: "large"
    },
    {
      title: "Excellence",
      description: "Rigorous hygiene and quality standards, earning us 5-star reviews across 1,000+ events.",
      icon: Star,
      stats: "5-star average rating",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-yellow-100",
      accentColor: "amber",
      size: "small"
    },
    {
      title: "Customization",
      description: "Tailored menus reflecting Pune's diversity, from Maharashtrian thalis in Kothrud to global fusions in Viman Nagar's airport vicinity.",
      icon: Sparkles,
      stats: "500+ custom menus",
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-100",
      accentColor: "purple",
      size: "medium"
    },
    {
      title: "Innovation",
      description: "Embracing 2025 trends like interactive stations and floral infusions for memorable experiences.",
      icon: Rocket,
      stats: "Leading 2025 trends",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-100",
      accentColor: "blue",
      size: "medium"
    },
    {
      title: "Community Focus",
      description: "Supporting local farms and charities, giving back to Pune's 7.5 million residents.",
      icon: Heart,
      stats: "50+ local partners",
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-100",
      accentColor: "rose",
      size: "large"
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Decorative Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-${8 + i * 4} h-${8 + i * 4} rounded-full`}
          style={{
            background: `linear-gradient(45deg, ${['rgba(16, 185, 129, 0.1)', 'rgba(245, 158, 11, 0.1)', 'rgba(139, 69, 19, 0.1)', 'rgba(147, 51, 234, 0.1)', 'rgba(59, 130, 246, 0.1)'][i]
              }, transparent)`,
            left: `${10 + i * 20}%`,
            top: `${15 + i * 15}%`,
            filter: 'blur(40px)'
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Heart className="w-10 h-10 text-white" />
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-3xl blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            className="font-serif text-4xl md:text-5xl mb-6 text-stone-800 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Core Values
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            The principles that guide every event we create and every relationship we build
          </motion.p>
        </motion.div>

        {/* Bento-Style Grid Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className={`
                  ${value.size === 'large' ? 'col-span-12 md:col-span-6 lg:col-span-8' : ''}
                  ${value.size === 'medium' ? 'col-span-12 md:col-span-6 lg:col-span-6' : ''}
                  ${value.size === 'small' ? 'col-span-12 md:col-span-6 lg:col-span-4' : ''}
                  group
                `}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.15, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${value.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 h-full relative overflow-hidden ${value.size === 'large' ? 'min-h-[320px]' :
                    value.size === 'medium' ? 'min-h-[280px]' : 'min-h-[240px]'
                    }`}
                  whileHover={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 70% 30%, currentColor 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '30px 30px', '0px 0px']
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">

                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <value.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <motion.div
                        className={`px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-${value.accentColor}-200/50`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-xs font-bold text-${value.accentColor}-700 uppercase tracking-wider`}>
                          {value.stats}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      className="flex-1 flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    >
                      <div>
                        <motion.h3
                          className={`font-serif ${value.size === 'large' ? 'text-3xl' : 'text-2xl'} text-stone-800 mb-4 leading-tight group-hover:text-stone-900 transition-colors`}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {value.title}
                        </motion.h3>

                        <p className={`text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors ${value.size === 'large' ? 'text-lg' : 'text-base'
                          }`}>
                          {value.description}
                        </p>
                      </div>

                      {/* Interactive Bottom Element */}
                      <motion.div
                        className="flex items-center justify-between pt-6 mt-auto"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                      >
                        <motion.div
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className={`w-3 h-3 bg-gradient-to-r ${value.gradient} rounded-full`}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className={`h-0.5 bg-gradient-to-r ${value.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: value.size === 'large' ? 80 : 60 }}
                            transition={{ duration: 0.8, delay: 1.4 + i * 0.1 }}
                          />
                        </motion.div>

                        <motion.button
                          className={`p-2 bg-white/70 hover:bg-white/90 rounded-xl transition-all duration-300 group/btn`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-4 h-4 text-stone-600 group-hover/btn:text-stone-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Call-to-Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.div
              className="bg-gradient-to-r from-white/70 to-amber-50/70 backdrop-blur-sm rounded-3xl p-10 border border-amber-200/30 max-w-4xl mx-auto relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-amber-400/5"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(245, 158, 11, 0.05), rgba(251, 146, 60, 0.05), rgba(245, 158, 11, 0.05))",
                    "linear-gradient(135deg, rgba(251, 146, 60, 0.05), rgba(245, 158, 11, 0.05), rgba(251, 146, 60, 0.05))",
                    "linear-gradient(225deg, rgba(245, 158, 11, 0.05), rgba(251, 146, 60, 0.05), rgba(245, 158, 11, 0.05))"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
                  Experience these values firsthand
                </h3>
                <p className="text-stone-600 text-lg mb-6 max-w-2xl mx-auto">
                  Let us show you how our commitment to excellence, sustainability, and innovation creates unforgettable events.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Planning Your Event
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// Why Choose Us Section
function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const reasons = [
    "Proven Track Record: Served 1,000+ events in Pune's key areas, from Wagholi's suburban housewarmings to Kondhwa's cultural festivals.",
    "Versatile Expertise: Full-service and buffet-style options adaptable to any scale, with packages starting at ₹500/plate.",
    "Trend-Forward: Leading with sustainable, experiential catering aligned to Pune's growth projections.",
    "Client-Centric: Personalized consultations ensuring your vision comes to life, backed by aggregated 5-star testimonials.",
    "Local Insight: Deep knowledge of Pune's neighborhoods, optimizing for traffic in Hinjewadi or heritage in Yerwada."
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-3xl md:text-4xl text-center mb-12 text-stone-800"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Why Choose Pune Caterers
          </motion.h2>

          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 5, scale: 1.01 }}
              >
                <div className="flex items-start">
                  <motion.div
                    className="w-6 h-6 bg-amber-400 rounded-full mr-4 mt-1 flex-shrink-0"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <p className="text-stone-700 leading-relaxed group-hover:text-stone-800 transition-colors">
                    {reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href="#portfolio-link"
              className="inline-block bg-amber-800 text-white px-8 py-3 rounded-full relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-amber-900"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">See Our Portfolio and Get Inspired</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ openFAQ, setOpenFAQ }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const faqs = [
    {
      q: "Who is Pune Caterers?",
      a: "We're a leading catering service in Pune, founded in 2015, specializing in customized events across 14 neighborhoods."
    },
    {
      q: "What sets your team apart?",
      a: "Our 50+ experts combine culinary innovation with logistical precision, led by seasoned chefs and planners."
    },
    {
      q: "Do you focus on sustainability?",
      a: "Yes! We prioritize farm-to-table sourcing and zero-waste practices for eco-friendly events."
    },
    {
      q: "How has Pune Caterers grown?",
      a: "From local weddings to 1,000+ events, mirroring Pune's expansion to 7.5 million by 2025."
    },
    {
      q: "Can I visit your kitchen or meet the team?",
      a: "Contact us to schedule a consultation and tour our facilities."
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center mb-12 text-stone-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions About Pune Caterers
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <motion.div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.05)" }}
              >
                <h3 className="font-semibold text-stone-800 pr-4">{faq.q}</h3>
                <motion.svg
                  className="w-6 h-6 text-amber-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openFAQ === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === i ? "auto" : 0,
                  opacity: openFAQ === i ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-stone-600 leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="#faq-contact-link"
            className="text-amber-800 underline hover:no-underline transition-all"
            whileHover={{ scale: 1.05, color: "#f59e0b" }}
          >
            Ask a Question
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Contact Section with Shadcn Components
function ContactSection({
  formData,
  setFormData,
  focusedField,
  setFocusedField,
  handleSubmit,
  isSubmitting,
  puneLocations,
  eventTypes
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-32 bg-gradient-to-b from-stone-900 to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px', '0px 0px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-amber-400/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Mail className="w-12 h-12 text-amber-400" />
            </motion.div>

            <motion.h2
              className="font-serif text-4xl md:text-6xl mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ready to Connect?
              <motion.span
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Contact Us
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-stone-300 text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Join the Pune Caterers family—let's create your next memorable event.
              Share details for a free consultation and personalized quote.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Contact Info Cards */}
            <motion.div
              className="lg:col-span-4 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+91-8087889252",
                  description: "Available 24/7 for urgent queries",
                  href: "tel:+91-8087889252",
                  gradient: "from-green-500/20 to-emerald-600/20"
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "info@punecaterers.in",
                  description: "We'll respond within 2 hours",
                  href: "mailto:info@punecaterers.in",
                  gradient: "from-blue-500/20 to-cyan-600/20"
                },
                {
                  icon: MapPin,
                  title: "Service Areas",
                  content: "All across Pune",
                  description: "From Chinchwad to Koregaon Park",
                  href: "#locations",
                  gradient: "from-purple-500/20 to-pink-600/20"
                }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="block group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-amber-400/30 transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-amber-300 font-medium mb-2">{item.content}</p>
                        <p className="text-stone-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Enhanced Form */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
                whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Personal Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <Label htmlFor="name" className="text-amber-300 font-medium flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Full Name *</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-12"
                        placeholder="Your full name"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <Label htmlFor="email" className="text-amber-300 font-medium flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Address *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-12"
                        placeholder="your@email.com"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Contact & Event Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <Label htmlFor="phone" className="text-amber-300 font-medium flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number *</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-12"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <Label className="text-amber-300 font-medium flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>Event Date</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 focus:border-amber-400 rounded-xl justify-start font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.eventDate ? format(formData.eventDate, "PPP") : "Select event date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-stone-200" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.eventDate}
                            onSelect={(date) => setFormData({ ...formData, eventDate: date })}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </motion.div>
                  </div>

                  {/* Event Type & Location Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <Label className="text-amber-300 font-medium">Event Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                        <SelectTrigger className="w-full h-12 bg-white/10 border-white/20 text-white focus:border-amber-400 rounded-xl">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-stone-200">
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    >
                      <Label className="text-amber-300 font-medium flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location in Pune</span>
                      </Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                        <SelectTrigger className="w-full h-12 bg-white/10 border-white/20 text-white focus:border-amber-400 rounded-xl">
                          <SelectValue placeholder="Select your area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-stone-200">
                          {puneLocations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {/* Guest Count */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  >
                    <Label htmlFor="guestCount" className="text-amber-300 font-medium flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Expected Guest Count</span>
                    </Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min="1"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      onFocus={() => setFocusedField('guestCount')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-12"
                      placeholder="Number of guests expected"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.9 }}
                  >
                    <Label htmlFor="message" className="text-amber-300 font-medium">
                      Tell us about your event vision
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl min-h-[120px] resize-none"
                      placeholder="Share your dietary requirements, special requests, theme preferences, or any specific needs for your event..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 2.0 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center space-x-2"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="flex items-center space-x-2"
                          whileHover={{ x: 2 }}
                        >
                          <Send className="w-5 h-5" />
                          <span>Get Your Personalized Quote</span>
                        </motion.div>
                      )}
                    </Button>

                    {/* Alternative Contact Options */}
                    <motion.div
                      className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-stone-400"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 2.2 }}
                    >
                      <span className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Or call us directly:</span>
                      </span>
                      <motion.a
                        href="tel:+91-8087889252"
                        className="text-amber-400 hover:text-amber-300 font-semibold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>+91-8087889252</span>
                        </div>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <p className="text-stone-400 mb-4">Follow us for the latest updates and inspiration</p>
            <div className="flex justify-center space-x-6">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/punecaterers' },
                { name: 'Instagram', href: 'https://www.instagram.com/punecaterers' }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-amber-400 hover:text-amber-300 font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 2.6 + i * 0.1 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}