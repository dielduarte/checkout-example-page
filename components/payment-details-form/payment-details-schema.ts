import { z } from "zod"
import { isValidLuhn } from "./luhn"

const isDev = process.env.NODE_ENV === "development"

export const paymentDetailsSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s-]+$/, "Card number must contain only digits")
    .refine(
      (val) => {
        const d = val.replace(/[\s-]/g, "")
        return d.length >= 13 && d.length <= 19
      },
      "Card number must be between 13 and 19 digits"
    )
    .refine(
      (val) => isDev || isValidLuhn(val),
      "Invalid card number"
    ),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\s?\/\s?\d{2}$/, "Expiry date must be in MM/YY format"),
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
