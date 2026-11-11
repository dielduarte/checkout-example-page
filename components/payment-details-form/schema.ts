import { z } from "zod"

const isDev = process.env.NODE_ENV === "development"

const cardNumberFormat = z
  .string()
  .min(1, "Card number is required")
  .regex(/^\d{13,19}$/, "Card number must be between 13 and 19 digits")

// Luhn is skipped in development so any 13–19 digit number can be used locally.
const cardNumber = isDev
  ? cardNumberFormat
  : cardNumberFormat.pipe(z.creditCard("Invalid card number"))

export const paymentDetailsSchema = z.object({
  cardNumber,
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, { message: "Expiry date must be in MM/YY format", abort: true })
    .refine((val) => {
      const month = Number(val.slice(0, 2))
      return month >= 1 && month <= 12
    }, { message: "Invalid month", abort: true })
    .refine((val) => {
      const month = Number(val.slice(0, 2))
      const year = 2000 + Number(val.slice(3))
      const now = new Date()
      return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
    }, "Card has expired"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  billingZip: z
    .string()
    .min(1, "Billing zip code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Zip code must be 5 digits or ZIP+4 (e.g. 12345 or 12345-6789)"),
  acceptedPolicy: z
    .boolean()
    .refine((val) => val === true, "You must accept the cancellation policy"),
})

export type PaymentDetailsFormValues = z.infer<typeof paymentDetailsSchema>
