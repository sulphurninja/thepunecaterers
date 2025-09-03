"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Calendar, CalendarDays, Mail, MapPin, Phone, Send, Users, MessageCircle, Clock, Star, Facebook, Instagram } from "lucide-react";
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

export default function ContactUs() {
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

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

      {/* Floating Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : -20
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        
      </motion.nav>  {/* Floating Navigation with Working Mobile Menu */}
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
              {["Events", "Locations", "Contact", "About"].map((item, i) => (
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
      <section ref={heroRef} className="relative pt-32 min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100"
          style={{
            scale: heroImageScale,
            y: useTransform(scrollYProgress, [0, 1], [0, -150])
          }}
        />


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
                  Contact Us –
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
                  Let's Plan Your Perfect Event in Pune
                </motion.span>
              </motion.h1>

              <motion.div
                className="max-w-5xl mx-auto text-stone-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <p className="text-lg md:text-xl">
                  Ready to make your event unforgettable? At Pune Caterers, we're here to bring your vision to life with customized catering across Pune's vibrant neighborhoods—from bustling IT hubs like Hinjewadi (home to 500+ companies) to cultural gems like Kondhwa. Whether it's a grand wedding in Koregaon Park, a corporate gathering in Kharadi's tech parks, or an intimate housewarming in Baner's green high-rises, our team is dedicated to seamless service. Share your details below for a free personalized quote, or call us to discuss 2025 trends like sustainable fusions and interactive stations tailored to your location and event type. We respond within 24 hours, ensuring hassle-free planning for Pune's 7.5 million+ residents.
                </p>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <motion.div
                className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div style={{ scale: heroImageScale }}>
                  <Image
                    src="/pune/hero2.jpg"
                    alt="Pune Caterers team ready to assist with event planning and catering"
                    width={800}
                    height={500}
                    className="w-full  h-64 md:h-96 lg:h-[500px] object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <ContactFormSection
        formData={formData}
        setFormData={setFormData}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleSubmit={() => {}} // Remove this line since we're handling it internally now
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting} // Add this prop
        puneLocations={puneLocations}
        eventTypes={eventTypes}
      />


      {/* Contact Information Section */}
      <ContactInfoSection />

      {/* Map Section */}
      <MapSection />

      {/* FAQ Section */}
      <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
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
                <Link href={`/locations/${location.slug}`}>
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  >

                    <motion.div
                      className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      whileHover={{ x: 5, color: "#fbbf24" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {location.name}
                    </motion.div>
                  </motion.li>
                </Link>

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
// Enhanced Contact Form Section with Shadcn Components
function ContactFormSection({
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
              Get in Touch
              <motion.span
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Start Planning Today
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-stone-300 text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Fill out the form below for a free consultation and personalized quote.
              We'll respond within 24 hours with tailored recommendations for your event.
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
                  href: "#map",
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
                    <Label htmlFor="message" className="text-amber-300 font-medium flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Tell us about your event vision</span>
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
        </div>
      </div>
    </section>
  );
}

// Enhanced Contact Information Section
function ContactInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91-8087889252",
      link: "tel:+91-8087889252",
      description: "Available 24/7 for urgent queries",
      gradient: "from-green-500/20 to-emerald-600/20",
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "info@punecaterers.com",
      link: "mailto:info@punecaterers.com",
      description: "We respond within 2 hours",
      gradient: "from-blue-500/20 to-indigo-600/20",
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      icon: MapPin,
      title: "Service Areas",
      info: "All across Pune",
      link: "#map",
      description: "From Chinchwad to Koregaon Park",
      gradient: "from-purple-500/20 to-pink-600/20",
      iconBg: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Phone className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              className="font-serif text-3xl md:text-4xl mb-4 text-stone-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Contact Information
            </motion.h2>

            <motion.p
              className="text-stone-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Multiple ways to reach us. Choose what works best for you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact, i) => (
              <motion.a
                key={i}
                href={contact.link}
                className="block group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${contact.gradient} backdrop-blur-sm rounded-2xl p-8 border border-white/50 group-hover:border-amber-300/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl`}
                  whileHover={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${contact.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <contact.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-3">
                    <motion.h3
                      className="font-serif text-2xl text-stone-800 group-hover:text-stone-900 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {contact.title}
                    </motion.h3>

                    <p className="text-amber-700 font-semibold text-lg">
                      {contact.info}
                    </p>

                    <p className="text-stone-600 leading-relaxed">
                      {contact.description}
                    </p>

                    {/* Interactive Element */}
                    <motion.div
                      className="flex items-center pt-4"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-amber-500 rounded-full mr-3"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.span
                        className="text-amber-700 text-sm font-medium group-hover:text-amber-800 transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        Click to contact
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Social Media Links */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.p
              className="text-stone-600 mb-6 text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              Follow us for the latest updates and culinary inspiration
            </motion.p>

            <div className="flex justify-center gap-6">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/punecaterers', icon: Facebook, color: "from-blue-600 to-blue-700" },
                { name: 'Instagram', href: 'https://www.instagram.com/punecaterers', icon: Instagram, color: "from-pink-600 to-purple-700" }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="group"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
                >
                  <div className={`bg-gradient-to-br ${social.color} rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-center space-x-3 text-white">
                      <social.icon className="w-6 h-6" />
                      <span className="font-medium">{social.name}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Map Section
function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="map" ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                           linear-gradient(-45deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <MapPin className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            className="font-serif text-3xl md:text-4xl mb-4 text-stone-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Find Us in Pune
          </motion.h2>

          <motion.p
            className="text-stone-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We serve all major areas across Pune. See our coverage area and plan your perfect event.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-amber-200/50"
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.4 }}
          >
            {/* Map Container */}
            <motion.div
              className="relative bg-stone-100 rounded-2xl overflow-hidden shadow-lg min-h-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Loading Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-orange-200/50 to-amber-200/30"
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "100%" } : {}}
                transition={{ duration: 2, delay: 0.9 }}
              />

              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04181590127!2d73.86296995!3d18.52461405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[500px] relative z-10 rounded-2xl"
                title="Pune Caterers Service Areas Map"
              />
            </motion.div>

            {/* Map Info Overlays */}
            <motion.div
              className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200/50 max-w-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-xl text-stone-800 mb-2">Pune Caterers</h3>
                  <p className="text-stone-600 text-sm mb-1">Central Pune, Maharashtra</p>
                  <div className="flex items-center space-x-2 text-amber-700 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Available 24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Areas Tag */}
            <motion.div
              className="absolute top-8 right-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span className="font-medium">14+ Service Areas</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Service Areas Grid */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/30"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-center text-stone-800 mb-6">Our Service Areas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Chinchwad", "Wakad", "Kothrud", "Wagholi", "Kondhwa",
                "Viman Nagar", "Kharadi", "Baner", "Koregaon Park",
                "Hadapsar", "Aundh", "Wanowrie", "Hinjewadi", "Yerwada"
              ].map((area, i) => (
                <Link href={`/locations/${area.toLowerCase()}`}>
                  <motion.div
                    key={area}
                    className="text-center p-3 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.8 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-stone-700 font-medium text-sm">{area}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section with Professional Icons
function FAQSection({ openFAQ, setOpenFAQ }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "We aim to reply within 24 hours, often sooner for urgent queries in high-demand areas like Hinjewadi."
    },
    {
      q: "Can I schedule a consultation?",
      a: "Yes! Use the form to request an in-person or virtual meet to discuss your event in locations like Baner or Yerwada."
    },
    {
      q: "Do you offer free quotes?",
      a: "Absolutely—share your details, and we'll provide a tailored quote based on guest count, menu, and venue."
    },
    {
      q: "What information do you need for a quote?",
      a: "Event type, date, guest count, location (e.g., Kothrud or Wagholi), and any special requests like vegan options."
    },
    {
      q: "Can I visit your facility?",
      a: "Contact us to arrange a tour of our kitchen, where we prepare sustainable menus for Pune's diverse events."
    },
    {
      q: "What is the cost of catering services in Pune?",
      a: "Packages start at ₹500 per plate; a 100-guest event in Chinchwad may range ₹50,000-₹1,00,000 with customizations."
    },
    {
      q: "Do you handle large events in Pune suburbs?",
      a: "Absolutely, for 50-1,000+ guests in Wagholi or Baner, with buffet or full-service options available."
    },
    {
      q: "Are there any hidden fees in your packages?",
      a: "No—transparent costs for complete peace of mind. All pricing is clearly outlined in your personalized quote."
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl mb-6 text-stone-800"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently Asked Questions About Contacting Us
          </motion.h2>
        </motion.div>

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
            href="#"
            className="text-amber-800 font-medium flex items-center justify-center space-x-2 hover:text-amber-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span>Ask a Question</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}