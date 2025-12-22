import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to merge class names
 * @param inputs - The class names to merge
 * @returns The merged class names
 * @example
 * cn('text-red-500', 'text-blue-500') // 'text-red-500 text-blue-500'
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
