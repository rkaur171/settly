'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Plane, Home, Landmark, CreditCard, Smartphone,
  BadgeCheck, Cross, Car,
} from 'lucide-react'

const SERVICES = [
  { Icon: Plane,      tone: 'blue',  title: 'Airport pickup',      description: 'A friendly face and a ride waiting the moment you land.' },
  { Icon: Home,       tone: 'coral', title: 'Housing',             description: 'Short-term first, then a lease — no Canadian credit history needed.', badge: 'Popular' },
  { Icon: Landmark,   tone: 'teal',  title: 'Bank account',        description: 'Open a newcomer chequing account on day one with just your passport.' },
  { Icon: CreditCard, tone: 'blue',  title: 'Credit card',         description: 'Build a Canadian credit score from scratch — no local history needed.' },
  { Icon: Smartphone, tone: 'coral', title: 'SIM & phone plan',    description: 'A Canadian number the day you land, so everyone can reach you.' },
  { Icon: BadgeCheck, tone: 'amber', title: 'SIN & documents',     description: 'We pre-fill the forms and tell you exactly what to bring.' },
  { Icon: Car,        tone: 'teal',  title: "Driver's licence",    description: 'Exchange or apply for an Ontario licence and start driving sooner.' },
  { Icon: Cross,      tone: 'blue',  title: 'Health card (OHIP)',  description: 'Apply for Ontario health coverage as soon as you have an address.' },
]

const TONE_STYLES: Record<string, { background: string; color: string }> = {
  coral: { background: 'var(--coral-50)', color: 'var(--coral-600)' },
  teal:  { background: 'var(--teal-50)',  color: 'var(--teal-600)'  },
  amber: { background: 'var(--amber-50)', color: 'var(--amber-600)' },
  blue:  { background: '#E8F0FC',          color: 'var(--blue-600)'  },
}

export default function Services({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.services-head', {
        opacity: 0, y: 32, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 82%' },
      })

      gsap.from('.service-card', {
        opacity: 0, y: 44, stagger: 0.09, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-services', start: 'top 80%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="m-section" id="services">
      <div className="m-section__head services-head">
        <h2 className="ds-display-lg">Everything you need, in order</h2>
        <p className="ds-body-md m-section__sub">
          Pick a service or follow your personalised 30-day plan. We always tell you what to do first.
        </p>
      </div>

      <div className="m-services">
        {SERVICES.map((s) => (
          <button key={s.title} className="sy-service service-card" onClick={onStart}>
            <div className="sy-service__icon" style={TONE_STYLES[s.tone]}>
              <s.Icon size={24} strokeWidth={1.8} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="ds-title-lg">{s.title}</span>
              {s.badge && <span className="sy-badge sy-badge--new">{s.badge}</span>}
            </div>
            <p className="ds-body-md">{s.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
