"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Fixed Header */}
      <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
>
  <div className="max-w-[1200px] mx-auto px-6">
    <div className="glass-effect flex items-center justify-between rounded-lg px-6 py-3">
      {/* Logo */}
      <div
        className="cursor-pointer text-primary-1000 font-bold text-lg tracking-wide"
        onClick={() => scrollToSection("hero")}
      >
        GLSBTECH
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <Button
          variant="filled"
          size="medium"
          onClick={() => scrollToSection("code")}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => scrollToSection("stats")}
        >
          Get in Touch
        </Button>
      </div>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-[661px] flex-col items-center justify-center px-[120px] pt-[198px] pb-[128px] bg-dots"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 hero-gradient opacity-80" />

        <div className="relative z-10 max-w-[800px] text-center space-y-8">
          {/* Title */}
          <h1 className="text-hero font-bold text-neutral-1000">
            Meet the Future <br />
            <span className="text-primary-500">Engineers</span> of{" "}
            <span className="text-gls text-secondary-500">GLS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-medium text-neutral-700">
            Explore profiles of B.Tech students across the batch and
            specializations
          </p>

          {/* CTA */}
          <div className="pt-6">
            <Button
              variant="filled"
              size="large"
              onClick={() => scrollToSection("code")}
              className="rounded-2xl"
            >
              Explore Student Profiles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
