import React from 'react'
import './globals.css'

export const metadata = {
  title: 'מאגר הנוסחאות המתמטיות',
  description: 'חפש נוסחאות מתמטיות לפי שם, תוכן או תגיות',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
