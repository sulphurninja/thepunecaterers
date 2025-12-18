"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { getEventBySlug, type EventData } from "@/data/events";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar, CalendarDays, Mail, MapPin, Phone, Send, Users, MessageCircle,
  Clock, Star, Utensils, Building, Home, Heart, CheckCircle, ArrowRight,
  TrendingUp, Award, Shield, Baby, Gift, Sparkles, Coffee, Camera, Music
} from "lucide-react";
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
import ContactFormDialog from "@/components/ContactFormDialog";

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: null,
    eventType: '',
    guestCount: '',
    location: '',
    specificLocation: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Get event data
  const eventData = getEventBySlug(params.slug);

  if (!eventData) {
    notFound();
  }

  const locations = [
    "Chinchwad", "Wakad", "Kothrud", "Wagholi", "Kondhwa",
    "Viman Nagar", "Kharadi", "Baner", "Koregaon Park",
    "Hadapsar", "Aundh", "Wanowrie", "Hinjewadi", "Yerwada"
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    router.push('/thank_you_54321');
  };

  return (
    <div className="overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50">

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
        eventData={eventData}
        heroRef={heroRef}
        heroTextY={heroTextY}
        heroImageScale={heroImageScale}
        isLoaded={isLoaded}
      />

      {/* Stats Section */}
      <StatsSection eventData={eventData} />

      {/* Services Grid */}
      <ServicesGrid eventData={eventData} />

      {/* Why Choose Us */}
      <WhyChooseSection eventData={eventData} />

      {/* Menu Showcase */}
      <MenuShowcase eventData={eventData} />

      {/* Locations We Serve */}
      <LocationsSection eventData={eventData} />

      {/* Testimonials */}
      <TestimonialsCarousel eventData={eventData} />

      {/* FAQ */}
      <FAQAccordion
        eventData={eventData}
        openFAQ={openFAQ}
        setOpenFAQ={setOpenFAQ}
      />

      {/* Contact CTA */}
      <ContactCTA
        eventData={eventData}
        formData={formData}
        setFormData={setFormData}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        locations={locations}
      />
      <FooterSection />
    </div>
  );
}



