'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Leaf, ChevronDown, LifeBuoy, MapPin } from 'lucide-react'

const GTA_REGIONS = [
  { region: 'City of Toronto', cities: ['Toronto', 'Etobicoke', 'North York', 'Scarborough', 'East York'] },
  { region: 'Peel',            cities: ['Mississauga', 'Brampton', 'Caledon'] },
  { region: 'York',            cities: ['Vaughan', 'Markham', 'Richmond Hill', 'Newmarket', 'Aurora', 'King', 'Georgina', 'East Gwillimbury', 'Whitchurch-Stouffville'] },
  { region: 'Durham',          cities: ['Pickering', 'Ajax', 'Whitby', 'Oshawa', 'Clarington', 'Uxbridge', 'Scugog', 'Brock'] },
  { region: 'Halton',          cities: ['Oakville', 'Burlington', 'Milton', 'Halton Hills'] },
]

function WhereWeServe() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="sy-navdd"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`m-nav__link sy-navdd__trigger ${open ? 'sy-navdd__trigger--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Where we serve
        <ChevronDown size={16} strokeWidth={2} />
      </button>

      {open && (
        <div className="sy-navdd__panel">
          <div className="sy-navdd__head">
            <span className="ds-overline" style={{ color: 'var(--coral-600)' }}>
              Now serving the GTA
            </span>
            <span className="ds-body-sm" style={{ color: 'var(--muted)' }}>
              25 municipalities across five regions — and growing.
            </span>
          </div>
          <div className="sy-navdd__grid">
            {GTA_REGIONS.map((r) => (
              <div className="sy-navdd__col" key={r.region}>
                <span className="sy-navdd__region">{r.region}</span>
                {r.cities.map((c) => (
                  <a
                    key={c}
                    href={`https://wa.me/16474870919?text=${encodeURIComponent(`Hi Immiefy, I'm in ${c} and would like help settling in.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sy-navdd__city"
                  >{c}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="sy-navdd__foot">
            <MapPin size={16} strokeWidth={2} color="var(--coral-500)" />
            Not seeing your city? Message us — we add new areas every month.
          </div>
        </div>
      )}
    </div>
  )
}

export default function Nav({ onStart }: { onStart: () => void }) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -90,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
      })
    })

    const onScroll = () => {
      if (!navRef.current) return
      navRef.current.classList.toggle('nav--scrolled', window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header ref={navRef} className="m-nav">
      <div className="m-nav__inner">
        <div className="sy-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/immiefy-logo.svg" alt="Immiefy" height={32} />
          <span className="sy-locale">
            <Leaf size={14} strokeWidth={2} />
            Canada
          </span>
        </div>

        <nav className="m-nav__links" aria-label="Main">
          <a href="#services" className="m-nav__link" onClick={(e) => { e.preventDefault(); onStart() }}>Housing</a>
          <a href="#services" className="m-nav__link" onClick={(e) => { e.preventDefault(); onStart() }}>Banking</a>
          <a href="#services" className="m-nav__link" onClick={(e) => { e.preventDefault(); onStart() }}>Jobs</a>
          <a href="#services" className="m-nav__link" onClick={(e) => { e.preventDefault(); onStart() }}>Immigration</a>
          <WhereWeServe />
        </nav>

        <div className="m-nav__right">
          <a
            className="sy-btn sy-btn--primary sy-btn--sm"
            href="https://wa.me/16474870919?text=Hi%20Immiefy%2C%20I%20need%20urgent%20help%20settling%20in."
            target="_blank"
            rel="noopener noreferrer"
            style={{ gap: 8 }}
          >
            <LifeBuoy size={16} strokeWidth={2} />
            Need urgent help?
          </a>
        </div>
      </div>
    </header>
  )
}
