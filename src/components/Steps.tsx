'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardList, Route, MessageCircle } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    Icon: ClipboardList,
    title: 'Tell us about your move',
    body: "Where you arrived from, your status, your city and what's stressing you most. Takes 2 minutes.",
  },
  {
    n: '02',
    Icon: Route,
    title: 'Get your 30-day plan',
    body: 'We build you a checklist in the right order — what to do first, and why it matters.',
  },
  {
    n: '03',
    Icon: MessageCircle,
    title: 'An advisor messages you',
    body: 'A real person reaches out on WhatsApp within hours and stays with you the whole way.',
  },
]

export default function Steps() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.steps-head', {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 82%' },
      })

      gsap.from('.step-card', {
        opacity: 0,
        y: 50,
        stagger: 0.13,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.m-steps__grid', start: 'top 80%' },
      })

      gsap.from('.step-icon', {
        scale: 0,
        opacity: 0,
        stagger: 0.13,
        duration: 0.55,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: '.m-steps__grid', start: 'top 80%' },
        delay: 0.25,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="m-steps" id="how">
      <div className="m-steps__inner">
        <div className="steps-head m-steps__head">
          <span className="ds-overline" style={{ color: 'var(--coral-600)' }}>How Settly works</span>
          <h2 className="ds-display-lg" style={{ marginTop: 12 }}>We&apos;ve got you, from day one</h2>
        </div>

        <div className="m-steps__grid">
          {STEPS.map((s) => (
            <div key={s.n} className="m-step step-card">
              <div className="m-step__icon step-icon">
                <s.Icon size={26} strokeWidth={1.8} />
              </div>
              <span className="m-step__n">{s.n}</span>
              <h3 className="ds-title-lg">{s.title}</h3>
              <p className="ds-body-md" style={{ color: 'var(--muted)', marginTop: 8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
