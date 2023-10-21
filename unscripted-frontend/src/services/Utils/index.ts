export function trim(inputString: string, length: number): string {
  return inputString.substring(0, length) + "..."
}

export function timeSince(input: Date): string {
  const inputDate = new Date(input)
  const now = new Date()
  const diffMilliseconds = now.getTime() - inputDate.getTime()

  const seconds = Math.floor((diffMilliseconds / 1000) % 60)
  const minutes = Math.floor((diffMilliseconds / 1000 / 60) % 60)
  const hours = Math.floor((diffMilliseconds / (1000 * 60 * 60)) % 24)
  const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24))

  if (days > 0) {
    return days + " day" + (days === 1 ? "" : "s")
  }
  if (hours > 0) {
    return hours + " hour" + (hours === 1 ? "" : "s")
  }
  if (minutes > 0) {
    return minutes + " minute" + (minutes === 1 ? "" : "s")
  }
  return seconds + " second" + (seconds === 1 ? "" : "s")
}
