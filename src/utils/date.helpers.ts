export const formatDate = (date: Date) => {
  const today = new Date()
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return 'Today'
  } else {
    const day = date.getDate()
    let suffix
    if (day > 3 && day < 21) suffix = 'th'
    else {
      switch (day % 10) {
        case 1:
          suffix = 'st'
          break
        case 2:
          suffix = 'nd'
          break
        case 3:
          suffix = 'rd'
          break
        default:
          suffix = 'th'
          break
      }
    }
    const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    return `${formattedMonth} ${day}${suffix}, ${date.getFullYear()}`
  }
}
