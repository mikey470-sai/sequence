"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, Check } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending progress
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      
      // Reset form fields
      setFormState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear visual checkmark after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const contactItems = [
    {
      label: "Email",
      value: "nsai60224@email.com",
      link: "mailto:nsai60224@email.com",
      icon: <Mail className="w-5 h-5 text-brand-cyan" />,
    },
    {
      label: "Location",
      value: "Visakhapatnam → Bangalore",
      link: "#",
      icon: <MapPin className="w-5 h-5 text-brand-cyan" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/saikiran",
      link: "https://linkedin.com/in/saikiran",
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/mikey470-sai",
      link: "https://github.com/mikey470-sai",
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden z-20 scroll-mt-24">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-cyan/3 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
            04
          </span>
          <div>
            <span className="text-brand-cyan font-mono text-[10px] tracking-widest uppercase block mb-1">
              [ DIRECT CONTACT ]
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
              GET IN TOUCH
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-zinc-900" />
        </div>

        {/* Contact Form Wrapper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-6 uppercase tracking-wider">
                Let's Collaborate
              </h3>
              <p className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-12 max-w-sm">
                I am actively looking for professional opportunities in AI/ML, Python Development, and Full Stack developer roles. Located in Visakhapatnam, ready to relocate to Bangalore.
              </p>
            </div>

            {/* Structured Contact channels */}
            <div className="flex flex-col gap-6">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 p-4 rounded-xl border border-zinc-900/60 bg-zinc-900/10 hover:border-zinc-800 hover:bg-zinc-900/30 transition-all duration-300 pointer-events-auto group"
                >
                  <div className="w-12 h-12 rounded-full border border-zinc-900 bg-zinc-950 flex items-center justify-center group-hover:border-zinc-800 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase block">
                      {item.label}
                    </span>
                    <span className="text-zinc-300 font-sans text-xs md:text-sm font-medium tracking-wide">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 border border-zinc-900 flex flex-col gap-6 pointer-events-auto">
              
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fname" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formState.fname}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-300 font-sans text-sm outline-none focus:border-brand-cyan transition-colors duration-300 placeholder:text-zinc-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lname" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formState.lname}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-300 font-sans text-sm outline-none focus:border-brand-cyan transition-colors duration-300 placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {/* Row 2: Mail & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-300 font-sans text-sm outline-none focus:border-brand-cyan transition-colors duration-300 placeholder:text-zinc-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-300 font-sans text-sm outline-none focus:border-brand-cyan transition-colors duration-300 placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {/* Subject select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-400 font-sans text-sm outline-none focus:border-brand-cyan transition-colors duration-300"
                >
                  <option value="">Select a topic</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message box */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or project..."
                  required
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-3.5 text-zinc-300 font-sans text-sm min-h-[140px] outline-none focus:border-brand-cyan transition-colors duration-300 placeholder:text-zinc-700 resize-y"
                />
              </div>

              {/* Glowing Submission button */}
              <button
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full md:w-auto md:self-start mt-4 px-8 py-4 rounded-xl font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-lg ${
                  isSent
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : isSubmitting
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-brand-cyan text-zinc-950 hover:bg-brand-purple hover:text-white hover:shadow-glow-purple shadow-glow-cyan/15 cursor-pointer"
                }`}
              >
                {isSent ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Message Sent
                  </span>
                ) : isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </span>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
