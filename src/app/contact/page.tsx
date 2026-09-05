"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { SplitText, BlurText } from "@/components/TextAnimations";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
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
        
        <div className="max-w-7xl mx-auto">
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

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
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
                    <a href="mailto:hello@inxfinia.com" className="font-mono text-black/60 hover:text-black transition-colors">
                      hello@inxfinia.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-full transition-colors group-hover:bg-black/10">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl mb-1">Headquarters</h3>
                    <p className="font-mono text-black/60 leading-relaxed">
                      123 Innovation Drive<br />
                      Tech District, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-full transition-colors group-hover:bg-black/10">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl mb-1">Call Us</h3>
                    <a href="tel:+14155550198" className="font-mono text-black/60 hover:text-black transition-colors">
                      +1 (415) 555-0198
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
                    { icon: GithubIcon, href: "#" }
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
            >
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="bg-white/40 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="John Doe"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Email</label>
                    <input 
                      type="email" 
                      id="email"
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
                    placeholder="Your Company"
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 font-sans outline-none focus:border-black/30 focus:bg-white/60 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out bg-[#090A0F] rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(91,33,182,0.3)]"
                >
                  <span className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  <span className="relative flex items-center gap-3 font-mono tracking-widest uppercase text-sm">
                    Send Message
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 rounded-xl transition-colors duration-300 blur-[2px]"></div>
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}
