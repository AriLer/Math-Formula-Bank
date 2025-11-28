'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Error({ error, reset }) {
  useEffect(() => {
    toast.error(error.message, { id: 'error' })
  }, [error.message])
  return <div>500 - Internal Server Error</div>
}
