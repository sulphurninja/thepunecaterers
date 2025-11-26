"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, Home, Phone } from "lucide-react";

export default function ThankYouPage() {
  return (
    <>
      {/* Google Ads Global Tag */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17754585205"
      />

      <Script id="google-ads-tag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17754585205');

          // Fire conversion when this page loads
          gtag('event', 'conversion', {
            'send_to': 'AW-17754585205/hItUCIuS3sYbEPXwhZJC'
          });
        `}
      </Script>

      {/* PAGE UI */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 md:p-16 max-w-2xl text-center border border-orange-200/30"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-xl"
          >
            <CheckCircle2 className="w-14 h-14 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif text-stone-800 mb-4"
          >
            Thank You!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg text-stone-600 leading-relaxed max-w-lg mx-auto"
          >
            Your request has been submitted successfully.  
            Our Pune Caterers team will contact you shortly with a personalized quote.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Link>

            <a
              href="tel:+91-8087889252"
              className="flex items-center gap-2 bg-white/60 border border-orange-300 text-orange-700 px-6 py-3 rounded-xl font-medium shadow hover:bg-white/90 transition-all"
            >
              <Phone className="w-5 h-5" /> Call Us Now
            </a>
          </motion.div>

          {/* Footer small note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-sm text-stone-500"
          >
            © 2025 Pune Caterers — Excellence in Catering Across Pune.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
