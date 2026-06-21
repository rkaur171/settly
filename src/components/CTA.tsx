'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

const WA_ADVISOR = 'https://wa.me/16474870919?text=Hi%20Settly%2C%20I%27d%20like%20to%20talk%20to%20an%20advisor.'

export default function CTA({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      })
      tl.from('.cta-heading', { opacity: 0, y: 36, duration: 0.75, ease: 'power3.out' })
        .from('.cta-body',    { opacity: 0, y: 20, duration: 0.6,  ease: 'power3.out' }, '-=0.45')
        .from('.cta-btn',     { opacity: 0, y: 18, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.35')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="m-cta-wrap">
      <section className="m-cta">
        <h2 className="ds-display-xl cta-heading" style={{ color: 'var(--on-dark)' }}>
          Tell us what you need. We&apos;ll handle the rest.
        </h2>
        <p className="ds-body-lg cta-body" style={{ color: 'rgba(255,246,241,0.8)', maxWidth: 540 }}>
          Airport pickup, a rental, your SIN, OHIP, a SIM — pick what you need
          and an advisor sorts it on WhatsApp. You only pay for the services you ask for.
        </p>
        <div className="m-cta__btns">
          <button className="sy-btn sy-btn--primary sy-btn--lg cta-btn" style={{ gap: 10 }} onClick={onStart}>
            Tell us what you need
            <ArrowRight size={20} strokeWidth={2} />
          </button>
          <a href={WA_ADVISOR} target="_blank" rel="noopener noreferrer"
            className="sy-btn sy-btn--secondary sy-btn--lg m-cta__ghost cta-btn">
            Talk to an advisor
          </a>
        </div>
      </section>
    </div>
  )
}
