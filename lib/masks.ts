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

export const cardNumberMask = {
  removeFormatting: digitsOnly(19),
  format: (digits: string) => digits.replace(/(\d{4})(?=\d)/g, "$1 "),
}

export const expiryDateMask = {
  removeFormatting: digitsOnly(4),
  format: (digits: string) =>
    digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits,
}

export const cvvMask = {
  removeFormatting: digitsOnly(4),
  format: (digits: string) => digits,
}

export const zipCodeMask = {
  removeFormatting: digitsOnly(9),
  format: (digits: string) =>
    digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits,
}
