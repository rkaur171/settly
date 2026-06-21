'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Plane, Home, Landmark, CreditCard, Smartphone,
  BadgeCheck, Cross, Car, BedDouble,
  Briefcase, FileText, Users, Receipt, FileCheck, PiggyBank, TrendingUp,
  ArrowRight,
} from 'lucide-react'

type Tone = 'blue' | 'teal' | 'amber' | 'coral'

const TONE_STYLES: Record<Tone, { background: string; color: string }> = {
  blue:  { background: '#E8F0FC',          color: 'var(--blue-600)'  },
  teal:  { background: 'var(--teal-50)',   color: 'var(--teal-600)'  },
  amber: { background: 'var(--amber-50)',  color: 'var(--amber-600)' },
  coral: { background: 'var(--coral-50)',  color: 'var(--coral-600)' },
}

const PHASES: {
  n: string; tone: Tone; title: string; time: string; purpose: string;
  services: { Icon: React.ElementType; title: string; description: string; badge?: string }[];
}[] = [
  {
    n: '01', tone: 'blue', title: 'Arrival', time: 'Day 1',
    purpose: 'Immediate survival needs',
    services: [
      { Icon: Plane,      title: 'Airport pickup',          description: 'A friendly face and a ride waiting the moment you land.', badge: 'Optional' },
      { Icon: BedDouble,  title: 'Temporary stay guidance', description: 'Where to land softly for your first nights — vetted, newcomer-friendly options.' },
      { Icon: Smartphone, title: 'SIM card setup',          description: 'A Canadian number the day you arrive, so everyone can reach you.' },
    ],
  },
  {
    n: '02', tone: 'teal', title: 'Settling In', time: 'First 7–30 days',
    purpose: 'Government + identity setup',
    services: [
      { Icon: BadgeCheck, title: 'Get your SIN',        description: 'We pre-fill the forms and tell you exactly what to bring.' },
      { Icon: Landmark,   title: 'Open a bank account', description: 'A newcomer chequing account on day one with just your passport.' },
      { Icon: Home,       title: 'Find housing',         description: 'Short-term first, then a lease — no Canadian credit history needed.', badge: 'Popular' },
      { Icon: Cross,      title: 'Get health card',      description: 'Apply for provincial health coverage as soon as you have an address.' },
      { Icon: Car,        title: "Get driver's licence", description: 'Exchange or apply for a licence and start driving sooner.' },
    ],
  },
  {
    n: '03', tone: 'amber', title: 'Building Life', time: '30–90 days',
    purpose: 'Stability + income',
    services: [
      { Icon: Briefcase,  title: 'Job search support',    description: 'Targeted leads and warm intros in your field across Canada.' },
      { Icon: FileText,   title: 'Resume guidance',       description: 'A Canadian-format resume that gets you past the first screen.' },
      { Icon: CreditCard, title: 'Credit building',       description: 'Build a Canadian credit score from scratch — no local history needed.' },
      { Icon: Users,      title: 'Community connections', description: "Meet other newcomers and locals who've made the same move." },
    ],
  },
  {
    n: '04', tone: 'coral', title: 'Long-term Life', time: '3–12 months',
    purpose: 'Long-term integration',
    services: [
      { Icon: Receipt,    title: 'Taxes',             description: 'File your first Canadian return with confidence — benefits included.' },
      { Icon: FileCheck,  title: 'PR guidance',        description: 'Map your path to permanent residency, if it applies to you.', badge: 'If applicable' },
      { Icon: PiggyBank,  title: 'Financial planning', description: "Budget, save, and invest for the life you're building here." },
      { Icon: TrendingUp, title: 'Career growth',      description: 'Upskilling and credential recognition to move your career forward.' },
    ],
  },
]

export default function Services({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.services-head', {
        opacity: 0, y: 32, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 82%' },
      })

      gsap.from('.phase-block', {
        opacity: 0, y: 44, stagger: 0.14, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-phases', start: 'top 80%' },
      })

      gsap.from('.phases-outro', {
        opacity: 0, y: 28, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-phases__outro', start: 'top 85%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="m-section" id="services">
      <div className="m-section__head services-head">
        <h2 className="ds-display-lg">Everything you need, in order</h2>
        <p className="ds-body-md m-section__sub">
          Your journey in four phases — from landing safely to building a long-term life in Canada.
        </p>
      </div>

      <div className="m-phases">
        {PHASES.map((phase) => (
          <div key={phase.n} className={`m-phase m-phase--${phase.tone} phase-block`}>
            <div className="m-phase__head">
              <span className="m-phase__num">{phase.n}</span>
              <div className="m-phase__meta">
                <div className="m-phase__titlerow">
                  <h3 className="ds-title-lg">{phase.title}</h3>
                  <span className="m-phase__time">{phase.time}</span>
                </div>
                <p className="ds-body-sm m-phase__purpose">{phase.purpose}</p>
              </div>
            </div>
            <div className="m-services">
              {phase.services.map((s) => (
                <button key={s.title} className="sy-service" onClick={onStart}>
                  <div className="sy-service__icon" style={TONE_STYLES[phase.tone]}>
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
          </div>
        ))}
      </div>

      <div className="m-phases__outro phases-outro">
        <p className="ds-title-lg m-phases__anchor">
          We don&apos;t just help you land — we help you build your life in Canada.
        </p>
        <button className="sy-btn sy-btn--primary sy-btn--lg" style={{ gap: 10 }} onClick={onStart}>
          Get your personalized newcomer plan
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>
    </section>
  )
}
