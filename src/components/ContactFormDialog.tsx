"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Calendar, CalendarDays, Mail, MapPin, Phone, Send, Users } from "lucide-react";

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventType?: string;
  title?: string;
}

export default function ContactFormDialog({ 
  isOpen, 
  onClose, 
  defaultEventType = "",
  title = "Get Your Free Quote"
}: ContactFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: null,
    guestCount: '',
    location: '',
    eventType: defaultEventType,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form or show success message
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-screen h-fit overflow-y-auto  bg-gradient-to-br from-stone-900 to-black border border-amber-400/20">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-center">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-400/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Mail className="w-8 h-8 text-amber-400" />
            </motion.div>
            <motion.h2
              className="font-serif text-2xl md:text-3xl text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-stone-300 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Share your event details and let us craft a personalized experience
            </motion.p>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-300 font-medium flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-11"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-300 font-medium flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-11"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Contact & Event Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-amber-300 font-medium flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-11"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-amber-300 font-medium flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>Event Date</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-11 bg-white/10 border-white/20 text-white hover:bg-white/20 focus:border-amber-400 rounded-xl justify-start font-normal"
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
              </div>
            </div>

            {/* Event Type & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-amber-300 font-medium">Event Type</Label>
                <Select 
                  value={formData.eventType} 
                  onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                >
                  <SelectTrigger className="w-full h-11 bg-white/10 border-white/20 text-white focus:border-amber-400 rounded-xl">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-stone-200">
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-amber-300 font-medium flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location in Pune</span>
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger className="w-full h-11 bg-white/10 border-white/20 text-white focus:border-amber-400 rounded-xl">
                    <SelectValue placeholder="Select your area" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-stone-200">
                    {puneLocations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
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
                className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl h-11"
                placeholder="Number of guests expected"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-amber-300 font-medium">
                Tell us about your event vision
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/50 rounded-xl min-h-[100px] resize-none"
                placeholder="Share your dietary requirements, special requests, theme preferences..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center space-x-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Request...</span>
                  </motion.div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Get Your Personalized Quote</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}