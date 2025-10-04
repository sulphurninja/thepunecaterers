"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
// Add these imports at the top of your file
import { Calendar, CalendarDays, CheckCircle, Mail, MapPin, Phone, Send, Users, XCircle } from "lucide-react";
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
import ContactFormDialog from "@/components/ContactFormDialog";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactDialogProps, setContactDialogProps] = useState({
    defaultEventType: "",
    title: "Get Your Free Quote"
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Cinematic entrance sequence
    setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Function to open contact dialog with specific props
  const openContactDialog = (eventType = "", title = "Get Your Free Quote") => {
    setContactDialogProps({ defaultEventType: eventType, title });
    setIsContactDialogOpen(true);
  };

  return (
    <div className="overflow-hidden bg-gradient-to-b from-slate-50 via-stone-50 to-amber-50">
      {/* Contact Form Dialog */}
      <ContactFormDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        defaultEventType={contactDialogProps.defaultEventType}
        title={contactDialogProps.title}
      />

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
            <motion.span
              className="text-stone-900 font-semibold flex-shrink-0"
              whileHover={{ color: "#f59e0b" }}
            >
              <img src='/logo.png' className=" h-12 w-auto" alt="Pune Caterers Logo" />
            </motion.span>

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

      {/* Hero: Clean & Professional */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-50 to-stone-100">

        {/* Single Hero Image Background */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale }}
        >
          <Image
            src="/pune/hero1.jpg"
            alt="Premium catering setup in Pune for diverse events – weddings, corporates, festivals"
            fill
            className="object-cover object-center"
          />
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="container mt-12 mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-20">

            {/* Left: Content */}
            <motion.div
              className="lg:col-span-7 text-white relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >

              {/* Animated Accent Line */}
              <motion.div
                className="absolute -left-2 lg:-left-6 top-8 w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-transparent rounded-full hidden lg:block"
                initial={{ height: 0 }}
                animate={{ height: isLoaded ? 200 : 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />

              {/* Badge with enhanced background */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-amber-600/30 backdrop-blur-md border border-amber-400/50 text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pune's Premier Catering Service</span>
              </motion.div>

              {/* Main Heading with text shadow for better visibility */}
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                  <motion.span
                    className="block text-white"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    Best Catering
                  </motion.span>
                  <motion.span
                    className="block text-amber-400"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    Services in
                  </motion.span>
                  <motion.span
                    className="block text-white font-light"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    Pune
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subtitle with enhanced readability */}
              <motion.p
                className="text-xl md:text-2xl font-light text-stone-100 mb-6 leading-relaxed drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
              >
                Customized for Weddings, Corporates, Parties & More
              </motion.p>

              {/* Description with better contrast */}
              <motion.div
                className="max-w-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <p className="text-stone-200 leading-relaxed drop-shadow-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Welcome to Pune Caterers, your premier partner for exceptional catering services in Pune.
                  As the city surges toward a population of over 7.5 million by 2025, driven by booming IT hubs
                  and residential expansions, the demand for personalized catering has skyrocketed.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <motion.button
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openContactDialog()}
                  
                >
                  <span>Get a Free Quote Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Links */}
              <motion.div
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                {[
                  { text: "Browse Events", href: "#events" },
                  { text: "Find Your Location", href: "#locations" }
                ].map((link, i) => (
                  <motion.a
                    key={link.text}
                    href={link.href}
                    className="text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center group drop-shadow-sm"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 + i * 0.1 }}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    <span>{link.text}</span>
                    <motion.svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Enhanced Stats Cards */}
            <motion.div
              className="lg:col-span-5 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
            >
              {[
                { number: "500+", label: "Events Completed", icon: "calendar" },
                { number: "50+", label: "Locations Served", icon: "location" },
                { number: "5★", label: "Average Rating", icon: "star" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + i * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      {stat.icon === "calendar" && (
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {stat.icon === "location" && (
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {stat.icon === "star" && (
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">{stat.number}</div>
                      <div className="text-stone-700 text-sm font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Simple Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            whileHover={{ y: -2 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs uppercase tracking-wider drop-shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Scroll to explore
            </span>
            <motion.svg
              className="w-6 h-6 drop-shadow-md"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </section>
      <ContactSection />

      {/* About: Overlapping Circles with Reveal Animation */}
      <AboutSection openContactDialog={openContactDialog} />

      {/* Services: Split-Screen with Staggered Cards */}
      <ServicesSection openContactDialog={openContactDialog} />

      {/* Real Pune Event Scenarios */}
      <EventScenariosSection openContactDialog={openContactDialog} />

      {/* Events: Masonry Grid with Lazy Load */}
      <EventsSection openContactDialog={openContactDialog} />

      {/* Locations with Interactive Map */}
      <LocationsSection openContactDialog={openContactDialog} />

      {/* Why Choose Us with Icon Animations */}
      <WhyChooseUsSection openContactDialog={openContactDialog} />

      {/* Sample Menu with Hover Effects */}
      <SampleMenuSection openContactDialog={openContactDialog} />

      {/* Client Testimonials Carousel */}
      <TestimonialsSection openContactDialog={openContactDialog} />

      {/* FAQ with Smooth Accordion */}
      <FAQSection openContactDialog={openContactDialog} />

      {/* Blog Preview */}
      <BlogSection openContactDialog={openContactDialog} />

      {/* Contact: Floating Form with Interactions */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

// Individual section components with professional icons
function AboutSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 relative overflow-hidden" id="about">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-300/20 blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-orange-200/20 to-red-200/30 blur-lg"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: About Content */}
          <motion.div
            className="lg:col-span-5"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background Glow Effect */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-amber-200/40 via-orange-200/30 to-red-200/20 rounded-3xl blur-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
              />

              {/* Content Card */}
              <motion.div
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-white/50"
                whileHover={{ y: -5, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="font-serif text-3xl md:text-4xl mb-6 text-stone-800 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  About Us
                </motion.h2>

                {/* Animated Accent Line */}
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 64 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />

                {/* Content Paragraphs */}
                <motion.div
                  className="space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p className="text-stone-700 leading-relaxed text-lg">
                    Pune Caterers is a leading catering service in Pune, specializing in customized menus
                    for all events and locations. With years of experience, we bring flavor and flair to
                    your special occasions.
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    Our team of experienced chefs and event planners is dedicated to making your event memorable.
                  </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {[
                    { number: "500+", label: "Events" },
                    { number: "50+", label: "Areas" },
                    { number: "5★", label: "Rating" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.1, type: "spring" }}
                    >
                      <div className="text-2xl font-bold text-amber-600 mb-1">{stat.number}</div>
                      <div className="text-sm text-stone-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Feature Cards */}
          <motion.div
            className="lg:col-span-7"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Section Header */}
            <motion.div
              className="text-center mb-10"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
                What Makes Us Different
              </h3>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  title: "Sustainable Catering",
                  desc: "Eco-friendly options with farm-to-table sourcing, reducing waste for environmentally conscious events in green zones like Baner",
                  color: "from-green-500/20 to-emerald-500/10"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  title: "Full-Service Experts",
                  desc: "End-to-end management from planning to cleanup, ensuring hassle-free experiences for busy IT pros in Hinjewadi",
                  color: "from-blue-500/20 to-cyan-500/10"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Local Area Pros",
                  desc: "Tailored expertise for Pune's neighborhoods, from Chinchwad's industrial vibe to Koregaon Park's bohemian luxury",
                  color: "from-amber-500/20 to-orange-500/10"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-white/30 group-hover:border-white/50`}>
                    <div className="flex items-start space-x-6">
                      {/* Icon Container */}
                      <motion.div
                        className="flex-shrink-0 w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-3 text-stone-800 group-hover:text-stone-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="font-serif text-3xl md:text-5xl text-center mb-12 md:mb-16 text-stone-800"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Comprehensive Catering Solutions
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch">
          {/* Full-Service Card */}
      
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 50, rotateY: 10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ rotateY: -2, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-3xl shadow-2xl"
              whileHover={{ rotateZ: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="relative bg-white rounded-3xl p-8 md:p-12 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-300 to-red-400 rounded-full opacity-10"
                initial={{ scale: 0, x: -50, y: -50 }}
                animate={isInView ? { scale: 1, x: -32, y: -32 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              />

              {/* Service Icon */}
              <motion.div
                className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>

              <motion.h3
                className="font-serif text-2xl md:text-3xl mb-6 text-stone-800"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                 Full-Service Catering
              </motion.h3>

              <motion.p
                className="text-stone-600 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
               Our end-to-end full-service catering handles planning, setup, serving, and cleanup,
               incorporating 2025 trends like sustainable sourcing for eco-conscious areas such as Baner's green zones.
              </motion.p>

              <motion.div
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[
                  "Complete management, personalized menus, staff, cleanup",
                  "Weddings, festivals in Kondhwa",
                  "Starting ₹600/plate"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center text-sm text-stone-600"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-orange-400 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="bg-orange-600 text-white px-6 py-3 rounded-full relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                onClick={() => openContactDialog("Buffet-Style Catering", "Get full-Service Catering Quote")}
              >
                <motion.div
                  className="absolute inset-0 bg-orange-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Learn More</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Buffet-Style Card */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 50, rotateY: 10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ rotateY: -2, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-3xl shadow-2xl"
              whileHover={{ rotateZ: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="relative bg-white rounded-3xl p-8 md:p-12 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-300 to-red-400 rounded-full opacity-10"
                initial={{ scale: 0, x: -50, y: -50 }}
                animate={isInView ? { scale: 1, x: -32, y: -32 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              />

              {/* Service Icon */}
              <motion.div
                className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>

              <motion.h3
                className="font-serif text-2xl md:text-3xl mb-6 text-stone-800"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Buffet-Style Catering
              </motion.h3>

              <motion.p
                className="text-stone-600 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Ideal for large crowds, our buffet-style catering offers abundant variety with
                interactive stations, perfect for corporate events in Kharadi's tech parks.
              </motion.p>

              <motion.div
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[
                  "Self-serve abundance, live stations, sustainable options",
                  "Corporates in Hinjewadi, parties in Viman Nagar",
                  "Starting ₹500/plate"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center text-sm text-stone-600"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-orange-400 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="bg-orange-600 text-white px-6 py-3 rounded-full relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                onClick={() => openContactDialog("Buffet-Style Catering", "Get Buffet-Style Catering Quote")}
              >
                <motion.div
                  className="absolute inset-0 bg-orange-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Service Comparison Table with Animations */}
        <motion.div
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200">
                {["Service Type", "Features", "Ideal For", "Starting Price"].map((header, i) => (
                  <motion.th
                    key={header}
                    className="py-3 px-4 font-serif text-lg text-stone-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.8 + i * 0.1 }}
                  >
                    {header}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "Full-Service",
                  features: "Complete management, personalized menus, staff, cleanup",
                  ideal: "Weddings, festivals in Kondhwa",
                  price: "₹600/plate",
                  color: "amber"
                },
                {
                  type: "Buffet-Style",
                  features: "Self-serve abundance, live stations, sustainable options",
                  ideal: "Corporates in Hinjewadi, parties in Viman Nagar",
                  price: "₹500/plate",
                  color: "orange"
                }
              ].map((service, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-stone-100 hover:bg-amber-50/50 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 2 + i * 0.2 }}
                  whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.05)" }}
                >
                  <td className={`py-4 px-4 font-semibold text-${service.color}-800`}>{service.type}</td>
                  <td className="py-4 px-4 text-stone-600">{service.features}</td>
                  <td className="py-4 px-4 text-stone-600">{service.ideal}</td>
                  <td className="py-4 px-4 font-semibold text-stone-800">{service.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

// Event Scenarios Section with Images
function EventScenariosSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-32 bg-gradient-to-b from-stone-50 to-amber-50 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-300/15 blur-xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl md:text-5xl mb-6 text-stone-800 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Who We Serve:
            <motion.span
              className="block text-amber-700 italic"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Real Pune Event Scenarios
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            From intimate gatherings to grand celebrations, discover how we've crafted
            perfect culinary experiences across Pune's diverse neighborhoods.
          </motion.p>
        </motion.div>

        {/* Scenarios Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              scenario: "Hosting a wedding for 300 in Kalyani Nagar's upscale halls?",
              solution: "Our wedding catering delivers elegant fusions.",
              link: "/events/wedding",
              image: "/pune/300.jpg",
              icon: (
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              gradient: "from-pink-500/20 to-rose-500/10"
            },
            {
              scenario: "Need buffet catering for 150 at your IT park in Kharadi?",
              solution: "Explore corporate catering with health-focused menus.",
              link: "/events/corporate",
              image: "/pune/IT.jpg",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              gradient: "from-blue-500/20 to-cyan-500/10"
            },
            {
              scenario: "Want sustainable food options for a baby shower in Baner's green high-rises?",
              solution: "Check our baby shower catering.",
              link: "/events/baby-shower",
              image: "/pune/baby.png",
              icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              gradient: "from-green-500/20 to-emerald-500/10"
            },
            {
              scenario: "Planning a housewarming in Wagholi's new townships?",
              solution: "Our housewarming catering offers welcoming thalis.",
              link: "/events/housewarming",
              image: "/pune/housewarm.jpg",
              icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              gradient: "from-amber-500/20 to-orange-500/10"
            },
            {
              scenario: "Organizing a festival pooja in Kondhwa's cultural spots?",
              solution: "Discover festival & religious catering with satvik spreads.",
              link: "/events/festival-religious",
              image: "/pune/festive.jpg",
              icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ),
              gradient: "from-purple-500/20 to-violet-500/10"
            }
          ].map((item, i) => (
            <Link href={item.link}>
              <motion.div
                key={i}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                  whileHover={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={item.image}
                        alt={`${item.scenario} - Pune Caterers professional service`}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent`} />
                    </motion.div>

                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Image Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content Section */}
                  <motion.div
                    className="p-6 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  >
                    <motion.h3
                      className="text-stone-800 font-semibold text-lg leading-relaxed group-hover:text-stone-900 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
                    >
                      {item.scenario}
                    </motion.h3>

                    <motion.p
                      className="text-amber-800 font-medium group-hover:text-amber-900 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
                    >
                      {item.solution}
                    </motion.p>

                    {/* Action Button with Enhanced Styling */}
                    <motion.div
                      className="pt-2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                    >
                      <motion.button
                        className="inline-flex items-center px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 hover:text-amber-900 font-semibold rounded-lg transition-all duration-300 group/link"
                        whileHover={{ x: 5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openContactDialog(item.scenario.includes("wedding") ? "Wedding" :
                          item.scenario.includes("corporate") ? "Corporate Event" :
                            item.scenario.includes("baby shower") ? "Baby Shower" :
                              item.scenario.includes("housewarming") ? "Housewarming" :
                                "Festival & Religious",
                          `Get Quote for ${item.scenario.includes("wedding") ? "Wedding" :
                            item.scenario.includes("corporate") ? "Corporate Event" :
                              item.scenario.includes("baby shower") ? "Baby Shower" :
                                item.scenario.includes("housewarming") ? "Housewarming" :
                                  "Festival & Religious"} Event`)}
                      >
                        <span>Explore Options</span>
                        <motion.svg
                          className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/30 rounded-2xl transition-colors duration-300"
                  />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.p
            className="text-stone-600 text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            Don't see your specific event type? We cater to all occasions across Pune.
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.4 }}
            onClick={() => openContactDialog("Other", "Get Custom Quote")}
          >
            Get Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Events Section with Unique Card Layout Design
function EventsSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const eventIcons = {
    wedding: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    birthday: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    corporate: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    party: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10c0-.552.448-1 1-1h4c.552 0 1 .448 1 1M9 10c0 .552-.448 1-1 1H7a1 1 0 01-1-1c0-.552.448-1 1-1h1m3 6a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    engagement: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    babyshower: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    housewarming: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    festival: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    private: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  };

  return (
    <section id="events" ref={ref} className="py-16 md:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">

      {/* Different Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header with Different Layout */}
        <motion.div
          className="max-w-4xl mx-auto text-left mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center space-x-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <motion.div
              className="h-px bg-gradient-to-r from-amber-500 to-orange-500 flex-1"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.div>

          <motion.h2
            className="font-serif text-4xl md:text-5xl mb-4 text-stone-800 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Events We Cater
          </motion.h2>

          <motion.p
            className="text-xl text-stone-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We cover a wide range of events with tailored menus, incorporating Pune's 2025 trends
            like floral infusions and zero-waste practices.
          </motion.p>
        </motion.div>

        {/* Masonry-style Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            {
              title: "Wedding Catering in Pune",
              desc: "Lavish menus for your big day, from mehendi to reception",
              iconType: "wedding",
              image: "/pune/wedding.jpg",
              bg: "bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200",
              iconBg: "bg-pink-500",
              size: "large",
              link: "/events/wedding"
            },
            {
              title: "Corporate Catering in Pune",
              desc: "Professional handling for meetings, launches, and team-building",
              iconType: "corporate",
              image: "/pune/IT.jpg",
              bg: "bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200",
              iconBg: "bg-blue-500",
              size: "medium",
              link: "/events/corporate"
            },
            {
              title: "Birthday Party Catering in Pune",
              desc: "Fun, themed setups for kids and adults alike",
              iconType: "birthday",
              image: "/pune/bday.jpg",
              bg: "bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200",
              iconBg: "bg-orange-500",
              size: "small",
              link: "/events/birthday-party"
            },
            {
              title: "Festival & Religious Catering in Pune",
              desc: "Reverent, cultural management for Diwali, Ganesh pooja",
              iconType: "festival",
              image: "/pune/festive2.jpg",
              bg: "bg-gradient-to-br from-orange-100 via-red-100 to-orange-200",
              iconBg: "bg-red-500",
              size: "large",
              link: "/events/festival-religious"
            },
            {
              title: "Small Party Catering in Pune",
              desc: "Intimate, stress-free service for kitty parties and reunions",
              iconType: "party",
              image: "/pune/small.jpg",
              bg: "bg-gradient-to-br from-green-100 via-emerald-100 to-green-200",
              iconBg: "bg-green-500",
              size: "medium",
              link: "/events/small-party"
            },
            {
              title: "Engagement Catering in Pune",
              desc: "Romantic, detailed orchestration for ring ceremonies",
              iconType: "engagement",
              image: "/pune/engagement.jpg",
              bg: "bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200",
              iconBg: "bg-purple-500",
              size: "small",
              link: "/events/engagement"
            },
            {
              title: "Baby Shower Catering in Pune",
              desc: "Nurturing, wholesome service for expectant celebrations",
              iconType: "babyshower",
              image: "/pune/baby.png",
              bg: "bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200",
              iconBg: "bg-teal-500",
              size: "medium",
              link: "/events/baby-shower"
            },
            {
              title: "Housewarming Catering in Pune",
              desc: "Traditional spreads for griha pravesh ceremonies",
              iconType: "housewarming",
              image: "/pune/housewarm.jpg",
              bg: "bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200",
              iconBg: "bg-amber-500",
              size: "small",
              link: "/events/housewarming"
            },
            {
              title: "Private Party Catering in Pune",
              desc: "Luxurious service for anniversaries and exclusive evenings",
              iconType: "private",
              image: "/pune/private.jpg",
              bg: "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200",
              iconBg: "bg-slate-500",
              size: "large",
              link: "/events/private-party"
            }
          ].map((event, i) => (
            <motion.a
              key={i}
              href={event.link}
              className={`block break-inside-avoid mb-8 group cursor-pointer ${event.size === 'large' ? 'h-80' :
                event.size === 'medium' ? 'h-' : 'h-72'
                }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className={`${event.bg} rounded-2xl p-6 h-full relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>

                {/* Background Image as Texture */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-white/60" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">

                  {/* Top Section */}
                  <div>
                    <motion.div
                      className={`w-16 h-16 ${event.iconBg} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg`}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {eventIcons[event.iconType]}
                    </motion.div>

                    <motion.h3
                      className="font-serif text-xl mb-3 text-stone-800 leading-tight"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {event.title}
                    </motion.h3>

                    <p className="text-stone-700 text-sm leading-relaxed mb-4">
                      {event.desc}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      className="text-stone-600 text-xs font-medium px-3 py-1 bg-white/60 rounded-full hover:bg-white/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openContactDialog(event.eventType, `Get ${event.eventType} Catering Quote`)}
                    >
                      Get Quote
                    </motion.button>

                    <motion.div
                      className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Different CTA Design */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 border border-amber-200/50 shadow-lg"
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <span className="text-stone-700 font-medium">Ready to start planning?</span>
            <motion.button
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openContactDialog()}
            >
              Get Quote
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Locations Section with Professional Icons
function LocationsSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="locations" ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="font-serif text-3xl md:text-4xl mb-4 text-stone-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Locations We Serve in Pune
        </motion.h2>
        <motion.p
          className="text-stone-600 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We bring expert catering to Pune's key neighborhoods, each with unique vibes—from Chinchwad's industrial energy to Koregaon Park's bohemian luxury.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { name: "Chinchwad", desc: "Industrial-family mix with hearty Maharashtrian options", slug: "chinchwad" },
            { name: "Wakad", desc: "IT-focused efficiency for corporate lunches", slug: "wakad" },
            { name: "Kothrud", desc: "Traditional family-oriented setups", slug: "kothrud" },
            { name: "Wagholi", desc: "Suburban affordability for housewarmings", slug: "wagholi" },
            { name: "Kondhwa", desc: "Cultural depth with halal/satvik menus", slug: "kondhwa" },
            { name: "Viman Nagar", desc: "Airport convenience for global fusions", slug: "viman-nagar" },
            { name: "Kharadi", desc: "Modern fusions for tech events", slug: "kharadi" },
            { name: "Baner", desc: "Upscale wellness for high-rises", slug: "baner" },
            { name: "Koregaon Park", desc: "Premium luxury near Osho", slug: "koregaon-park" },
            { name: "Hadapsar", desc: "Versatile hybrids for townships", slug: "hadapsar" },
            { name: "Aundh", desc: "Sophisticated for university seminars", slug: "aundh" },
            { name: "Wanowrie", desc: "Residential warmth for cantonment families", slug: "wanowrie" },
            { name: "Hinjewadi", desc: "IT-heavy health options", slug: "hinjewadi" },
            { name: "Yerwada", desc: "Urban heritage blends", slug: "yerwada" }
          ].map((location, i) => (
            <motion.a
              key={i}
              href={`/locations/${location.slug}`}
              className="block group"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.03 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full"
              >
                <div className="flex items-start space-x-3">
                  <motion.div
                    className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <motion.h3
                      className="font-semibold text-amber-800 mb-1 group-hover:text-amber-600 transition-colors duration-300"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {location.name}
                    </motion.h3>
                    <p className="text-sm text-stone-600 group-hover:text-stone-700 transition-colors duration-300 mb-2">
                      {location.desc}
                    </p>

                    {/* Get Quote button */}
                    {/* <motion.button
                      className="text-xs text-amber-600 font-medium hover:text-amber-800 transition-colors flex items-center group/btn"
                      whileHover={{ x: 2 }}
                      onClick={() => openContactDialog("", `Get Quote for ${location.name} Area`)}
                    >
                      <span>Get Quote</span>
                      <svg className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button> */}
                  </div>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Google Maps */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 shadow-lg"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-96 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04181590127!2d73.86296995!3d18.52461405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pune Caterers Service Areas"
              ></iframe>
            </div>

            {/* Map Caption */}
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <p className="text-stone-600 text-sm mb-3">
                Click on any location above to learn more about our catering services in that area
              </p>
              <motion.button
                className="text-amber-600 font-medium text-sm hover:text-amber-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                onClick={() => openContactDialog("", "Get Area-Specific Quote")}
              >
                Get Quote for Your Area →
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Us Section with Professional Icons
function WhyChooseUsSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const featureIcons = {
    mastery: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    excellence: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    formats: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    sustainable: (
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    reliability: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    luxury: (
      <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    hygiene: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    satisfaction: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-100 to-amber-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center mb-12 text-stone-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Why Choose Pune Caterers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Local Pune Mastery",
              desc: "Expertise in all neighborhoods, from Chinchwad's 500,000+ industrial crowds to Koregaon Park's bohemian luxury",
              iconType: "mastery"
            },
            {
              title: "Customized Excellence",
              desc: "Tailored menus with 2025 trends like sustainable sourcing and interactive stations for Pune's 7.5 million+ residents",
              iconType: "excellence"
            },
            {
              title: "Versatile Formats",
              desc: "Full-service for end-to-end ease or buffet-style for abundance, adaptable to events in Hinjewadi's tech parks or Kondhwa's resorts",
              iconType: "formats"
            },
            {
              title: "Sustainable Focus",
              desc: "Eco-friendly options reducing waste, perfect for environmentally conscious areas like Baner's green zones or Wagholi's suburbs",
              iconType: "sustainable"
            },
            {
              title: "Proven Reliability",
              desc: "Years of experience in high-density zones (e.g., Kharadi's 20-25% growth), ensuring seamless setup/cleanup",
              iconType: "reliability"
            },
            {
              title: "Affordable Luxury",
              desc: "Packages from ₹500/plate, balancing value for budget suburbs (Wanowrie) and premium for upscale (Viman Nagar)",
              iconType: "luxury"
            },
            {
              title: "Hygiene Excellence",
              desc: "Strict standards for all events, crucial in migrant-heavy Hinjewadi or historical Yerwada",
              iconType: "hygiene"
            },
            {
              title: "Client Satisfaction",
              desc: "Aggregated 5-star reviews from across Pune, with focus on personal touch for family-oriented Kothrud or corporate Hadapsar",
              iconType: "satisfaction"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -5, rotateY: 2, scale: 1.02 }}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {featureIcons[item.iconType]}
              </motion.div>
              <motion.h3
                className="font-semibold text-amber-800 mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-sm text-stone-600 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + 0.1 * i }}
              >
                {item.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.button
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openContactDialog("", "Experience Pune Caterers Excellence")}
          >
            Experience Our Excellence
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Sample Menu Section with Professional Icons
function SampleMenuSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl mb-6 text-stone-800"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sample Menu Options & Pricing
          </motion.h2>
          <motion.p
            className="text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Indulge in our versatile selections inspired by Pune's 2025 trends like sustainable fusions.
            Prices are starting points; customize via event pages.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-100">
                <tr>
                  {["Dish Category", "Description", "Price per Plate"].map((header, i) => (
                    <motion.th
                      key={header}
                      className="py-4 px-6 text-left font-serif text-lg text-stone-800"
                      initial={{ opacity: 0, y: -10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { category: "Appetizer Selection", desc: "Chaat stations or quinoa salads (sustainable twist)", price: "₹200" },
                  { category: "Main Course (Veg)", desc: "Maharashtrian thali or Indo-Italian risotto", price: "₹500" },
                  { category: "Non-Veg Delights", desc: "Grilled chicken or seafood biryani", price: "₹600" },
                  { category: "Fusion Creations", desc: "Sushi-modak or Thai-paneer curry", price: "₹550" },
                  { category: "Dessert Symphony", desc: "Organic yogurts or modak parfaits", price: "₹250" },
                  { category: "Live Stations (Add-On)", desc: "Pasta or kebab bars", price: "+₹150/guest" },
                  { category: "Dietary Options", desc: "Vegan/Jain/gluten-free", price: "No extra cost" },
                  { category: "Full Package (100+ Guests)", desc: "Complete event catering with setup", price: "Starting at ₹50,000" }
                ].map((item, i) => (
                  <motion.tr
                    key={i}
                    className={`border-b border-stone-100 ${i % 2 === 0 ? 'bg-stone-50' : 'bg-white'} hover:bg-amber-50 transition-colors duration-200`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                  >
                    <td className="py-4 px-6 font-semibold text-amber-800">{item.category}</td>
                    <td className="py-4 px-6 text-stone-600">{item.desc}</td>
                    <td className="py-4 px-6 text-right font-semibold text-stone-800">{item.price}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.button
            className="bg-amber-800 text-white px-8 py-3 rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openContactDialog("", "Customize Your Menu")}
          >
            <motion.div
              className="absolute inset-0 bg-amber-900"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative">Customize Your Menu Now</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Portfolio Section with Professional Icons
function PortfolioSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="portfolio" ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-100 to-amber-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >

          <motion.div
            className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-4-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl mb-6 text-stone-800"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Portfolio/Gallery
          </motion.h2>
          <motion.p
            className="text-stone-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From Kharadi tech campuses to Koregaon Park rooftops, our catering brings flair and finesse to every event.
            View highlights of recent weddings, corporate buffets, and private celebrations across Pune.
          </motion.p>
          <motion.button
            className="text-amber-800 font-medium flex items-center justify-center space-x-2 hover:text-amber-600 transition-colors mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => openContactDialog("", "Request Portfolio Details")}
          >
            <span>Explore Portfolio</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openContactDialog("", "Get Similar Event Quote")}
            >
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={`/pune/${i + 1}.jpg`}
                  alt={`Gallery of catering events in Pune – weddings, corporates, festivals ${i + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </motion.div>

              {/* Overlay with smooth reveal */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content overlay */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold mb-1">Event Showcase {i + 1}</h3>
                <p className="text-sm text-gray-200 mb-2">Professional catering excellence</p>
                <button className="text-xs bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded-full transition-colors">
                  Get Similar Quote
                </button>
              </motion.div>

              {/* Zoom indicator */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section with Professional Icons
function TestimonialsSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl text-stone-800"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { quote: "Pune Caterers made our ring ceremony in Koregaon Park magical—elegant and romantic!", author: "Neha & Arjun", rating: "5/5 Stars" },
            { quote: "Best engagement caterers in Pune. Sustainable fusions wowed in Wakad!", author: "Priya S.", rating: "5/5 Stars" },
            { quote: "Themed stations were perfect for our betrothal in Kothrud. Flawless!", author: "Rohan K.", rating: "4.9/5 Stars" },
            { quote: "Vegan options elevated our family event in Kharadi. Highly romantic!", author: "Anjali M.", rating: "5/5 Stars" },
            { quote: "Seamless service for our intimate party in Viman Nagar. Guests loved it!", author: "Vikram P.", rating: "5/5 Stars" },
            { quote: "Interactive delights shone in Hinjewadi. Thank you for the magic!", author: "Sneha T.", rating: "5/5 Stars" }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Star Rating */}
              <motion.div
                className="flex mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              >
                {[...Array(5)].map((_, star) => (
                  <motion.svg
                    key={star}
                    className="w-5 h-5 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.7 + i * 0.1 + star * 0.05,
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </motion.div>

              <motion.blockquote
                className="text-stone-700 mb-4 italic"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>

              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
              >
                <cite className="text-amber-800 font-semibold not-italic">– {testimonial.author}</cite>
                <span className="text-sm text-stone-500">{testimonial.rating}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.button
            className="text-amber-800 font-medium flex items-center justify-center space-x-2 hover:text-amber-600 transition-colors mx-auto"
            whileHover={{ scale: 1.05 }}
            onClick={() => openContactDialog("", "Join Our Happy Clients")}
          >
            <span>Join Our Happy Clients</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section with Professional Icons
function FAQSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: "What is the cost of catering services in Pune?",
      a: "Packages start at ₹500 per plate; a 100-guest event in Chinchwad may range ₹50,000-₹1,00,000 with customizations."
    },
    {
      q: "How do I book caterers in Pune?",
      a: "Fill our form for a complimentary consult. We serve all areas like Wakad, Kothrud, and Kondhwa with ease."
    },
    {
      q: "Do you offer fusion or dietary-specific menus?",
      a: "Yes! Fusion elegance and vegan/gluten-free options, in line with 2025 Pune trends."
    },
    {
      q: "Can you handle large events in Pune suburbs?",
      a: "Absolutely, for 50-1,000+ guests in Wagholi or Baner, with buffet or full-service."
    },
    {
      q: "What trends are popular in catering in Pune for 2025?",
      a: "Themed stations, sustainable ingredients, and floral infusions, especially in Viman Nagar or Hadapsar."
    },
    {
      q: "Do you provide catering for all event types?",
      a: "Yes, full packages for weddings, corporates, festivals, and more across Pune."
    },
    {
      q: "How far in advance should I book catering in Pune?",
      a: "1-4 months ideal, but we accommodate shorter notices in high-demand areas like Hinjewadi."
    },
    {
      q: "Are there any hidden fees in your packages?",
      a: "No—transparent costs for complete peace."
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
            Frequently Asked Questions About Catering in Pune
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
          <motion.button
            className="text-amber-800 font-medium flex items-center justify-center space-x-2 hover:text-amber-600 transition-colors mx-auto"
            whileHover={{ scale: 1.05 }}
            onClick={() => openContactDialog("", "Ask Your Question")}
          >
            <span>Have More Questions?</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Blog Section with Professional Icons
function BlogSection({ openContactDialog }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl mb-6 text-stone-800"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Blog
          </motion.h2>
          <motion.p
            className="text-stone-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Coming Soon - Stay tuned for tips on event planning, catering trends, and more!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "How to Plan a Wedding Menu in Pune",
              desc: "Comprehensive guide to creating the perfect wedding menu that reflects Pune's diverse culinary heritage.",
              tag: "COMING SOON",
              color: "amber",
              icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )
            },
            {
              title: "Pune Catering Trends 2025: What's Hot",
              desc: "Explore the latest trends in sustainable catering, fusion cuisines, and interactive dining experiences.",
              tag: "COMING SOON",
              color: "orange",
              icon: (
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )
            }
          ].map((post, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-400 group cursor-pointer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
              whileHover={{ y: -3, scale: 1.02 }}
              onClick={() => openContactDialog("", "Get Notified About Blog Updates")}
            >
              <motion.div
                className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {post.icon}
              </motion.div>
              <motion.h3
                className="font-serif text-xl mb-3 text-stone-800 group-hover:text-amber-800"
                transition={{ duration: 0.3 }}
              >
                {post.title}
              </motion.h3>
              <motion.p
                className="text-stone-600 mb-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {post.desc}
              </motion.p>
              <motion.span
                className={`inline-block bg-${post.color}-100 text-${post.color}-800 px-3 py-1 rounded-full text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {post.tag}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openContactDialog("", "Subscribe for Blog Updates")}
          >
            Get Notified When Blog Launches
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Find and replace the ContactSection function with this updated version:

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Auto-reset form after successful submission
  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: null,
          guestCount: '',
          location: '',
          eventType: '',
          message: ''
        });
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Format the form data to match the API expectations
      const apiData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
        eventType: formData.eventType || null,
        guestCount: formData.guestCount || null,
        location: formData.location || null,
        message: formData.message || null,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Form submitted successfully!'
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
              Let's Create Something
              <motion.span
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Extraordinary
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-stone-300 text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Share your event details and let Pune Caterers craft a personalized culinary experience
              that will leave lasting memories for you and your guests.
            </motion.p>
          </motion.div>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`mb-8 p-6 rounded-2xl border ${submitStatus.type === 'success'
                    ? 'bg-green-900/20 border-green-500/30 text-green-400'
                    : 'bg-red-900/20 border-red-500/30 text-red-400'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                        disabled={isSubmitting}
                      >
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
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                        disabled={isSubmitting}
                      >
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting || submitStatus.type === 'success'}
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
                      ) : submitStatus.type === 'success' ? (
                        <motion.div
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Request Sent Successfully!</span>
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
            transition={{ duration: 0.6, delay: 2.2 }}
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
                  transition={{ duration: 0.4, delay: 2.4 + i * 0.1 }}
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