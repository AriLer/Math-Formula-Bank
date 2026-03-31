import React from 'react'
import './globals.css'
import Footer from '@/components/ui/Footer'
import 'katex/dist/katex.min.css'

export const metadata = {
  title: 'מאגר הנוסחאות המתמטיות',
  description: 'חפש נוסחאות מתמטיות לפי שם, תוכן או תגיות',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="h-full min-h-screen flex flex-col" dir="rtl">
        {children}
        <Footer />
      </body>
    </html>
  )
}
