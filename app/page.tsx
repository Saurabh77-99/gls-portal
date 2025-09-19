"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleLogin = async () => {
    if (!accessCode.trim()) {
      setError("Please enter an access code");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      console.log("🔄 Starting login process...");
      console.log("Access code:", accessCode.trim());
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ accessCode: accessCode.trim() })
      });
      
      console.log("📡 Response received:", response.status);
      
      const data = await response.json();
      console.log("📋 Response data:", JSON.stringify(data, null, 2));
      
      if (data.success) {
        console.log("✅ Login successful!");
        console.log("🔄 About to redirect...");
        
        // Add a delay to see the logs before redirect
        setTimeout(() => {
          console.log("🚀 Redirecting to dashboard...");
          window.location.replace('/dashboard');
        }, 2000); // 2 second delay
        
        return; // Exit early to prevent loading state reset
        
      } else {
        console.log("❌ Login failed:", data.error);
        setError(data.error || 'Invalid access code. Please try again.');
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      setError('Connection failed. Please check your internet and try again.');
    } finally {
      if (!loading) return; // Don't reset if we're redirecting
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  // Decorative Rectangle Pattern Component
  const RectanglePattern = ({ count = 53 }) => (
    <div className="absolute flex items-center gap-1 opacity-20">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rotate-45 bg-[#F7EFF9]"
          style={{ aspectRatio: "1/1" }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-[120px] py-3">
        <div 
          className="flex justify-between items-center w-full max-w-[1200px] px-4 py-2 rounded-2xl"
          style={{
            background: "rgba(124, 86, 236, 0.03)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(91, 44, 231, 0.10)"
          }}
        >
          {/* Logo */}
          <div
            className="cursor-pointer font-bold text-lg tracking-wide"
            style={{ color: "#1D0A57" }}
            onClick={() => scrollToSection("hero")}
          >
            GLSBTECH
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("code")}
              className="flex justify-center items-center px-4 py-2 rounded-xl text-white font-medium text-base transition-all duration-300"
              style={{
                background: "linear-gradient(102deg, #7C56EC 9.01%, #5B2CE7 82.54%)",
                boxShadow: "inset 2px 3px 4px rgba(255, 255, 255, 0.30), inset -2px -3px 4px rgba(0, 0, 0, 0.05)"
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => scrollToSection("stats")}
              className="flex justify-center items-center px-4 py-2 rounded-xl font-medium text-base transition-all duration-300"
              style={{
                color: "#5B2CE7",
                border: "1.5px solid #5B2CE7",
                background: "transparent"
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-center items-center gap-16 px-[120px] py-[198px]"
        style={{
          background: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIgZmlsbD0iI0UwRENEQyIvPgo8L3N2Zz4K') 0 0/24px 24px"
        }}
      >
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: "linear-gradient(180deg, rgba(253, 244, 234, 0) 29.44%, #FFFFFF 77.39%)"
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center gap-6 w-full max-w-[800px]">
          {/* Title - Exact Figma Typography */}
          <div className="w-full text-center">
            <div 
              style={{
                fontFamily: "Instrument Sans",
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "-1.44px",
                color: "#111111"
              }}
            >
              Meet the Future
            </div>
            <div 
              style={{
                fontFamily: "Instrument Sans", 
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "-1.44px",
                marginTop: "-8px"
              }}
            >
              <span style={{ color: "#5B2CE7" }}>Engineers</span>{" "}
              <span style={{ color: "#111111" }}>of</span>{" "}
              <span 
                style={{ 
                  fontFamily: "Delicious Handrawn",
                  fontSize: "80px",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "1.6px",
                  color: "#DE2B58"
                }}
              >
                GLS
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p 
            className="w-full text-center"
            style={{
              color: "#565454",
              fontFamily: "Instrument Sans",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "140%"
            }}
          >
            Explore profiles of B.Tech students across the batch and specializations
          </p>

          {/* CTA Button */}
          <div className="flex items-start gap-4 w-full justify-center pt-6">
            <button
              onClick={() => scrollToSection("code")}
              className="flex justify-center items-center px-5 py-3 rounded-2xl text-white font-semibold text-lg transition-all duration-300 ease-in-out"
              style={{
                background: "linear-gradient(102deg, #7C56EC 9.01%, #5B2CE7 82.54%)",
                boxShadow: "inset 2px 3px 4px rgba(255, 255, 255, 0.30), inset -2px -3px 4px rgba(0, 0, 0, 0.05)",
                color: "#FFFAFA"
              }}
            >
              Explore Student Profiles
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section 
        id="stats"
        className="relative flex flex-col justify-center items-center gap-16 px-[120px] py-16"
        style={{ background: "rgba(91, 44, 231, 0.05)" }}
      >
        {/* Decorative Pattern - Top */}
        <div className="absolute -top-3 right-[-121px]">
          <RectanglePattern />
        </div>

        <h2 
          className="w-full max-w-[800px] text-center"
          style={{
            color: "#111111",
            fontFamily: "Instrument Sans",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "135%",
            letterSpacing: "-0.96px"
          }}
        >
          Quick Stats
        </h2>

        <div className="flex items-start gap-12">
          {/* Students Card */}
          <div className="flex flex-col justify-center items-center gap-2.5 w-[400px]">
            <h3 
              className="text-center"
              style={{
                fontFamily: "Instrument Sans",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.64px"
              }}
            >
              <span style={{ color: "#5B2CE7" }}>100+</span>{" "}
              <span style={{ color: "#262626" }}>Students</span>
            </h3>
            <p 
              className="w-full text-center"
              style={{
                color: "#565454",
                fontFamily: "Instrument Sans",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%"
              }}
            >
              A strong pool of 100+ ambitious engineering students ready to take on industry challenges.
            </p>
          </div>

          {/* Divider Line */}
          <div 
            className="w-px h-[139px]"
            style={{ background: "#A6A3A3" }}
          />

          {/* Specializations Card */}
          <div className="flex flex-col justify-center items-center gap-2.5 w-[400px]">
            <h3 
              className="text-center"
              style={{
                fontFamily: "Instrument Sans",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.64px"
              }}
            >
              <span style={{ color: "#5B2CE7" }}>2</span>{" "}
              <span style={{ color: "#262626" }}>Specializations</span>
            </h3>
            <p 
              className="w-full text-center"
              style={{
                color: "#565454",
                fontFamily: "Instrument Sans",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%"
              }}
            >
              A strong pool of 100+ ambitious engineering students ready to take on industry challenges.
            </p>
          </div>
        </div>

        {/* Decorative Pattern - Bottom */}
        <div className="absolute -bottom-3 right-[-121px]">
          <RectanglePattern />
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills"
        className="flex flex-col justify-center items-center gap-16 px-[120px] py-16"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 
            className="w-full max-w-[800px] text-center"
            style={{
              color: "#111111",
              fontFamily: "Instrument Sans",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "135%",
              letterSpacing: "-0.96px"
            }}
          >
            Our Spectrum of Skills
          </h2>
          <p 
            className="w-full text-center"
            style={{
              color: "#565454",
              fontFamily: "Instrument Sans",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "140%"
            }}
          >
            Inside our classrooms we do not just teach, we build. GLS B.Tech students bring a spectrum of skills that translate directly into industry impact.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          {/* First Row */}
          <div className="flex items-start gap-4 w-full">
            {/* AI/ML Card */}
            <div 
              className="flex flex-col justify-between items-start flex-1 p-6 rounded-2xl h-[300px]"
              style={{
                border: "1px solid rgba(91, 44, 231, 0.10)",
                background: "linear-gradient(180deg, rgba(222, 213, 250, 0.25) 0%, rgba(189, 171, 245, 0.25) 100%)"
              }}
            >
              <div 
                className="w-36 h-36 rounded-2xl bg-gray-200 flex items-center justify-center text-6xl"
                style={{ aspectRatio: "1/1" }}
              >
                🤖
              </div>
              <h3 
                className="w-full"
                style={{
                  color: "#262626",
                  fontFamily: "Instrument Sans",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.64px"
                }}
              >
                AI / Machine Learning
              </h3>
            </div>

            {/* Cyber Security Card */}
            <div 
              className="flex flex-col justify-between items-start flex-1 p-6 rounded-2xl h-[300px]"
              style={{
                border: "1px solid rgba(91, 44, 231, 0.10)",
                background: "linear-gradient(180deg, rgba(222, 213, 250, 0.25) 0%, rgba(189, 171, 245, 0.25) 100%)"
              }}
            >
              <div 
                className="w-36 h-36 rounded-2xl bg-gray-200 flex items-center justify-center text-6xl"
                style={{ aspectRatio: "1/1" }}
              >
                🔒
              </div>
              <h3 
                className="w-full"
                style={{
                  color: "#262626",
                  fontFamily: "Instrument Sans",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.64px"
                }}
              >
                Cyber Security
              </h3>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-start gap-4 w-full">
            {/* Design & UI/UX Card */}
            <div 
              className="flex flex-col justify-between items-start flex-1 p-6 rounded-2xl h-[300px]"
              style={{
                border: "1px solid rgba(91, 44, 231, 0.10)",
                background: "linear-gradient(180deg, rgba(222, 213, 250, 0.25) 0%, rgba(189, 171, 245, 0.25) 100%)"
              }}
            >
              <div 
                className="w-36 h-36 rounded-2xl bg-gray-200 flex items-center justify-center text-6xl"
                style={{ aspectRatio: "1/1" }}
              >
                🎨
              </div>
              <h3 
                className="w-full"
                style={{
                  color: "#262626",
                  fontFamily: "Instrument Sans",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.64px"
                }}
              >
                Design & UI/UX
              </h3>
            </div>

            {/* Full-Stack Development Card */}
            <div 
              className="flex flex-col justify-between items-start flex-1 p-6 rounded-2xl h-[300px]"
              style={{
                border: "1px solid rgba(91, 44, 231, 0.10)",
                background: "linear-gradient(180deg, rgba(222, 213, 250, 0.25) 0%, rgba(189, 171, 245, 0.25) 100%)"
              }}
            >
              <div 
                className="w-36 h-36 rounded-2xl bg-gray-200 flex items-center justify-center text-6xl"
                style={{ aspectRatio: "1/1" }}
              >
                💻
              </div>
              <h3 
                className="w-full"
                style={{
                  color: "#262626",
                  fontFamily: "Instrument Sans",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.64px"
                }}
              >
                Full-Stack Development
              </h3>
            </div>

            {/* App Development Card */}
            <div 
              className="flex flex-col justify-between items-start flex-1 p-6 rounded-2xl h-[300px]"
              style={{
                border: "1px solid rgba(91, 44, 231, 0.10)",
                background: "linear-gradient(180deg, rgba(222, 213, 250, 0.25) 0%, rgba(189, 171, 245, 0.25) 100%)"
              }}
            >
              <div 
                className="w-36 h-36 rounded-2xl bg-gray-200 flex items-center justify-center text-6xl"
                style={{ aspectRatio: "1/1" }}
              >
                📱
              </div>
              <h3 
                className="w-full"
                style={{
                  color: "#262626",
                  fontFamily: "Instrument Sans",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.64px"
                }}
              >
                App Development
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Access Code Section */}
      <section 
        id="code"
        className="relative flex flex-col justify-center items-center gap-16 px-[120px] py-16"
        style={{
          background: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIgZmlsbD0iI0UwRENEQyIvPgo8L3N2Zz4K') 0 0/24px 24px"
        }}
      >
        <div className="flex flex-col justify-center items-start gap-6 w-full max-w-[800px]">
          <h2 
            className="w-full text-center"
            style={{
              color: "#111111",
              fontFamily: "Instrument Sans",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "135%",
              letterSpacing: "-0.96px"
            }}
          >
            Enter Access Code
          </h2>
          <p 
            className="w-full text-center"
            style={{
              color: "#565454",
              fontFamily: "Instrument Sans",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "140%"
            }}
          >
            Please enter the secure code shared by our placement cell to view student profiles.
          </p>
        </div>

        <div className="flex items-start gap-4">
          {/* Text Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter access code here"
              disabled={loading}
              className="flex justify-between items-center w-[424px] px-4 py-3 rounded-2xl text-base outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#F4F0F0",
                border: error ? "1px solid #E53E3E" : "1px solid #E0DCDC",
                color: "#262626"
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Enter Button */}
          <button
            onClick={handleLogin}
            disabled={loading || !accessCode.trim()}
            className="flex justify-center items-center px-5 py-3 rounded-2xl text-white font-semibold text-lg transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            style={{
              background: "linear-gradient(102deg, #7C56EC 9.01%, #5B2CE7 82.54%)",
              boxShadow: "inset 2px 3px 4px rgba(255, 255, 255, 0.30), inset -2px -3px 4px rgba(0, 0, 0, 0.05)",
              color: "#FFFAFA"
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Enter"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="text-center px-4 py-2 rounded-lg max-w-md"
            style={{
              color: "#E53E3E",
              backgroundColor: "rgba(229, 62, 62, 0.1)",
              border: "1px solid rgba(229, 62, 62, 0.2)",
              fontSize: "14px",
              fontFamily: "Instrument Sans"
            }}
          >
            {error}
          </div>
        )}

        {/* Contact Link */}
        <div className="text-center">
          <span 
            style={{
              color: "#565454",
              fontFamily: "Instrument Sans",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "140%"
            }}
          >
            Unable to Login?{" "}
          </span>
          <button
            onClick={() => scrollToSection("contact")}
            className="transition-all duration-300 ease-in-out"
            style={{
              color: "#DE2B58",
              fontFamily: "Instrument Sans",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "140%",
              textDecoration: "underline"
            }}
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <section 
        id="contact"
        className="flex flex-col justify-center items-center gap-16 px-[120px] py-16"
        style={{ background: "#262626" }}
      >
        <div className="flex items-start gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 
              style={{
                color: "#FFFAFA",
                fontFamily: "Instrument Sans",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.64px"
              }}
            >
              Contact Us
            </h3>
            <div className="space-y-4">
              <div>
                <p style={{ color: "#A6A3A3", fontSize: "16px", fontWeight: 500 }}>Mail</p>
                <p style={{ color: "#C3BFBF", fontSize: "18px" }}>btechplacement@glsuniversity.ac.in</p>
              </div>
              <div>
                <p style={{ color: "#A6A3A3", fontSize: "16px", fontWeight: 500 }}>Phone</p>
                <p style={{ color: "#C3BFBF", fontSize: "18px" }}>+91-XXXXXXXXXX</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-6">
            <h3 
              style={{
                color: "#FFFAFA",
                fontFamily: "Instrument Sans",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.64px"
              }}
            >
              Address
            </h3>
            <div>
              <p style={{ color: "#C3BFBF", fontSize: "18px", lineHeight: "140%" }}>
                Faculty of Engineering & Technology<br />
                GLS Campus, Opp. Law Garden, Ellisbridge,<br />
                Ahmedabad, 380006
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-2">
          <p 
            style={{
              color: "#FFFAFA",
              fontFamily: "Instrument Sans",
              fontSize: "14px",
              fontWeight: 500
            }}
          >
            AUTHORIZED RECRUITERS ONLY | STRICTLY NO STUDENT DATA SHARING OUTSIDE OF RECRUITMENT REQUIREMENTS
          </p>
          <p 
            style={{
              color: "#A6A3A3",
              fontFamily: "Instrument Sans",
              fontSize: "14px"
            }}
          >
            © Faculty of Engineering & Technology, GLS University. All Rights Reserved
          </p>
          <p 
            style={{
              color: "#FFFAFA",
              fontFamily: "Instrument Sans",
              fontSize: "16px",
              fontWeight: 700
            }}
          >
            GLSBTECH
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;