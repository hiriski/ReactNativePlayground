export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  const hourString = String(hours)?.length > 1 ? hours : `0${hours}`
  const minuteString = String(minutes)?.length > 1 ? minutes : `0${minutes}`
  const secondString = String(seconds)?.length > 1 ? seconds : `0${seconds}`

  if (hours > 0) {
    return `${hourString}:${minuteString}:${secondString}`
  } else {
    return `${minuteString}:${secondString}`
  }
}
