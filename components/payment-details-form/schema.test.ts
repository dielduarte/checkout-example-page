import { describe, it, expect, vi } from "vitest"
import { paymentDetailsSchema } from "./schema"

const validData = {
  cardNumber: "4111111111111111",
  expiryDate: "12/25",
  cvv: "123",
  billingZip: "12345",
  acceptedPolicy: true,
}

/**
 * Helper: re-imports the schema module after setting NODE_ENV,
 * so `isDev` is re-evaluated with the correct value.
 */
async function importSchemaWithNodeEnv(nodeEnv: string) {
  const prev = process.env.NODE_ENV
  process.env.NODE_ENV = nodeEnv
  vi.resetModules()
  const mod = await import("./schema")
  process.env.NODE_ENV = prev
  return mod
}

describe("paymentDetailsSchema", () => {
  it("accepts valid data", () => {
    const result = paymentDetailsSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe("cardNumber", () => {
    it("rejects empty card number", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Card number is required")
    })

    it("rejects letters in card number", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "abcd1234efgh5678" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Card number must contain only digits")
    })

    it("rejects card number with fewer than 13 digits", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "411111111111" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Card number must be between 13 and 19 digits")
    })

    it("rejects card number with more than 19 digits", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "41111111111111111111" })
      expect(result.success).toBe(false)
    })

    it("rejects card number that fails Luhn check", async () => {
      const { paymentDetailsSchema: schema } = await importSchemaWithNodeEnv("test")
      const result = schema.safeParse({ ...validData, cardNumber: "4111111111111112" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Invalid card number")
    })

    it("bypasses Luhn check in development mode", async () => {
      const { paymentDetailsSchema: schema } = await importSchemaWithNodeEnv("development")
      const result = schema.safeParse({ ...validData, cardNumber: "4111111111111112" })
      expect(result.success).toBe(true)
    })

    it("accepts card number with spaces", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "4111 1111 1111 1111" })
      expect(result.success).toBe(true)
    })

    it("accepts card number with dashes", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cardNumber: "4111-1111-1111-1111" })
      expect(result.success).toBe(true)
    })
  })

  describe("expiryDate", () => {
    it("rejects empty expiry date", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, expiryDate: "" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Expiry date is required")
    })

    it("rejects expiry without slash (1225)", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, expiryDate: "1225" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Expiry date must be in MM/YY format")
    })

    it("accepts expiry with spaces (12 / 25)", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, expiryDate: "12 / 25" })
      expect(result.success).toBe(true)
    })

    it("accepts standard MM/YY format", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, expiryDate: "01/30" })
      expect(result.success).toBe(true)
    })
  })

  describe("cvv", () => {
    it("rejects empty CVV", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cvv: "" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("CVV is required")
    })

    it("accepts 3-digit CVV", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cvv: "123" })
      expect(result.success).toBe(true)
    })

    it("accepts 4-digit CVV (Amex)", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cvv: "1234" })
      expect(result.success).toBe(true)
    })

    it("rejects 2-digit CVV", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cvv: "12" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("CVV must be 3 or 4 digits")
    })

    it("rejects 5-digit CVV", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, cvv: "12345" })
      expect(result.success).toBe(false)
    })
  })

  describe("billingZip", () => {
    it("rejects empty billing zip", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, billingZip: "" })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("Billing zip code is required")
    })

    it("accepts 5-digit zip code", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, billingZip: "12345" })
      expect(result.success).toBe(true)
    })

    it("accepts ZIP+4 format", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, billingZip: "12345-6789" })
      expect(result.success).toBe(true)
    })

    it("rejects zip with fewer than 5 digits", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, billingZip: "1234" })
      expect(result.success).toBe(false)
    })

    it("rejects zip with letters", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, billingZip: "abcde" })
      expect(result.success).toBe(false)
    })
  })

  describe("acceptedPolicy", () => {
    it("rejects false", () => {
      const result = paymentDetailsSchema.safeParse({ ...validData, acceptedPolicy: false })
      expect(result.success).toBe(false)
      expect(result.error!.issues[0].message).toBe("You must accept the cancellation policy")
    })

    it("rejects missing (defaults to undefined)", () => {
      const { acceptedPolicy: _, ...rest } = validData
      const result = paymentDetailsSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })
  })
})
