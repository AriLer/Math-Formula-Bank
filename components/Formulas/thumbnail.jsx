import React from 'react'
import TeX from '@matejmazur/react-katex'
import { cn } from '@/lib/utils'

export default function thumbnail({ latex, className }) {
  return (
    <div
      style={{ direction: 'ltr' }}
      className={cn(
        'text-foreground ltr bg-background p-4 rounded-md overflow-x-auto text-center',
        className,
      )}
    >
      <TeX math={latex} />
    </div>
  )
}
