import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// color to int
export const parseColor = (color: string) => {
  const hex = color.startsWith("#") ? color.slice(1) : color
  return parseInt(hex, 16)
}