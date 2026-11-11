function digitsOnly(maxLength: number) {
  return (value: string) => value.replace(/\D/g, "").slice(0, maxLength)
}

export const phoneMask = {
  removeFormatting: digitsOnly(10),
  format(digits: string) {
    if (!digits) return ""
    const area = digits.slice(0, 3)
    const prefix = digits.slice(3, 6)
    const line = digits.slice(6, 10)
    if (!prefix) return `(${area}`
    if (!line) return `(${area}) ${prefix}`
    return `(${area}) ${prefix}-${line}`
  },
}
