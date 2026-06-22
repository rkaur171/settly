'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WA_COMMUNITY = 'https://wa.me/16474870919?text=Hi%20Immiefy%2C%20I%27d%20like%20to%20join%20the%20newcomer%20community.'

export default function Footer({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.footer-brand', {
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 92%' },
      })

      gsap.from('.footer-col', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 92%' },
        delay: 0.1,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} className="m-footer">
      <div className="m-footer__top">
        <div className="m-footer__brand footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/immiefy-logo-white.svg" alt="Immiefy" height={32} />
          <p className="ds-body-sm m-footer__pitch-sub">The friendliest way to land in Canada.</p>
        </div>

        <div className="m-footer__col footer-col">
          <h4 className="ds-title-sm" style={{ color: 'var(--on-dark)' }}>Immiefy</h4>
          <a href="#" className="m-footer__link">About</a>
          <a href="#how" className="m-footer__link">How it works</a>
          <a href="mailto:hello@immiefy.ca" className="m-footer__link">Contact</a>
        </div>

        <div className="m-footer__col footer-col">
          <h4 className="ds-title-sm" style={{ color: 'var(--on-dark)' }}>For newcomers</h4>
          <a href="#" className="m-footer__link"
            onClick={(e) => { e.preventDefault(); onStart() }}>Get your Canada plan</a>
          <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer" className="m-footer__link">
            Join WhatsApp community
          </a>
          <a href="#" className="m-footer__link">Resources</a>
        </div>

        <div className="m-footer__col footer-col">
          <h4 className="ds-title-sm" style={{ color: 'var(--on-dark)' }}>Partners</h4>
          <a href="#" className="m-footer__link">Immigration consultants</a>
          <a href="#" className="m-footer__link">Housing partners</a>
          <a href="#" className="m-footer__link">Career partners</a>
        </div>
      </div>

      <div className="m-footer__legal">
        <span>© 2026 Immiefy. Operated by Oxnard Technologies Limited.</span>
        <span className="m-footer__legal-right">
          <a href="#" className="m-footer__link">Privacy Policy</a>
          <a href="#" className="m-footer__link">Terms</a>
          <a href="mailto:hello@immiefy.ca" className="m-footer__link">hello@immiefy.ca</a>
        </span>
      </div>
    </footer>
  )
}
