'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft, ArrowRight, X, Leaf, Check, Sparkles,
  GraduationCap, BadgeCheck, Briefcase, Compass,
  Home, Landmark, CreditCard, Smartphone, Cross, Car,
  MessageCircle, Mail, ShieldCheck, Phone, User, ChevronDown,
  Route, Search, ListOrdered, MapPin,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const STATUSES = [
  { id: 'student', Icon: GraduationCap, label: 'International student', blurb: 'Study permit holder' },
  { id: 'pr',      Icon: BadgeCheck,    label: 'New permanent resident', blurb: 'Landed immigrant / PR' },
  { id: 'work',    Icon: Briefcase,     label: 'Work-permit holder',     blurb: 'Open or closed work permit' },
  { id: 'other',   Icon: Compass,       label: 'Something else',         blurb: 'Visitor, refugee, family sponsorship…' },
]

const SERVICES = [
  { id: 'airport', Icon: BadgeCheck,  title: 'Get your SIN'        },
  { id: 'housing', Icon: Home,       title: 'Housing'             },
  { id: 'banking', Icon: Landmark,   title: 'Bank account'        },
  { id: 'credit',  Icon: CreditCard, title: 'Credit card'         },
  { id: 'sim',     Icon: Smartphone, title: 'SIM & phone plan'    },
  { id: 'docs',    Icon: BadgeCheck, title: 'SIN & documents'     },
  { id: 'health',  Icon: Cross,      title: 'Health card (OHIP)'  },
  { id: 'license', Icon: Car,        title: "Driver's licence"    },
]

const ORIGINS = [
  'India', 'Philippines', 'Nigeria', 'Pakistan', 'China',
  'Brazil', 'United Kingdom', 'Iran', 'Sri Lanka', 'Somewhere else',
]

const CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill',
  'Oakville', 'Burlington', 'Milton', 'Pickering', 'Ajax', 'Whitby', 'Oshawa',
  'Newmarket', 'Aurora', 'Caledon', 'Halton Hills',
  'King', 'Georgina', 'Uxbridge', 'Scugog', 'Brock', 'Clarington', 'East Gwillimbury', 'Whitchurch-Stouffville',
  'Scarborough', 'North York', 'Etobicoke', 'East York', 'Somewhere else in the GTA',
]

const COUNTRY_CODES = [
  { code: '+1',   country: 'Canada'         },
  { code: '+91',  country: 'India'          },
  { code: '+63',  country: 'Philippines'    },
  { code: '+234', country: 'Nigeria'        },
  { code: '+92',  country: 'Pakistan'       },
  { code: '+86',  country: 'China'          },
  { code: '+55',  country: 'Brazil'         },
  { code: '+44',  country: 'United Kingdom' },
  { code: '+98',  country: 'Iran'           },
  { code: '+94',  country: 'Sri Lanka'      },
]

