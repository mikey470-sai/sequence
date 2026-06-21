"use client";

import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FunnyRobot from "@/components/FunnyRobot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] selection:bg-brand-cyan selection:text-[#121212] text-white">
      {/* Premium Navigation Header */}
      <Header />
      
      <main className="flex-grow">
        {/* HTML5 Canvas Scrollytelling Sequence */}
        <ScrollyCanvas>
          {(scrollYProgress) => <Overlay scrollYProgress={scrollYProgress} />}
        </ScrollyCanvas>
        
        {/* About credentials & Skills meters section */}
        <About />

        {/* Certifications and Achievements Section */}
        <Certifications />

        {/* Selected Project Grid & Works Section */}
        <Projects />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      {/* Editorial Contact & About Footer */}
      <Footer />

      {/* Floating Interactive Robot Widget */}
      <FunnyRobot />
    </div>
  );
}
