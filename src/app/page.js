"use client"

import HeroSection from "../components/sections/hero-section"
import AboutSection from "../components/sections/about-section"
import ServicesSection from "../components/sections/services-section"
import StatisticsSection from "../components/sections/statistics-section"
import ProjectsSection from "../components/sections/projects-section"
import TestimonialsSection from "../components/sections/testimonials-section"
import Footer from "../components/sections/footer"
import LoginPage from "@/components/auth/user/Login"


export default function Page() {
  return (
    <div>
      <HeroSection />
      {/* <LoginPage /> */}
      <AboutSection />
      <ServicesSection />
      <StatisticsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