const STEP_META = [
  { eyebrow: 'Step 1 of 4', title: 'Tell us about your move',    sub: "Where you're coming from, and where you're landing."      },
  { eyebrow: 'Step 2 of 4', title: 'What can we help you with?', sub: 'Pick everything that applies — you can change this later.' },
  { eyebrow: 'Step 3 of 4', title: 'What brings you to Canada?', sub: 'This tailors every step of your plan.'                    },
  { eyebrow: 'Step 4 of 4', title: 'Where should we reach you?', sub: 'An advisor messages you here within a few hours.'         },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface Answers {
  status: string
  origin: string
  city: string
  arrival: string
  services: string[]
  name: string
  channel: 'whatsapp' | 'email'
  dial: string
  contact: string
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function FieldSelect({
  label, value, onChange, children,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
}) {
  return (
    <div className="sy-field">
      <span className="sy-field__label">{label}</span>
      <div className="sy-select-wrap">
        <select className="sy-input" value={value} onChange={onChange}>{children}</select>
        <ChevronDown size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

function FieldInput({
  label, hint, icon: Icon, ...props
}: {
  label: string
  hint?: string
  icon?: LucideIcon
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="sy-field">
      <span className="sy-field__label">{label}</span>
      <div className={`sy-input-wrap${Icon ? ' sy-input-wrap--icon' : ''}`}>
        {Icon && <Icon size={18} strokeWidth={1.8} />}
        <input className="sy-input" {...props} />
      </div>
      {hint && <span className="sy-field__hint">{hint}</span>}
    </div>
  )
}

function OptionCard({
  Icon, label, blurb, selected, onClick, multi = false,
}: {
  Icon: LucideIcon
  label: string
  blurb?: string
  selected: boolean
  onClick: () => void
  multi?: boolean
}) {
  return (
    <button type="button" className={`sy-opt${selected ? ' sy-opt--on' : ''}`} onClick={onClick}>
      <span className="sy-opt__icon"><Icon size={22} strokeWidth={1.8} /></span>
      <span className="sy-opt__text">
        <span className="sy-opt__label">{label}</span>
        {blurb && <span className="sy-opt__blurb">{blurb}</span>}
      </span>
      <span className={`sy-opt__mark${multi ? ' sy-opt__mark--sq' : ''}`}>
        <Check size={15} strokeWidth={2.5} />
      </span>
    </button>
  )
}

// ─── Step form ────────────────────────────────────────────────────────────────

const TOTAL = 4

function OnboardingForm({
  onComplete, onExit,
}: {
  onComplete: (a: Answers) => void
  onExit: () => void
}) {
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>({
    status: '', origin: '', city: '', arrival: '',
    services: [], name: '', channel: 'whatsapp', dial: '+91', contact: '',
  })
  const patch = (p: Partial<Answers>) => setA((prev) => ({ ...prev, ...p }))

  const toggleService = (id: string) =>
    patch({ services: a.services.includes(id) ? a.services.filter((s) => s !== id) : [...a.services, id] })

  const contactOk = a.channel === 'whatsapp'
    ? a.contact.replace(/\D/g, '').length === 10
    : /\S+@\S+\.\S+/.test(a.contact)

  const valid = [
    !!(a.city && a.origin),
    a.services.length > 0,
    !!a.status,
    a.name.trim().length > 1 && contactOk,
  ]

  const next = () => {
    if (!valid[step]) return
    if (step === TOTAL - 1) { onComplete(a); return }
    setStep((s) => s + 1)
  }
  const back = () => { if (step === 0) { onExit(); return } setStep((s) => s - 1) }

  const pct = Math.round((step / TOTAL) * 100)
  const meta = STEP_META[step]

  return (
    <div className="sy-flow">
      <header className="sy-flow__top">
        <div className="sy-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/settly-logo.svg" alt="Settly" height={30} />
          <span className="sy-locale"><Leaf size={14} strokeWidth={2} />Canada</span>
        </div>
        <div className="sy-flow__count">{step + 1} / {TOTAL}</div>
        <button className="sy-flow__close" onClick={onExit} aria-label="Close">
          <X size={18} strokeWidth={2} />
        </button>
      </header>

      <div className="sy-flow__bar">
        <div className="sy-flow__bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="sy-flow__body">
        <div className="sy-flow__card">
          <span className="ds-overline sy-flow__eyebrow">{meta.eyebrow}</span>
          <h1 className="ds-display-md sy-flow__title">{meta.title}</h1>
          <p className="ds-body-md sy-flow__sub">{meta.sub}</p>

          <div className="sy-flow__content">
            {step === 0 && (
              <div className="sy-fields">
                <FieldSelect label="From" value={a.origin} onChange={(e) => patch({ origin: e.target.value })}>
                  <option value="" disabled>Choose a country…</option>
                  {ORIGINS.map((o) => <option key={o} value={o}>{o}</option>)}
                </FieldSelect>

                <FieldSelect label="Arrival" value={a.city} onChange={(e) => patch({ city: e.target.value })}>
                  <option value="" disabled>Choose a city…</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </FieldSelect>

                <FieldInput label="Arrival date" type="date" value={a.arrival}
                  hint="Roughly is fine — it sets your deadlines."
                  onChange={(e) => patch({ arrival: e.target.value })} />
              </div>
            )}

            {step === 1 && (
              <div className="sy-opts">
                {SERVICES.map((s) => (
                  <OptionCard key={s.id} Icon={s.Icon} label={s.title} multi
                    selected={a.services.includes(s.id)}
                    onClick={() => toggleService(s.id)} />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="sy-opts">
                {STATUSES.map((s) => (
                  <OptionCard key={s.id} Icon={s.Icon} label={s.label} blurb={s.blurb}
                    selected={a.status === s.id}
                    onClick={() => patch({ status: s.id })} />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="sy-fields">
                <FieldInput label="Your first name" placeholder="e.g. Priya" value={a.name}
                  icon={User} onChange={(e) => patch({ name: e.target.value })} />

                <div className="sy-field">
                  <span className="sy-field__label">Best way to reach you</span>
                  <div className="sy-seg">
                    <button type="button"
                      className={`sy-seg__btn${a.channel === 'whatsapp' ? ' sy-seg__btn--on' : ''}`}
                      onClick={() => patch({ channel: 'whatsapp', contact: '' })}>
                      <MessageCircle size={18} strokeWidth={2} />WhatsApp
                    </button>
                    <button type="button"
                      className={`sy-seg__btn${a.channel === 'email' ? ' sy-seg__btn--on' : ''}`}
                      onClick={() => patch({ channel: 'email', contact: '' })}>
                      <Mail size={18} strokeWidth={2} />Email
                    </button>
                  </div>
                </div>

                {a.channel === 'whatsapp' ? (
                  <div className="sy-field">
                    <span className="sy-field__label">WhatsApp number</span>
                    <div className="sy-phone">
                      <div className="sy-select-wrap sy-phone__code">
                        <select className="sy-input" value={a.dial}
                          onChange={(e) => patch({ dial: e.target.value })} aria-label="Country code">
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code + c.country} value={c.code}>{c.country} ({c.code})</option>
                          ))}
                        </select>
                        <ChevronDown size={16} strokeWidth={2} />
                      </div>
                      <div className="sy-input-wrap sy-input-wrap--icon sy-phone__num">
                        <Phone size={18} strokeWidth={1.8} />
                        <input className="sy-input" type="tel" inputMode="numeric" maxLength={10}
                          placeholder="416 000 0000" value={a.contact}
                          onChange={(e) => patch({ contact: e.target.value.replace(/\D/g, '').slice(0, 10) })} />
                      </div>
                    </div>
                    <span className="sy-field__hint">Your 10-digit number, including area code.</span>
                  </div>
                ) : (
                  <FieldInput label="Email address" type="email" placeholder="you@email.com"
                    icon={Mail} value={a.contact}
                    onChange={(e) => patch({ contact: e.target.value })} />
                )}

                <div className="sy-reassure">
                  <ShieldCheck size={18} strokeWidth={2} />
                  <span>We never share your details. A human advisor — not a bot — replies first.</span>
                </div>
              </div>
            )}
          </div>

          <div className="sy-flow__actions">
            <button type="button" className="sy-btn sy-btn--secondary sy-btn--lg" onClick={back} style={{ gap: 8 }}>
              <ArrowLeft size={20} strokeWidth={2} />
              {step === 0 ? 'Home' : 'Back'}
            </button>
            <button type="button" className="sy-btn sy-btn--primary sy-btn--lg"
              onClick={next} disabled={!valid[step]} style={{ gap: 8 }}>
              {step === TOTAL - 1 ? 'Plan my arrival' : 'Continue'}
              {step === TOTAL - 1
                ? <Sparkles size={20} strokeWidth={2} />
                : <ArrowRight size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        <aside className="sy-flow__aside">
          <div className="sy-advisorcard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar-priya.svg" alt="Priya" width={56} height={56}
              style={{ borderRadius: '50%', border: '2px solid var(--coral-200)', flexShrink: 0 }} />
            <div>
              <div className="ds-title-md">Priya · your advisor</div>
              <div className="ds-caption" style={{ color: 'var(--teal-600)' }}>● Usually replies in minutes</div>
            </div>
          </div>
          <p className="ds-body-sm sy-aside__quote">
            &ldquo;I help newcomers in Brampton &amp; Toronto every day. Once you finish this,
            I&apos;ll message you personally and we&apos;ll knock it out together.&rdquo;
          </p>
          <div className="sy-aside__stat">
            <span className="ds-stat" style={{ fontSize: 40 }}>300+</span>
            <span className="ds-body-sm" style={{ color: 'var(--muted)' }}>newcomers settled by Priya&apos;s team</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── Building animation ───────────────────────────────────────────────────────

function BuildingScreen({ answers, onDone }: { answers: Answers; onDone: () => void }) {
  const city = answers.city && !answers.city.startsWith('Somewhere') ? answers.city : 'the GTA'
  const lines = [
    { Icon: Search,        text: 'Reading your answers' },
    { Icon: ListOrdered,   text: 'Putting your steps in the right order' },
    { Icon: MapPin,        text: `Tuning it for ${city}` },
    { Icon: MessageCircle, text: 'Looping in your advisor' },
  ]
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const timers = lines.map((_, i) => setTimeout(() => setShown(i + 1), 420 * (i + 1)))
    const end = setTimeout(onDone, 420 * lines.length + 650)
    return () => { timers.forEach(clearTimeout); clearTimeout(end) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="sy-building">
      <div className="sy-building__orb">
        <span className="sy-building__pulse" />
        <Route size={38} strokeWidth={2} />
      </div>
      <h2 className="ds-display-md" style={{ marginTop: 28 }}>Building your 30-day plan…</h2>
      <ul className="sy-building__list">
        {lines.map((l, i) => {
          const { Icon } = l
          return (
            <li key={i} className={`sy-building__line${i < shown ? ' sy-building__line--on' : ''}`}>
              <span className="sy-building__check">
                {i < shown
                  ? <Check size={16} strokeWidth={2.5} />
                  : <Icon size={16} strokeWidth={2} />}
              </span>
              {l.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Confirmation screen ──────────────────────────────────────────────────────

function DoneScreen({ answers, onHome }: { answers: Answers; onHome: () => void }) {
  const firstName = (answers.name || 'friend').trim().split(' ')[0]
  const channelLabel = answers.channel === 'email' ? 'email' : 'WhatsApp'
  const contact = answers.channel === 'email'
    ? (answers.contact || 'your inbox')
    : (answers.contact ? `${answers.dial} ${answers.contact}` : 'your phone')

  const waHref = 'https://wa.me/16474870919?text=' +
    encodeURIComponent(`Hi Settly, this is ${firstName}. I just submitted my details and would love to get started.`)

  return (
    <div className="sy-plan">
      <header className="sy-flow__top sy-plan__top">
        <div className="sy-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/settly-logo.svg" alt="Settly" height={30} />
          <span className="sy-locale"><Leaf size={14} strokeWidth={2} />Canada</span>
        </div>
        <button type="button" className="sy-btn sy-btn--secondary sy-btn--sm" onClick={onHome} style={{ gap: 8 }}>
          <Home size={16} strokeWidth={2} />Home
        </button>
      </header>

      <div className="sy-done">
        <div className="sy-done__card">
          <span className="sy-done__check"><Check size={38} strokeWidth={2.4} /></span>
          <h1 className="ds-display-lg sy-done__title">You&apos;re all set, {firstName}. 🎉</h1>
          <p className="ds-body-lg sy-done__lede">
            Thanks for sharing the details of your move. Someone from the Settly team
            will get in touch on <strong>{channelLabel}</strong> within a few hours
            at <strong>{contact}</strong>.
          </p>
          <p className="ds-body-md sy-done__sub">A real advisor — not a bot — takes it from here.</p>
        </div>

        <div className="sy-railcard sy-railcard--advisor">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar-priya.svg" alt="Priya" width={64} height={64}
            style={{ borderRadius: '50%', border: '2px solid var(--coral-200)' }} />
          <h3 className="ds-title-lg" style={{ marginTop: 12 }}>Stuck on anything?</h3>
          <p className="ds-body-sm" style={{ color: 'var(--muted)' }}>
            Priya has helped 300+ newcomers settle across the GTA. Message her any time.
          </p>
          <a className="sy-btn sy-btn--primary sy-btn--md sy-btn--block"
            href={waHref} target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 16, gap: 8 }}>
            <MessageCircle size={18} strokeWidth={2} />Message Priya
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Flow manager ─────────────────────────────────────────────────────────────

type FlowScreen = 'form' | 'building' | 'done'

export default function OnboardingFlow({ onClose }: { onClose: () => void }) {
  const [screen, setScreen] = useState<FlowScreen>('form')
  const [answers, setAnswers] = useState<Answers | null>(null)

  return (
    <>
      {screen === 'form' && (
        <OnboardingForm
          onComplete={(a) => { setAnswers(a); setScreen('building') }}
          onExit={onClose}
        />
      )}
      {screen === 'building' && answers && (
        <BuildingScreen answers={answers} onDone={() => setScreen('done')} />
      )}
      {screen === 'done' && answers && (
        <DoneScreen answers={answers} onHome={onClose} />
      )}
    </>
  )
}
