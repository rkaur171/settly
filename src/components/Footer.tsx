'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe } from 'lucide-react'

const WA_ADVISOR = 'https://wa.me/16474870919?text=Hi%20Settly%2C%20I%27d%20like%20to%20speak%20with%20an%20advisor.'

const COLS = [
  {
    heading: 'Services',
    links: ['Airport pickup', 'Housing', 'Banking', 'SIN & ID', 'Getting around'],
    toForm: true,
  },
  {
    heading: 'Newcomers',
    links: ['Students', 'New PRs', 'Work permits', 'Visitors'],
    toForm: true,
  },
  {
    heading: 'Support',
    links: ['Help centre', 'Message an advisor', 'Trust & safety', 'Privacy'],
    toForm: false,
  },
]

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
          <img src="/settly-logo-white.svg" alt="Settly" height={32} />
          <p>The friendliest way to land in Canada.</p>
        </div>

        {COLS.map((col) => (
          <div key={col.heading} className="m-footer__col footer-col">
            <h4>{col.heading}</h4>
            {col.links.map((link) => {
              if (link === 'Message an advisor') {
                return (
                  <a key={link} href={WA_ADVISOR} target="_blank" rel="noopener noreferrer" className="m-footer__link">
                    {link}
                  </a>
                )
              }
              if (col.toForm) {
                return (
                  <a key={link} href="#" className="m-footer__link"
                    onClick={(e) => { e.preventDefault(); onStart() }}>
                    {link}
                  </a>
                )
              }
              return (
                <a key={link} href="#" className="m-footer__link">{link}</a>
              )
            })}
          </div>
        ))}
      </div>

      <div className="m-footer__legal">
        <span>© 2026 Settly. All rights reserved. Operated by Oxnard Technologies Limited.</span>
        <span className="m-footer__legal-right">
          <Globe size={15} strokeWidth={1.8} />
          English · CAD
        </span>
      </div>
    </footer>
  )
}
