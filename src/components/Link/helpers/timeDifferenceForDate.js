import { timeDifference } from './timeDifference'

export const timeDifferenceForDate = (date) => {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()

  return timeDifference(now, updated)
}