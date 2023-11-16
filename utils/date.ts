import { format as dateFormat, parseISO, differenceInDays } from 'date-fns'

export const convertToReadableDate = (dateString: string, format?: string): string => {
  const date = parseISO(dateString)
  return dateFormat(date, format || 'MMM d, yyyy')
}

export const calculateDaysToGo = (dateString: string): number => {
  const futureDate = parseISO(dateString)
  const currentDate = new Date()

  const diffDays = differenceInDays(futureDate, currentDate)
  return diffDays
}
