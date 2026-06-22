import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Immiefy Canada — newcomer onboarding',
  description:
    'Housing, banking, your SIN, a phone plan, getting around — Immiefy walks you through every step of arriving in Canada, in the right order.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${plusJakarta.className}`}>
      <body>{children}</body>
    </html>
  )
}
