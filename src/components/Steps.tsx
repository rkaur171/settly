'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardList, Route, MessageCircle } from 'lucide-react'

type StepTone = 'blue' | 'teal' | 'amber'

const STEPS: {
  n: string; tone: StepTone; Icon: React.ElementType;
  title: string; purpose: string; points: string[];
}[] = [
  {
    n: '01', tone: 'blue', Icon: ClipboardList,
    title: 'Tell us about you',
    purpose: 'Create your newcomer profile',
    points: ["Where you're moving from", "When you're arriving", "Your visa status", "What you need help with"],
  },
  {
    n: '02', tone: 'teal', Icon: Route,
    title: 'Get your personalized Canada plan',
    purpose: 'Turn the chaos into a clear structure',
    points: ["Immigration guidance", "Arrival checklist", "Banking setup", "Housing guidance", "Job & settlement roadmap"],
  },
  {
    n: '03', tone: 'amber', Icon: MessageCircle,
    title: 'Get guided in Canada — on WhatsApp',
    purpose: 'Your ongoing support system',
    points: ["Help the moment you need it", "Intros to trusted partners", "Guidance on every next step"],
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
        <div className="steps-head m-section__head m-section__head--center">
          <span className="ds-overline" style={{ color: 'var(--coral-600)' }}>Your guided journey</span>
          <h2 className="ds-display-lg" style={{ marginTop: 12 }}>How we guide your first year in Canada</h2>
        </div>

        <div className="m-steps__grid">
          {STEPS.map((s) => (
            <div key={s.n} className={`m-step m-step--${s.tone} step-card`}>
              <div className="m-step__icon step-icon">
                <s.Icon size={26} strokeWidth={1.8} />
              </div>
              <span className="m-step__n">{s.n}</span>
              <h3 className="ds-title-lg">{s.title}</h3>
              <ul className="m-step__list">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p className="m-step__purpose">{s.purpose}</p>
            </div>
          ))}
        </div>

        <p className="ds-title-md m-steps__outro">
          From confusion to clarity — Immiefy guides every step of your new life in Canada.
        </p>
      </div>
    </section>
  )
}
