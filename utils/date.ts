import { format as dateFormat, parseISO } from 'date-fns'

export const convertToReadableDate = (dateString: string, format?: string): string => {
  const date = parseISO(dateString)
  return dateFormat(date, format || 'MMM d, yyyy')
}
