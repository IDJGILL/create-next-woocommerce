import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function safeAsync<T>(promise: Promise<T>): Promise<[null, T] | [Error, null]> {
  try {
    const result = await promise

    return [null, result]
  } catch (error) {
    return [error as Error, null]
  }
}
