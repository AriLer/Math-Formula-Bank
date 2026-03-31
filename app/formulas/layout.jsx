'use client'

import { ChevronRight, Link } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation' // Usage: Page router
import { Button } from '@/components/ui/button'

export default function RootLayout({ children }) {
  const router = useRouter()

  const handleBack = () => {
    const hasHistory = window.history.length > 1

    const referrer = document.referrer
    const isInternal = referrer.includes(window.location.origin)

    let isSamePage = false

    if (referrer) {
      try {
        const refUrl = new URL(referrer)
        const currentUrl = window.location

        isSamePage =
          refUrl.pathname === currentUrl.pathname &&
          refUrl.search === currentUrl.search
      } catch {
        isSamePage = false
      }
    }

    if (hasHistory && isInternal && !isSamePage) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className="page-gradient min-h-screen p-3" dir="rtl">
      <Button
        variant="ghost"
        className="mb-1 pr-2 text-md"
        onClick={handleBack}
      >
        <ChevronRight className="p-0" />
        חזרה
      </Button>
      <div className="rounded-lg bg-card dark:bg-card text-foreground shadow-sm border border-[rgba(255,255,255,0.10)] shadow-[1px_4px_16px_0px_#fafafaf_inset] p-8">
        {children}
      </div>
    </div>
  )
}
