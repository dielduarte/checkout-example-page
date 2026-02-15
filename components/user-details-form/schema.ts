import { z } from "zod"

export const userDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  visitReason: z.string(),
})

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>
