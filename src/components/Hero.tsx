'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, PlayCircle, Check,
  Plane, Home, Landmark, CreditCard, Smartphone, BadgeCheck, Cross, Car,
} from 'lucide-react'

const DEMO_STEPS = [
  { Icon: Plane,      tone: 'coral', title: 'Airport pickup',          meta: 'Day 1'   },
  { Icon: Home,       tone: 'blue',  title: 'Find your home',          meta: 'Week 1'  },
  { Icon: Landmark,   tone: 'teal',  title: 'Open a bank account',     meta: 'Week 1'  },
  { Icon: CreditCard, tone: 'coral', title: 'Get a credit card',       meta: 'Week 1'  },
  { Icon: Smartphone, tone: 'amber', title: 'Get a phone number',      meta: 'Week 1'  },
  { Icon: BadgeCheck, tone: 'teal',  title: 'Apply for your SIN',      meta: 'Week 1'  },
  { Icon: Car,        tone: 'coral', title: "Apply for driver's licence", meta: 'Week 2' },
  { Icon: Cross,      tone: 'blue',  title: 'Get your health card',    meta: 'Week 2'  },
] as const

type Tone = 'coral' | 'teal' | 'amber' | 'blue'

const TONES: Record<Tone, { bg: string; fg: string; ring: string }> = {
  coral: { bg: 'var(--coral-50)',  fg: 'var(--coral-600)',  ring: 'var(--coral-500)' },
  teal:  { bg: 'var(--teal-50)',   fg: 'var(--teal-600)',   ring: 'var(--teal-500)'  },
  amber: { bg: 'var(--amber-50)',  fg: 'var(--amber-600)',  ring: 'var(--amber-500)' },
  blue:  { bg: '#E8F0FC',          fg: 'var(--blue-600)',   ring: 'var(--blue-500)'  },
}

function HeroDemo() {
  const N = DEMO_STEPS.length
  const [active, setActive] = useState(0)

  useEffect(() => {
    const hold = active >= N ? 1600 : 1300
    const id = setTimeout(() => setActive((a) => (a >= N ? 0 : a + 1)), hold)
    return () => clearTimeout(id)
  }, [active, N])

  const settled = active >= N
  const done    = Math.min(active, N)
  const pct     = Math.round((done / N) * 100)

  return (
    <div className="sy-demo-wrap">
      <div className="sy-demo">
        <div className="sy-demo__top">
          <span className="sy-demo__brand">
            <span className="sy-demo__dot" />
            Your Settly plan
          </span>
          <span className="sy-demo__pct">{pct}%</span>
        </div>
        <div className="sy-demo__bar">
          <div className="sy-demo__fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="sy-demo__steps">
          {DEMO_STEPS.map((s, i) => {
            const isDone   = i < active
            const isActive = i === active && !settled
            const t        = TONES[s.tone as Tone]
            const { Icon } = s
            return (
              <div
                key={s.title}
                className={`sy-demo__row${isDone ? ' sy-demo__row--done' : ''}${isActive ? ' sy-demo__row--active' : ''}`}
              >
                <span
                  className="sy-demo__tile"
                  style={{
                    background: isDone ? 'var(--teal-50)'  : t.bg,
                    color:      isDone ? 'var(--teal-600)' : t.fg,
                    boxShadow:  isActive ? `0 0 0 2px ${t.ring}` : 'none',
                  }}
                >
                  {isDone
                    ? <Check size={20} strokeWidth={2.5} />
                    : <Icon size={20} strokeWidth={2} />
                  }
                </span>
                <span className="sy-demo__label">{s.title}</span>
                {isActive ? (
                  <span className="sy-demo__work">
                    <span className="sy-demo__spin" />
                    doing this
                  </span>
                ) : isDone ? (
                  <span className="sy-demo__meta sy-demo__meta--done">
                    <Check size={13} strokeWidth={2.5} />
                    done
                  </span>
                ) : (
                  <span className="sy-demo__meta">{s.meta}</span>
                )}
              </div>
            )
          })}
        </div>

        <div className={`sy-demo__foot${settled ? ' sy-demo__foot--win' : ''}`}>
          {settled ? (
            <>
              <span className="sy-demo__win-emoji">🎉</span>
              <span>You&apos;re all settled — welcome to Canada!</span>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-nadia.svg"
                alt="Nadia"
                width={28}
                height={28}
                style={{ borderRadius: '50%', flexShrink: 0 }}
              />
              <span><strong>Nadia</strong> is helping you on WhatsApp</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Hero({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, x: -24, duration: 0.6 }, 0.15)
        .from('.hero-line',    { y: '105%', duration: 0.85, stagger: 0.12 }, 0.3)
        .from('.hero-sub',     { opacity: 0, y: 22, duration: 0.6 }, 0.7)
        .from('.hero-cta',     { opacity: 0, y: 16, duration: 0.55 }, 0.9)
        .from('.hero-trust',   { opacity: 0, y: 10, duration: 0.45 }, 1.05)
        .from('.hero-art',     { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.out' }, 0.2)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="m-hero">
      <div className="m-hero__copy">
        <span className="m-eyebrow hero-eyebrow">
          <span className="m-dot" />
          Your first year in Canada, simplified
        </span>

        <h1 className="ds-display-2xl m-hero__h1">
          <span className="hero-line-wrap"><span className="hero-line">New to Canada?</span></span>
          <span className="hero-line-wrap"><span className="hero-line">We&apos;ll help you settle in with confidence.</span></span>
        </h1>

        <p className="ds-body-lg m-hero__sub hero-sub">
          From immigration and airport pickup to housing, SIN, health card, banking, jobs,
          taxes, and community support — all in one place.
        </p>

        <div className="sy-hero__cta hero-cta">
          <button className="sy-btn sy-btn--primary sy-btn--lg" style={{ gap: 10 }} onClick={onStart}>
            Get started
            <ArrowRight size={20} strokeWidth={2} />
          </button>
          <a href="#how" className="sy-link-btn">
            <PlayCircle size={20} strokeWidth={1.8} />
            See how it works
          </a>
        </div>

        <a
          className="m-hero__trust hero-trust"
          href="https://wa.me/16474870919?text=Hi%20Settly%2C%20I%27d%20like%20to%20join%20the%20early%20access%20newcomer%20community."
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="m-stack">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="m-avatar"><img src="/avatar-a.svg" alt="newcomer" /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="m-avatar"><img src="/avatar-b.svg" alt="newcomer" /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="m-avatar"><img src="/avatar-c.svg" alt="newcomer" /></div>
          </div>
          <span className="ds-body-sm">
            <strong style={{ color: 'var(--ink)' }}>Join our early access newcomer community</strong>
          </span>
        </a>
      </div>

      <div className="m-hero__art hero-art">
        <HeroDemo />
      </div>
    </section>
  )
}
