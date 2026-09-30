"use client";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Cloud, Terminal } from "lucide-react";
import { SplitText, BlurText } from "@/components/TextAnimations";

const CloudSecretBase = ({ onClose }: { onClose: () => void }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-2xl cursor-pointer overflow-hidden"
      onClick={onClose}
    >
      {/* Funky light-theme background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-300/30 blur-[100px] rounded-full mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-300/30 blur-[100px] rounded-full mix-blend-multiply pointer-events-none"></div>
      
      {/* Drifting Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth - window.innerWidth / 2 : 0, 
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight - window.innerHeight / 2 : 0,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            x: typeof window !== 'undefined' ? (Math.random() - 0.5) * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? (Math.random() - 0.5) * window.innerHeight : 0,
            opacity: Math.random() * 0.4 + 0.2,
            scale: Math.random() * 2 + 1
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
          className="absolute text-blue-500/10"
        >
          <Cloud size={160} strokeWidth={1} fill="currentColor" />
        </motion.div>
      ))}

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-block mb-6 text-[100px] md:text-[140px]"
        >
          ☁️
        </motion.div>
        
        <h2 className="font-syne text-5xl md:text-7xl font-extrabold text-black mb-6 leading-tight tracking-tighter">
          No physical walls.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Just infinite vibes.
          </span>
        </h2>
        
        <p className="font-mono text-black/50 tracking-widest uppercase text-xs md:text-sm font-bold bg-white/80 px-6 py-3 rounded-full inline-block shadow-sm border border-black/5 hover:bg-white transition-colors">
          Click anywhere to return to reality
        </p>
      </motion.div>
    </div>
  );
};

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [isEvading, setIsEvading] = useState(false);
  const [showClouds, setShowClouds] = useState(false);

  const isFormValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  const handleEvade = () => {
    if (!isFormValid) {
      setIsEvading(true);
      // Evade smoothly away from the cursor across a reasonable area so it stays visible
      let newX = (Math.random() - 0.5) * 600; // random jump X (-300 to 300)
      let newY = (Math.random() - 0.5) * 400; // random jump Y (-200 to 200)

      // Ensure it jumps a minimum distance away from its current position
      if (Math.abs(newX - buttonPos.x) < 150) {
        newX = newX > buttonPos.x ? newX + 150 : newX - 150;
      }
      if (Math.abs(newY - buttonPos.y) < 100) {
        newY = newY > buttonPos.y ? newY + 100 : newY - 100;
      }

      setButtonPos({ x: newX, y: newY });
    }
  };

  // Reset if they finally fill the form
  if (isFormValid && isEvading) {
    setIsEvading(false);
    setButtonPos({ x: 0, y: 0 });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const text = `Hi INXFINIA,\n\nI'm ${name}${company ? ` from ${company}` : ''}.\nEmail: ${email}\n\nMessage:\n${message}`;
      window.open(`https://wa.me/918989099821?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <>
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>
      <main className="min-h-screen pt-32 pb-20 relative z-10 px-6 md:px-12 lg:px-24">

        <div className="max-w-7xl mx-auto overflow-visible">
          {/* Header */}
          <div className="mb-16 lg:mb-24">
            <h1 className="font-syne text-[clamp(3rem,8vw,6rem)] font-extrabold leading-none tracking-tight mb-6 flex flex-col">
              <SplitText text="Let's build" delay={0.1} />
              <SplitText
                text="the future."
                delay={0.3}
                className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black/80 to-black/40"
              />
            </h1>
            <BlurText
              text="Whether you have a specific project in mind or just want to explore possibilities, we're ready to collaborate."
              delay={0.6}
              className="font-mono text-black/50 tracking-widest uppercase text-sm max-w-xl leading-relaxed"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-8">
                <div className="group flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-full transition-colors group-hover:bg-black/10">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl mb-1">Email Us</h3>
                    <a href="mailto:hey@inxfinia.com" className="font-mono text-black/60 hover:text-black transition-colors">
                      hey@inxfinia.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-full transition-all group-hover:bg-black/10 group-hover:scale-110">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl mb-2 group-hover:text-emerald-600 transition-colors">Coordinates</h3>
                    <div className="font-mono text-black/60 leading-relaxed">
                      <div className="flex items-center gap-2 text-black/80 font-semibold text-lg">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        Everywhere (The Internet)
                      </div>
                      <span 
                        className="block mt-2 cursor-pointer hover:text-emerald-500 transition-colors inline-block group/cloud text-lg"
                        onClick={() => setShowClouds(true)}
                      >
                        Living in the Cloud ☁️
                        <span className="opacity-0 group-hover/cloud:opacity-100 text-xs ml-2 text-black/40 transition-opacity">
                          (Click me)
                        </span>
                      </span>
                      <span className="block text-sm text-black/40 mt-3 border-t border-black/10 pt-3 w-fit">
                        No physical walls. Infinite scale.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-full transition-colors group-hover:bg-black/10">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl mb-1">Call Us</h3>
                    <a href="tel:+918989099821" className="font-mono text-black/60 hover:text-black transition-colors">
                      +91 89890 99821
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="font-syne font-bold text-xl mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: TwitterIcon, href: "#" },
                    { icon: LinkedinIcon, href: "#" },
                    { icon: InstagramIcon, href: "#" },
                    { icon: WhatsAppIcon, href: "#" },
                    { icon: GmailIcon, href: "mailto:hey@inxfinia.com" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="p-3 bg-black/5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="relative z-20"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/40 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="company" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company"
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 mb-12">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all resize-none"
                  ></textarea>
                </div>

                {/* The Evasive Button Area */}
                <div className="relative w-full h-[56px] z-50">
                  {/* Left-behind text placeholder */}
                  {isEvading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono font-bold text-sm tracking-widest uppercase text-black/40">
                        CAUGHT ME IF YOU CAN! 🏃💨
                      </span>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-black/30 mt-1">
                        (Fill the form and I'll come back)
                      </span>
                    </div>
                  )}

                  {/* The moving button */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
                      transition: isEvading ? "transform 0.3s cubic-bezier(0.2, 0, 0, 1)" : "transform 0.4s ease-out"
                    }}
                    onMouseEnter={handleEvade}
                    onMouseOver={handleEvade}
                  >
                    {/* Invisible massive 80px padding to catch the mouse BEFORE it ever touches the button */}
                    {!isFormValid && (
                      <div className="absolute -inset-[80px] z-10 cursor-not-allowed" />
                    )}

                    <button
                      type={isFormValid ? "submit" : "button"}
                      onClick={(e) => {
                        if (!isFormValid) {
                          e.preventDefault();
                          handleEvade();
                        }
                      }}
                      className={`group relative w-full h-full inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out bg-[#090A0F] rounded-xl overflow-hidden shadow-2xl ${isFormValid ? "hover:shadow-[0_0_40px_rgba(91,33,182,0.3)] pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <span className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                      <span className="relative flex items-center gap-3 font-mono tracking-widest uppercase text-sm">
                        {isEvading ? "CATCH ME!" : "SEND WHATSAPP"}
                        {!isEvading && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />}
                      </span>
                      <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
                      <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 rounded-xl transition-colors duration-300 blur-[2px]"></div>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Cloud Hacker Easter Egg Overlay */}
      <AnimatePresence>
        {showClouds && <CloudSecretBase onClose={() => setShowClouds(false)} />}
      </AnimatePresence>
    </>
  );
}
