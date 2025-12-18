"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { getLocationBySlug, type LocationData } from "@/data/locations";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, CalendarDays, Mail, MapPin, Phone, Send, Users, MessageCircle, Clock, Star, Utensils, Building, Home, Heart, CheckCircle, ArrowRight, TrendingUp, Award, Shield, XCircle } from "lucide-react";
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

interface LocationPageProps {
  params: {
    slug: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    specificLocation: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Get location data
  const locationData = getLocationBySlug(params.slug);

  if (!locationData) {
    notFound();
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50">

      {/* Navigation */}
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
      <HeroSection
        locationData={locationData}
        heroRef={heroRef}
        heroTextY={heroTextY}
        heroImageScale={heroImageScale}
        isLoaded={isLoaded}
      />

      {/* Stats Section */}
      <StatsSection locationData={locationData} />

      {/* Services Grid */}
      <ServicesGrid locationData={locationData} />

      {/* Why Choose Us */}
      <WhyChooseSection locationData={locationData} />

      {/* Menu Showcase */}
      <MenuShowcase locationData={locationData} />

      {/* Testimonials */}
      <TestimonialsCarousel locationData={locationData} />

      {/* FAQ */}
      <FAQAccordion
        locationData={locationData}
        openFAQ={openFAQ}
        setOpenFAQ={setOpenFAQ}
      />

      {/* Contact CTA */}
      <ContactCTA
        locationData={locationData}
        formData={formData}
        setFormData={setFormData}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />
      <FooterSection />

    </div>
  );
}


// Hero Section - Clean & Focused
function HeroSection({
  locationData,
  heroRef,
  heroTextY,
  heroImageScale,
  isLoaded
}: {
  locationData: LocationData;
  heroRef: React.RefObject<HTMLDivElement>;
  heroTextY: any;
  heroImageScale: any;
  isLoaded: boolean;
}) {
  return (
    <section ref={heroRef} className="relative md:mt-12 min-h-screen flex items-center pt-12">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50"
        style={{ scale: heroImageScale }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-1 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            style={{ y: heroTextY }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <motion.span
                className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                Premier Catering Services
              </motion.span>

              <h1 className="font-serif text-4xl lg:text-6xl leading-tight text-stone-800">
                <span className="">Exceptional</span>
                <span className=" ml-2 text-amber-800">Catering in</span>
                <span className="ml-2 font-light">{locationData.fullName}</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-stone-600 leading-relaxed m"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Serving {locationData.population} residents with premium catering solutions
              tailored to {locationData.name}'s unique lifestyle and venues.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link href='#contact'>
                <motion.button
                  className="bg-amber-800 text-white px-8 py-4 rounded-2xl font-medium relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Free Quote</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-900 to-orange-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <Link href='/events'>

                <motion.button
                  className="border-2 border-stone-800 text-stone-800 px-8 py-4 rounded-2xl font-medium"
                  whileHover={{
                    backgroundColor: "#292524",
                    color: "#ffffff",
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { number: "₹" + locationData.priceRange.starter, label: "Starting Price" },
                { number: locationData.testimonials.length + "+", label: "Happy Clients" },
                { number: "24hrs", label: "Response Time" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    className="text-2xl font-bold text-amber-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-stone-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}

// Stats Section - Clean Grid
function StatsSection({ locationData }: { locationData: LocationData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Users,
      number: locationData.population,
      label: "Population Served",
      description: "Residents across " + locationData.name
    },
    {
      icon: Building,
      number: locationData.popularVenues.length + "+",
      label: "Premium Venues",
      description: "Including " + locationData.popularVenues.slice(0, 2).join(" & ")
    },
    {
      icon: Utensils,
      number: locationData.menuHighlights.length + "+",
      label: "Menu Options",
      description: "From appetizers to full packages"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Client Rating",
      description: "Average satisfaction score"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-amber-800 mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="font-semibold text-stone-800 mb-1">{stat.label}</div>
              <p className="text-sm text-stone-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Services Grid - Studio Quality
function ServicesGrid({ locationData }: { locationData: LocationData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Our Specialties
            </motion.span>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Tailored for {locationData.name}
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {locationData.name}'s unique blend of {locationData.keyFeatures.slice(0, 2).join(' and ')}
              calls for specialized catering approaches.
            </p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {locationData.cateringServices.map((service, i) => (
              <motion.div
                key={i}
                className="group relative bg-white rounded-3xl p-8 shadow-lg border border-stone-100 hover:border-amber-200 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Service Icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {i === 0 ? <Building className="w-8 h-8 text-amber-600" /> :
                    i === 1 ? <Home className="w-8 h-8 text-amber-600" /> :
                      <Heart className="w-8 h-8 text-amber-600" />}
                </motion.div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-stone-800 mb-4 group-hover:text-amber-800 transition-colors">
                  {service.title.replace(` in ${locationData.name}`, '')}
                </h3>

                <p className="text-stone-600 leading-relaxed mb-6">
                  {service.description.length > 120
                    ? service.description.substring(0, 120) + "..."
                    : service.description
                  }
                </p>

                {/* CTA */}
                <motion.button
                  className="flex items-center text-amber-800 font-medium group-hover:text-amber-600"
                  whileHover={{ x: 5 }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Section - Minimalist Design
function WhyChooseSection({ locationData }: { locationData: LocationData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Why Choose Us for {locationData.name}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left - Benefits List */}
            <div className="space-y-6">
              {locationData.whyChooseUs.slice(0, 4).map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-stone-50 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {i + 1}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-2">
                      {benefit.split(':')[0]}
                    </h4>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {benefit.split(':')[1]?.trim() || benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/pune/1.jpg"
                  alt="Why choose our catering services"
                  width={500}
                  height={600}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Menu Showcase - Elegant Design
function MenuShowcase({ locationData }: { locationData: LocationData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Our {locationData.name} Menu
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Carefully curated dishes reflecting {locationData.name}'s preferences and dietary trends.
            </p>
          </motion.div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationData.menuHighlights.slice(0, 8).map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 hover:border-amber-200 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-stone-800 mb-2">
                    {item.category}
                  </h4>
                  <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                    {item.description.length > 60
                      ? item.description.substring(0, 60) + "..."
                      : item.description
                    }
                  </p>
                  <motion.div
                    className="text-2xl font-bold text-amber-800"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.price === 0 ? 'Free' :
                      item.price >= 10000 ? `₹${(item.price / 1000).toFixed(0)}K` :
                        `₹${item.price}`}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <Link href='/'>

              <motion.button
                className="bg-gradient-to-r from-amber-800 to-orange-800 text-white px-8 py-4 rounded-2xl font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Menu & Prices
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Testimonials - Carousel Style
function TestimonialsCarousel({ locationData }: { locationData: LocationData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
            What {locationData.name} Says
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {locationData.testimonials.slice(0, 4).map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl p-8 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Stars */}
                <div className="flex text-amber-400 text-lg mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 + starIndex * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-stone-700 mb-4 italic leading-relaxed">
                  "{testimonial.review}"
                </blockquote>

                <div className="font-semibold text-stone-800">
                  — {testimonial.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Accordion - Clean Design
function FAQAccordion({
  locationData,
  openFAQ,
  setOpenFAQ
}: {
  locationData: LocationData;
  openFAQ: number | null;
  setOpenFAQ: (index: number | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Common Questions
            </h2>
            <p className="text-lg text-stone-600">
              Everything you need to know about catering in {locationData.name}
            </p>
          </motion.div>

          <div className="space-y-4">
            {locationData.faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-stone-100"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <motion.button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold text-stone-800 pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.button>

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
                    <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact CTA - Final Section
function ContactCTA({
  locationData,
  formData,
  setFormData,
  focusedField,
  setFocusedField
}: {
  locationData: LocationData;
  formData: any;
  setFormData: (data: any) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  // Add email functionality state
  const [localIsSubmitting, setLocalIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
          source: `Location Page - ${locationData.name}`,
          pageUrl: window.location.href
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your quote request has been sent successfully. We\'ll get back to you within 24 hours.'
        });
        router.push('/thank_you_54321');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guestCount: '',
          specificLocation: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or call us directly at +91-8087889252.'
      });
    } finally {
      setLocalIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 relative overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grain.png')] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-amber-400/20 text-amber-300 rounded-full text-sm font-medium mb-4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Ready to Get Started?
            </motion.span>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mb-6">
              Let's Cater Your
              <span className="block text-amber-400 italic">{locationData.name} Event</span>
            </h2>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Join hundreds of satisfied clients across {locationData.fullName}.
              Get your free quote in under 24 hours.
            </p>
          </motion.div>
          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`mb-8 p-6 rounded-2xl border max-w-4xl mx-auto ${submitStatus.type === 'success'
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

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left - Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div>
                <h3 className="text-2xl font-serif text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Call Us", value: "+91-8087889252", href: "tel:+91-8087889252" },
                    { icon: Mail, label: "Email", value: "info@punecaterers.com", href: "mailto:info@punecaterers.com" },
                    { icon: MapPin, label: "Serving", value: locationData.fullName, href: "#map" }
                  ].map((contact, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)", x: 5 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                        <contact.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-amber-300 text-sm font-medium">{contact.label}</div>
                        <Link
                          href={contact.href}
                          className="text-white hover:text-amber-300 transition-colors"
                        >
                          {contact.value}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-amber-400 mr-2" />
                    <div className="text-xl font-bold text-amber-400">24hrs</div>
                  </div>
                  <div className="text-stone-300 text-sm">Response Time</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-amber-400 mr-2" />
                    <div className="text-xl font-bold text-amber-400">500+</div>
                  </div>
                  <div className="text-stone-300 text-sm">Events Catered</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields with disabled states */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
                    { name: 'phone', type: 'tel', placeholder: 'Phone Number', required: true },
                    { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
                    { name: 'eventDate', type: 'date', placeholder: 'Event Date', required: false }
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    >
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 disabled:opacity-50"
                        required={field.required}
                        disabled={localIsSubmitting || submitStatus.type === 'success'}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <input
                    type="number"
                    placeholder="Guest Count"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 disabled:opacity-50"
                    disabled={localIsSubmitting || submitStatus.type === 'success'}
                  />
                  <input
                    type="text"
                    placeholder={`Location in ${locationData.name}`}
                    value={formData.specificLocation}
                    onChange={(e) => setFormData({ ...formData, specificLocation: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 disabled:opacity-50"
                    disabled={localIsSubmitting || submitStatus.type === 'success'}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <textarea
                    placeholder="Tell us about your event..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 resize-none transition-all duration-300 disabled:opacity-50"
                    disabled={localIsSubmitting || submitStatus.type === 'success'}
                  />
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold relative overflow-hidden group flex items-center justify-center space-x-2 disabled:opacity-50"
                    whileHover={{ scale: localIsSubmitting || submitStatus.type === 'success' ? 1 : 1.02 }}
                    whileTap={{ scale: localIsSubmitting || submitStatus.type === 'success' ? 1 : 0.98 }}
                    disabled={localIsSubmitting || submitStatus.type === 'success'}
                  >
                    <span className="relative flex items-center space-x-2">
                      {localIsSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : submitStatus.type === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Request Sent Successfully!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Get Your Free Quote</span>
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-stone-400 text-sm mt-4">
                    We'll respond within 24 hours with your personalized quote
                  </p>
                </motion.div>
              </form>
            </motion.div>
          </div>


          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16 pt-16 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                className="flex items-center space-x-3 bg-white/10 text-white px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/20"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>Call Now: +91-8087889252</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-3 bg-white/10 text-white px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/20"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

      </div>

    </section>

  );
}

// Add final styles at the end
const customStyles = `
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
  
  @media (max-width: 768px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .text-4xl,
    .text-5xl,
    .text-6xl {
      font-size: clamp(2rem, 8vw, 4rem);
    }
  }
`;

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