// Enhanced Hero Section
function HeroSection({
  eventData,
  heroRef,
  heroTextY,
  heroImageScale,
  isLoaded
}: {
  eventData: EventData;
  heroRef: React.RefObject<HTMLDivElement>;
  heroTextY: any;
  heroImageScale: any;
  isLoaded: boolean;
}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactDialogProps, setContactDialogProps] = useState({
    defaultEventType: "",
    title: "Get Your Free Quote"
  });

  const openContactDialog = (eventType = "", title = "Get Your Free Quote") => {
    setContactDialogProps({ defaultEventType: eventType, title });
  };

  return (
    <section ref={heroRef} className="relative md:mt-24 min-h-screen flex items-center pt-12 overflow-hidden">
      {/* Enhanced Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50"
        style={{ scale: heroImageScale }}
      />

      {/* Floating Professional Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { Icon: Baby, delay: 0 },
          { Icon: Heart, delay: 0.2 },
          { Icon: Gift, delay: 0.4 },
          { Icon: Sparkles, delay: 0.6 },
          { Icon: Users, delay: 0.8 }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isLoaded ? 0.1 : 0,
              scale: isLoaded ? 1 : 0,
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              rotate: [0, 360]
            }}
            transition={{
              opacity: { delay: 1 + item.delay },
              scale: { delay: 1 + item.delay },
              y: { repeat: Infinity, duration: 4 + Math.random() * 2 },
              x: { repeat: Infinity, duration: 5 + Math.random() * 2 },
              rotate: { repeat: Infinity, duration: 15 + Math.random() * 5 }
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          >
            <item.Icon className="w-6 h-6 text-pink-600" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Content */}
          <motion.div
            style={{ y: heroTextY }}
            className="space-y-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <motion.span
                className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Baby className="w-4 h-4" />
                <span>Specialized Event Catering</span>
              </motion.span>

              <h1 className="font-serif text-4xl lg:text-6xl leading-tight text-stone-800">
                <span className="text-pink-800">{eventData.heroTitle}</span>
                <span className="block font-light text-stone-700">in Pune</span>
              </h1>
            </motion.div>

            <ContactFormDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)} // <-- Close dialog
              defaultEventType={contactDialogProps.defaultEventType}
              title={eventData.fullName}
            />


            <motion.p
              className="text-lg text-stone-600 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {eventData.heroSubtitle}. We serve {eventData.guestRange.min}-{eventData.guestRange.max} guests
              across all major Pune areas with specialized menus and heartwarming service.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link href='#contact'>

                <motion.button
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-medium relative overflow-hidden group inline-flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                 

                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-700 to-rose-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Get Free Quote</span>
                  </span>
                </motion.button>
              </Link>
              <motion.button
                className="border-2 border-stone-800 text-stone-800 px-8 py-4 rounded-2xl font-medium inline-flex items-center justify-center space-x-2"
                whileHover={{
                  backgroundColor: "#292524",
                  color: "#ffffff",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => {setIsDialogOpen(true) // <-- Open dialog
                openContactDialog("","Book Your Baby Shower")     } } 
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: TrendingUp, number: "₹" + eventData.priceRange.starter, label: "Starting Price" },
                { icon: Users, number: eventData.guestRange.max + "+", label: "Max Guests" },
                { icon: Clock, number: "24hrs", label: "Response Time" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center group"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-xl font-bold text-pink-800">{stat.number}</div>
                  <div className="text-sm text-stone-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Stats Section
function StatsSection({ eventData }: { eventData: EventData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Users,
      number: eventData.guestRange.min + "-" + eventData.guestRange.max,
      label: "Guest Capacity",
      description: "Intimate to large celebrations",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: MapPin,
      number: eventData.popularLocations.length + "+",
      label: "Pune Locations",
      description: "Across all major areas",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Utensils,
      number: eventData.menuHighlights.length + "+",
      label: "Menu Options",
      description: "Specialized event menus",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Client Rating",
      description: "Exceptional satisfaction",
      gradient: "from-amber-500 to-orange-600"
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
              className="text-center p-6 rounded-2xl border border-stone-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-pink-800 mb-2"
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

// Enhanced Services Grid
function ServicesGrid({ eventData }: { eventData: EventData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getServiceIcon = (iconName: string) => {
    const icons = {
      heart: Heart,
      coffee: Coffee,
      sparkles: Sparkles,
      gift: Gift,
      camera: Camera,
      music: Music
    };
    return icons[iconName as keyof typeof icons] || Heart;
  };

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
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Baby className="w-8 h-8 text-white" />
            </motion.div>

            <motion.span
              className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Our Specialties
            </motion.span>

            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Tailored {eventData.name} Services
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Specialized catering services designed to make your {eventData.name.toLowerCase()} celebration unforgettable across Pune.
            </p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {eventData.serviceTypes.map((service, i) => {
              const ServiceIcon = getServiceIcon(service.icon);
              return (
                <motion.div
                  key={i}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-stone-100 hover:border-pink-200 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Enhanced Service Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ServiceIcon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl text-stone-800 mb-4 group-hover:text-pink-800 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-stone-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Enhanced CTA */}
                  <motion.button
                    className="flex items-center text-pink-800 font-medium group-hover:text-pink-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Why Choose Section
function WhyChooseSection({ eventData }: { eventData: EventData }) {
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
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Why Choose Us for Your {eventData.name}
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Specialized expertise meets heartfelt service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left - Benefits List */}
            <div className="space-y-6">
              {eventData.whyChooseUs.slice(0, 4).map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-stone-50 transition-colors duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-xl text-stone-800 mb-2 group-hover:text-pink-800 transition-colors">
                      {benefit.split(':')[0]}
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={`/pune/${eventData.name.toLowerCase()}.png`}
                  alt={`Why choose our ${eventData.name.toLowerCase()} catering services`}
                  width={500}
                  height={600}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent" />

                {/* Overlay Badge */}
                <motion.div
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 text-sm">Certified Excellence</div>
                      <div className="text-stone-600 text-xs">Premium Quality</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Menu Showcase
function MenuShowcase({ eventData }: { eventData: EventData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactDialogProps, setContactDialogProps] = useState({
    defaultEventType: "",
    title: "Get Your Free Quote"
  });

  const openContactDialog = (eventType = "", title = "Get Your Free Quote") => {
    setContactDialogProps({ defaultEventType: eventType, title }); 
 };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-stone-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Utensils className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Our {eventData.name} Menu
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Carefully crafted menus designed specifically for {eventData.name.toLowerCase()} celebrations with wholesome, delightful options.
            </p>
          </motion.div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventData.menuHighlights.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 hover:border-pink-200 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Utensils className="w-6 h-6 text-white" />
                  </motion.div>
                  <h4 className="font-semibold text-stone-800 mb-2 group-hover:text-pink-800 transition-colors">
                    {item.category}
                  </h4>
                  <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <motion.div
                    className="text-2xl font-bold text-pink-800"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.price === 0 ? 'Included' :
                      item.price >= 10000 ? `₹${(item.price / 1000).toFixed(0)}K` :
                        `₹${item.price}`}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <ContactFormDialog
                                    isOpen={isDialogOpen}
                                    onClose={() => setIsDialogOpen(false)} // <-- Close dialog
                                    defaultEventType={contactDialogProps.defaultEventType}
                                    title={contactDialogProps.title}
          />


          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {setIsDialogOpen(true) // <-- Open dialog
                openContactDialog("","Contact and Customize Menu")     } } 

            >
              <Utensils className="w-5 h-5" />
              <span>Customize Your Menu</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Locations Section
function LocationsSection({ eventData }: { eventData: EventData }) {
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
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Locations We Serve
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We bring our specialized {eventData.name.toLowerCase()} catering services across all major areas of Pune
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {eventData.popularLocations.map((location, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-stone-50 to-pink-50 rounded-xl p-4 text-center border border-stone-100 hover:border-pink-200 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </motion.div>
                <h4 className="font-semibold text-stone-800 group-hover:text-pink-800 transition-colors">
                  {location}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Testimonials
function TestimonialsCarousel({ eventData }: { eventData: EventData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Real experiences from families who trusted us with their special {eventData.name.toLowerCase()} celebrations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {eventData.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 relative border border-stone-100 hover:border-pink-200 transition-all duration-300 group shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </motion.div>

                {/* Stars */}
                <div className="flex text-pink-400 text-lg mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      className="w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 + starIndex * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-stone-700 mb-6 italic leading-relaxed group-hover:text-stone-800 transition-colors">
                  "{testimonial.review}"
                </blockquote>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">{testimonial.name}</div>
                    <div className="text-stone-600 text-sm">
                      {testimonial.location ? `${testimonial.location}, Pune` : 'Pune Client'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced FAQ Accordion
function FAQAccordion({
  eventData,
  openFAQ,
  setOpenFAQ
}: {
  eventData: EventData;
  openFAQ: number | null;
  setOpenFAQ: (index: number | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-stone-600">
              Everything you need to know about our {eventData.name.toLowerCase()} catering services in Pune
            </p>
          </motion.div>

          <div className="space-y-4">
            {eventData.faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <motion.button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  whileHover={{ backgroundColor: "rgba(251, 113, 133, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold text-stone-800 pr-4">{faq.question}</h3>
                  <motion.svg
                    className="w-6 h-6 text-rose-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openFAQ === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
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

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href="#contact"
              className="text-rose-800 font-medium flex items-center justify-center space-x-2 hover:text-rose-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <span>Ask a Question</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Contact CTA
function ContactCTA({
  eventData,
  formData,
  setFormData,
  focusedField,
  setFocusedField,
  handleSubmit,
  isSubmitting,
  locations
}: {
  eventData: EventData;
  formData: any;
  setFormData: (data: any) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  locations: string[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-br from-stone-900 via-pink-900 to-rose-900 relative overflow-hidden">

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(251, 113, 133, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(251, 113, 133, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px', '0px 0px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-rose-600/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-pink-400/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Send className="w-12 h-12 text-pink-400" />
            </motion.div>

            <motion.h2
              className="font-serif text-4xl md:text-6xl mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Let's Plan Your Perfect
              <motion.span
                className="block bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {eventData.name} Celebration
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-stone-300 text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Join hundreds of families who trusted us with their special moments.
              Get your personalized quote within 24 hours for your {eventData.name.toLowerCase()} celebration.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">

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
                  content: "All Pune Locations",
                  description: `${eventData.name} catering across Pune`,
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
                  <div className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-pink-400/30 transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-pink-300 font-medium mb-2">{item.content}</p>
                        <p className="text-stone-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
              >
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-pink-400 mr-2" />
                    <div className="text-xl font-bold text-pink-400">24hrs</div>
                  </div>
                  <div className="text-stone-300 text-sm">Response Time</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-pink-400 mr-2" />
                    <div className="text-xl font-bold text-pink-400">{eventData.guestRange.max}+</div>
                  </div>
                  <div className="text-stone-300 text-sm">Max Guests</div>
                </div>
              </motion.div>
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
                      <Label htmlFor="name" className="text-pink-300 font-medium flex items-center space-x-2">
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
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
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
                      <Label htmlFor="email" className="text-pink-300 font-medium flex items-center space-x-2">
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
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
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
                      <Label htmlFor="phone" className="text-pink-300 font-medium flex items-center space-x-2">
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
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
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
                      <Label className="text-pink-300 font-medium flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>Event Date</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 focus:border-pink-400 rounded-xl justify-start font-normal"
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

                  {/* Guest Count & Location Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <Label className="text-pink-300 font-medium flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Expected Guest Count</span>
                      </Label>
                      <Input
                        type="number"
                        min={eventData.guestRange.min}
                        max={eventData.guestRange.max}
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        onFocus={() => setFocusedField('guestCount')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                        placeholder={`${eventData.guestRange.min}-${eventData.guestRange.max} guests`}
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    >
                      <Label className="text-pink-300 font-medium flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location in Pune</span>
                      </Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                        <SelectTrigger className="w-full h-12 bg-white/10 border-white/20 text-white focus:border-pink-400 rounded-xl">
                          <SelectValue placeholder="Select your area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-stone-200">
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  >
                    <Label htmlFor="message" className="text-pink-300 font-medium flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Tell us about your {eventData.name.toLowerCase()} vision</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl min-h-[120px] resize-none"
                      placeholder={`Share your theme preferences, dietary requirements, special requests, or any specific needs for your ${eventData.name.toLowerCase()}...`}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.9 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
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
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      <span className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Or call us directly:</span>
                      </span>
                      <motion.a
                        href="tel:+91-8087889252"
                        className="text-pink-400 hover:text-pink-300 font-semibold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
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

          {/* Bottom Trust Indicators */}
          <motion.div
            className="text-center mt-16 pt-16 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Shield, label: "Licensed & Insured", value: "100%" },
                { icon: Award, label: "Quality Guarantee", value: "5★" },
                { icon: Clock, label: "On-Time Service", value: "Always" },
                { icon: Heart, label: "Happy Families", value: "500+" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 2.5 + i * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="text-pink-300 font-bold text-sm">{item.value}</div>
                  <div className="text-stone-400 text-xs">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-stone-400 mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.8 }}
            >
              Trusted by families across Pune for exceptional {eventData.name.toLowerCase()} celebrations.
              Join our community of satisfied clients and create memories that last forever.
            </motion.p>
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