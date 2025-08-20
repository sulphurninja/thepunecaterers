"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, Mail, Plus } from "lucide-react";
import ContactFormDialog from "./ContactFormDialog";

export default function FloatingButtons() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappNumber = "918087889252"; // Your WhatsApp number
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in your catering services in Pune. Could you please share more details?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Contact Form Dialog */}
      <ContactFormDialog 
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        title="Quick Quote Request"
      />

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        
        {/* Expanded Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col space-y-3"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, staggerChildren: 0.05 }}
            >
              {/* Contact Form Button */}
              <motion.button
                className="group flex items-center bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  setIsContactDialogOpen(true);
                  setIsExpanded(false);
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center px-4 py-3">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-medium text-sm whitespace-nowrap">Get Quote</span>
                </div>
              </motion.button>

              {/* WhatsApp Button */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center px-4 py-3">
                  {/* WhatsApp SVG Icon */}
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="font-medium text-sm whitespace-nowrap">WhatsApp</span>
                </div>
              </motion.a>

              {/* Call Button */}
              <motion.a
                href="tel:+918087889252"
                className="group flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center px-4 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium text-sm whitespace-nowrap">Call Now</span>
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          className={`w-16 h-16 p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white ${
            isExpanded 
              ? 'bg-black' 
              : 'bg-white'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
             <X className="" />
          ) : (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <img src='/logo.png' className="" />
            </motion.div>
          )}
        </motion.button>

        {/* Floating Animation Ring */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-amber-400/30 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/10 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}