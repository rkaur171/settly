'use client'

import { useState } from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Services from './Services'
import Steps from './Steps'
import Stats from './Stats'
import CTA from './CTA'
import Footer from './Footer'
import WhatsAppFab from './WhatsAppFab'
import OnboardingFlow from './OnboardingFlow'

export default function HomeClient() {
  const [flowOpen, setFlowOpen] = useState(false)
  const open = () => setFlowOpen(true)
  const close = () => setFlowOpen(false)

  return (
    <>
      {flowOpen ? (
        <OnboardingFlow onClose={close} />
      ) : (
        <div className="m-page sy-landing">
          <Nav onStart={open} />
          <main>
            <Hero onStart={open} />
            <Services onStart={open} />
            <Steps />
            <Stats />
            <CTA onStart={open} />
          </main>
          <Footer onStart={open} />
        </div>
      )}
      <WhatsAppFab />
    </>
  )
}
