import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputsw) {
  return twMerge(clsx(inputs))
}
