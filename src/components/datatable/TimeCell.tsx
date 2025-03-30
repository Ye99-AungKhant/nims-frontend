import {formatDate, formatTime} from '@/utils/dayjs'

export function DateCell(date: string) {
  return date ? formatDate(date) : ''
}

export function TimeCell(time: string) {
  return time ? formatTime(time) : ''
}
