'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { value: 21,  label: 'days to settled, on average', prefix: '',  isDecimal: false },
  { value: 0,   label: 'to start — no card needed',   prefix: '$', isDecimal: false },
  { value: 4.9, label: 'average newcomer rating',      prefix: '',  isDecimal: true  },
]

export default function Stats() {
  const rootRef  = useRef<HTMLElement>(null)
  const numRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.stats-item', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })

      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el || stat.value === 0) return

        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = stat.prefix + (stat.isDecimal
              ? proxy.val.toFixed(1)
              : Math.round(proxy.val).toString())
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="m-stats">
      {STATS.map((stat, i) => (
        <div key={stat.label} style={{ display: 'contents' }}>
          {i > 0 && <div className="m-stats__div" />}
          <div className="m-stats__item stats-item">
            <span
              ref={(el) => { numRefs.current[i] = el }}
              className="ds-stat"
            >
              {stat.prefix}{stat.isDecimal ? stat.value.toFixed(1) : stat.value}
            </span>
            <span className="m-stats__lbl">{stat.label}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
