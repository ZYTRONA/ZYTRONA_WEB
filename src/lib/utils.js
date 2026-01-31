import { clsx } from 'class-variance-authority'

export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}
