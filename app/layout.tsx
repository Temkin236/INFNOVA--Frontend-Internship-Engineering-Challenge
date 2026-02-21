import './globals.css'
import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const metadata = {
  title: 'INFNOVA Academy',
  description: 'Course listing and details',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
