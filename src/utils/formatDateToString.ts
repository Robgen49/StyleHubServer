export const formatDateToString = (date: Date) => {
   return date.toLocaleDateString().split('.').sort((a, b) => b.length - a.length - 1).join('.')
}