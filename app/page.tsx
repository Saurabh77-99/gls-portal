'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import aiImg from '../assets/aimachinelearning.png';
import cyberImg from '../assets/cybersecurity.png';
import designImg from '../assets/designuiux.png';
import fullstackImg from '../assets/fullstackdev.png';
import appImg from '../assets/appdev.png';
import brandLogo from '../assets/glsbtech.png';

const REDIRECT_AFTER_LOGIN = '/dashboard';

export default function Home() {
  const [scrolled, setScrolled] = React.useState(false);
  const [showAccess, setShowAccess] = React.useState(false);
  const [accessCode, setAccessCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleLogin() {
    const code = accessCode.trim();
    if (!code) {
      setError('Access code is required');
      return;
    }

    setLoading(true);
    setError(null);
    setOk(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ accessCode: code }),
      });

      let data: {success ?: boolean; error ?: string} | null = null;
      try { 
        data = await res.json(); 
      } catch {}

      if (res.ok && (data?.success ?? true)) {
        setOk(true);
        setTimeout(() => {
          if (REDIRECT_AFTER_LOGIN === window.location.pathname) {
            window.location.reload();
          } else {
            window.location.assign(REDIRECT_AFTER_LOGIN);
          }
        }, 300);
        return;
      }

      const msg =
        (typeof data?.error === 'string' && data.error) ||
        (res.status === 401 ? 'Invalid or expired access code.' : 'Sign-in failed. Please try again.');
      setError(msg);
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!loading) handleLogin();
  }

  return (
    <main>
      {/* ===== NAVIGATION ===== */}
      <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav">
          <div className="brand-pill" aria-label="GLSBTECH">
            <Image src={brandLogo} alt="GLSBTECH" className="brand-logo" width={80} height={16} priority />
          </div>

          <nav className="nav-actions">
            <Link href="#access" className="btn-primary">
              Sign In
            </Link>
            <Link href="mailto:btechplacement@glsuniversity.ac.in" className="btn-outline">
              Get in Touch
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="dots" aria-hidden="true" />
        <div className="hero-swatch" aria-hidden="true" />

        <div className="hero-inner">
          <h1 className="hero-title">
            <span className="line">Meet the Future</span>
            <span className="line1">
              <span className="engineers">Engineers</span> <span>of</span>{' '}
              <span className="gls">GLS</span>
            </span>
          </h1>

          <p className="hero-sub">
            Explore profiles of B.Tech students across the batch and specializations
          </p>

          <div className="hero-cta">
            <Link href="#access" className="cta">
              Explore Student Profiles
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS ===== */}
      <section className="quick-stats">
        <div className="qs-inner">
          <h2 className="qs-title">Quick Stats</h2>

          <div className="qs-grid">
            <div className="qs-card">
              <h3 className="qs-heading">
                <span className="n">100+</span> Students
              </h3>
              <p className="qs-desc">
                A strong pool of 100+ ambitious engineering students ready to take on
                industry challenges.
              </p>
            </div>

            <div className="qs-divider" aria-hidden="true" />

            <div className="qs-card">
              <h3 className="qs-heading">
                <span className="n">2</span> Specializations
              </h3>
              <p className="qs-desc">
                A strong pool of 100+ ambitious engineering students ready to take on
                industry challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="skills">
        <div className="skills-inner">
          <h2 className="skills-title">Our Spectrum of Skills</h2>
          <p className="skills-sub">
            Inside our classrooms we don&apos;t just teach, we build. GLS B.Tech students bring a
            spectrum of skills that translate directly into industry impact.
          </p>

          <div className="skills-grid">
            <a className="skill-card span-6" href="#">
              <div className="skill-art">
                <Image src={aiImg} alt="AI / Machine Learning" priority />
              </div>
              <h3 className="skill-label">AI / Machine Learning</h3>
            </a>

            <a className="skill-card span-6" href="#">
              <div className="skill-art">
                <Image src={cyberImg} alt="Cyber Security" priority />
              </div>
              <h3 className="skill-label">Cyber Security</h3>
            </a>

            <a className="skill-card span-4" href="#">
              <div className="skill-art" style={{ transform: 'translateY(-25px)' }}>
                <Image src={designImg} alt="Design & UI/UX" />
              </div>
              <h3 className="skill-label">Design &amp; UI/UX</h3>
            </a>

            <a className="skill-card span-4" href="#">
              <div className="skill-art">
                <Image src={fullstackImg} alt="Full-Stack Development" />
              </div>
              <h3 className="skill-label">
                Full-Stack
                <br />
                Development
              </h3>
            </a>

            <a className="skill-card span-4" href="#">
              <div className="skill-art">
                <Image src={appImg} alt="App Development" />
              </div>
              <h3 className="skill-label">
                App
                <br />
                Development
              </h3>
            </a>
          </div>
        </div>
      </section>

      {/* ===== ACCESS ===== */}
      <section id="access" className="access">
        <div className="dots" aria-hidden="true" />
        <div className="access-inner">
          {/* Desktop/Tablet: show form */}
          <h2 className="access-title only-mdup">Enter Access Code</h2>
          <p className="access-sub only-mdup">
            Please enter the secure code shared by our placement cell to view student profiles.
          </p>

          <form className="access-form only-mdup" onSubmit={onSubmit}>
            <div className="access-field">
              <input
                type={showAccess ? 'text' : 'password'}
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter access code here"
                aria-label="Access code"
                autoComplete="one-time-code"
                inputMode="text"
                disabled={loading}
              />
              <button
                type="button"
                className="access-toggle"
                aria-label={showAccess ? 'Hide code' : 'Show code'}
                onClick={() => setShowAccess(v => !v)}
                disabled={loading}
              >
                {showAccess ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M3 21 21 3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                )}
              </button>
            </div>

            <button
              className="access-submit"
              type="submit"
              disabled={loading || accessCode.trim().length === 0}
            >
              {loading ? 'Signing in…' : 'Enter'}
            </button>
          </form>

          {/* Success/Error Messages */}
          {ok && !error && (
            <p 
              className="text-center" 
              role="status" 
              aria-live="polite"
              style={{ 
                marginTop: '16px',
                color: 'var(--colors-green-600)',
                fontSize: '16px',
                fontWeight: 500
              }}
            >
              ✓ Signed in — redirecting…
            </p>
          )}

          {error && (
            <p 
              className="text-center" 
              role="alert" 
              aria-live="polite"
              style={{ 
                marginTop: '16px',
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(229, 62, 62, 0.1)',
                border: '1px solid rgba(229, 62, 62, 0.2)',
                color: '#E53E3E',
                fontSize: '14px',
                fontWeight: 500,
                maxWidth: '500px',
                margin: '16px auto 0'
              }}
            >
              {error}
            </p>
          )}

          <p className="access-help only-mdup">
            Unable to Login?{' '}
            <a className="access-contact" href="mailto:btechplacement@glsuniversity.ac.in">
              Contact Us
            </a>
          </p>

          {/* Mobile-only: ⚠️ Portal Access text (no form) */}
          <div className="access-mobile only-mobile">
            <h2 className="access-title-mobile">
              <span>⚠️</span> Portal Access
            </h2>
            <p className="access-mobile-sub">
              Please use a laptop/desktop device to
              <br />
              access the portal
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="f-col">
              <h3 className="f-title">Contact Us</h3>
              <dl className="f-list">
                <dt>Mail</dt>
                <dd>
                  <a href="mailto:btechplacement@glsuniversity.ac.in">
                    btechplacement@glsuniversity.ac.in
                  </a>
                </dd>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+919999999999">+91-XXXXXXXXXX</a>
                </dd>
              </dl>
            </div>

            <div className="f-divider" aria-hidden="true" />

            <div className="f-col">
              <h3 className="f-title">Address</h3>
              <p className="f-org">Faculty of Engineering &amp; Technology</p>
              <address className="f-address">
                GLS Campus, Opp. Law Garden, Ellisbridge, Ahmedabad, 380006
              </address>
            </div>
          </div>

          <p className="f-rule">
            AUTHORIZED RECRUITERS ONLY | STRICTLY NO STUDENT DATA SHARING OUTSIDE OF
            RECRUITMENT REQUIREMENTS
          </p>

          <div className="f-bottom">
            <div className="f-wordmark">
              <Image src={brandLogo} alt="GLSBTECH" className="brand-logo" width={80} height={16} priority />
            </div>
            <p className="f-copy">
              © Faculty of Engineering &amp; Technology, GLS University. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}