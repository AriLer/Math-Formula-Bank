import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const isServer = typeof window === 'undefined'

export const getLength = (item) => {
  if (item === null || item === undefined || item === '') {
    return null
  }
  if (typeof item === 'number' && isFinite(item)) {
    return Math.abs(item).toString().length
  }
  if (typeof item === 'object') {
    const nonEmpty = Object.values(item).filter(
      (value) => value !== null && value !== undefined && value !== ''
    )
    if (nonEmpty.length === 0) {
      return null
    }
    return Object.keys(item).length
  }

  return item.length ?? null
}

export function formatDate(d) {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const fuckTheBackend = (stupidBackendObject) => {
  const full_Name = `${stupidBackendObject.first_name} ${stupidBackendObject.last_name}`
  return full_Name
}

export function flattenErrors(obj) {
  if (!obj || typeof obj !== 'object') {
    return null
  }
  return Object.values(obj).flat()
}

export function formatToValueLabel(obj, options = {}) {
  const { value, label, icon } = options
  if (!obj) return null

  // Return early if required options are missing
  if (!value || !label) {
    throw new Error(
      "formatValueToSelectOptions: 'value' and 'label' options are required."
    )
  }

  // Handle array of objects
  if (Array.isArray(obj)) {
    return obj.map((item) => ({
      value: item[value],
      label: item[label],
      ...(icon && item[icon] && { icon: item[icon] }),
    }))
  }

  // Handle single object
  return {
    value: obj[value],
    label: obj[label],
    ...(icon && obj[icon] && { icon: obj[icon] }),
  }
}

export function getTooltipValue(value) {
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return value[0]?.label
    }

    return value
  }
}
// TODO: ensure backend is returning date object and not date string "January 1, 2024, 09:15"
export function getTimeDifference(date) {
  const now = new Date()
  const diff = Math.abs(now - date)
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  if (days > 0) {
    return `${days} ימים`
  } else if (hours > 0) {
    return `${hours} שעות`
  } else if (minutes > 0) {
    return 'מספר דקות'
  } else {
    return 'עכשיו'
  }
}

export function isStageLate(started_at, sla) {
  const startDate = started_at
  const endDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  const diffMs = Math.abs(endDate - startDate)
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const now = new Date()

  return hours > sla
}

export function getGreeting() {
  const now = new Date()
  const hour = parseInt(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Jerusalem',
    }).format(now)
  )
  if (hour > 5 && hour < 12) {
    return 'בוקר טוב'
  } else if (hour >= 12 && hour < 17) {
    return 'צהריים טובים'
  } else if (hour >= 17 && hour < 21) {
    return 'ערב טוב'
  } else {
    return 'לילה טוב'
  }
}

export function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export function downloadFile(file) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatTimeDuration(minutes) {
  if (!minutes || minutes === 0) {
    return '0 דקות'
  }

  const days = Math.floor(minutes / (24 * 60))
  const hours = Math.floor((minutes % (24 * 60)) / 60)
  const mins = minutes % 60

  let result = ''

  if (days > 0) {
    result += `${days} ימים`
  }

  if (hours > 0) {
    if (result) result += ' '
    result += `${hours} שעות`
  }

  if (mins > 0) {
    if (result) result += ' '
    result += `${mins} דקות`
  }

  return result || '0 דקות'
}
