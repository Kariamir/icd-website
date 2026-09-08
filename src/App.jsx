import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HeroScene } from './components/HeroScene'
import './App.css'

function ICDLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="ICD logo mark">
      <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#B08D57" strokeWidth="1.5" fill="none" />
      <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" fill="#1F4068" opacity="0.15" />
      <text x="18" y="23" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="11" fontWeight="600" fill="#1F4068" letterSpacing="1">ICD</text>
    </svg>
  )
}

function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: 0.5,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--blue)',
      }}>
        Scroll
      </span>
      <div style={{
        width: '1px',
        height: '40px',
        background: 'linear-gradient(to bottom, var(--blue), transparent)',
        animation: 'scrollPulse 2s ease-in-out infinite',
      }} />
    </div>
  )
}

export default function App() {
  const overlayRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', {
        opacity: 0,
        y: 28,
        stagger: 0.18,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1.2,
      })
    }, overlayRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Scroll container — drives ScrollTrigger */}
      <div id="hero-scroll" style={{ position: 'relative', height: '400vh' }}>

        {/* Sticky viewport */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}>

          {/* Three.js canvas — fills the sticky pane */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <HeroScene />
          </div>

          {/* Overlay — text content */}
          <div
            ref={overlayRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(2rem, 5vw, 5rem)',
              paddingBottom: 'clamp(3rem, 6vw, 6rem)',
              pointerEvents: 'none',
            }}
          >
            {/* Top-left nav brand */}
            <div
              data-hero
              style={{
                position: 'absolute',
                top: 'clamp(1.5rem, 3vw, 2.5rem)',
                left: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                pointerEvents: 'auto',
              }}
            >
              <ICDLogo />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--blue)',
                  fontWeight: 600,
                }}>
                  ICD Group
                </span>
                <span style={{
                  fontFamily: 'var(--font-persian)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                  direction: 'rtl',
                }}>
                  توسعه ساختمان
                </span>
              </div>
            </div>

            {/* Top-right nav */}
            <nav
              data-hero
              style={{
                position: 'absolute',
                top: 'clamp(1.5rem, 3vw, 2.5rem)',
                right: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                gap: '2rem',
                pointerEvents: 'auto',
              }}
            >
              {['Projects', 'Vision', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--blue)',
                    textDecoration: 'none',
                    opacity: 0.7,
                    cursor: 'pointer',
                    transition: 'opacity 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Main headline block — bottom left */}
            <div style={{ maxWidth: '520px' }}>
              {/* Eyebrow */}
              <div
                data-hero
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  marginBottom: '1.2rem',
                }}
              >
                <div style={{ width: '2rem', height: '1px', background: 'var(--gold)' }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 500,
                }}>
                  Tehran International Tower · 162m · 56 Floors
                </span>
              </div>

              {/* Persian company name */}
              <p
                data-hero
                style={{
                  fontFamily: 'var(--font-persian)',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                  color: 'var(--blue)',
                  opacity: 0.65,
                  letterSpacing: '0.06em',
                  direction: 'rtl',
                  marginBottom: '0.5rem',
                  fontWeight: 300,
                }}
              >
                شرکت بین‌المللی توسعه ساختمان
              </p>

              {/* Main display heading */}
              <h1
                data-hero
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 8vw, 7rem)',
                  fontWeight: 700,
                  color: 'var(--blue)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  marginBottom: '1.6rem',
                }}
              >
                ICD
              </h1>

              {/* Gold rule */}
              <div
                data-hero
                style={{
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(to right, var(--gold), transparent)',
                  marginBottom: '1.4rem',
                }}
              />

              {/* Subheading */}
              <p
                data-hero
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  maxWidth: '380px',
                  marginBottom: '2rem',
                  fontWeight: 300,
                }}
              >
                Pioneering landmark architecture across Iran's skyline. Where engineering precision meets timeless design.
              </p>

              {/* CTA row */}
              <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', pointerEvents: 'auto' }}>
                <a
                  href="#"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#F6F5F1',
                    background: 'var(--blue)',
                    padding: '0.85rem 1.8rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'background 220ms, transform 220ms',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#2a5285'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--blue)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span>Explore Projects</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <a
                  href="#"
                  style={{
                    fontFamily: 'var(--font-persian)',
                    fontSize: '0.82rem',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    letterSpacing: '0.06em',
                    direction: 'rtl',
                    cursor: 'pointer',
                    opacity: 0.85,
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 200ms, opacity 200ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderBottomColor = 'var(--gold)'
                    e.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderBottomColor = 'transparent'
                    e.currentTarget.style.opacity = '0.85'
                  }}
                >
                  کشف پروژه‌ها
                </a>
              </div>
            </div>

            <ScrollIndicator />
          </div>
        </div>
      </div>

      {/* Content section below the hero */}
      <section style={{
        minHeight: '60vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 5rem)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}>
            Our Legacy
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--blue)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            Building Iran's Future, Floor by Floor
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            fontWeight: 300,
          }}>
            Over three decades of landmark development across Tehran and beyond. ICD delivers mixed-use towers, commercial complexes, and residential masterpieces that define city skylines.
          </p>
        </div>
      </section>
    </>
  )
}
