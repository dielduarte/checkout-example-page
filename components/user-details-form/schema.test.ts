import { describe, it, expect } from "vitest"
import { userDetailsSchema } from "./schema"

const validData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  visitReason: "",
}

describe("userDetailsSchema", () => {
  it("accepts valid data", () => {
    const result = userDetailsSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it("rejects empty fullName", () => {
    const result = userDetailsSchema.safeParse({ ...validData, fullName: "" })
    expect(result.success).toBe(false)
    expect(result.error!.issues[0].message).toBe("Full name is required")
  })

  it("rejects empty email", () => {
    const result = userDetailsSchema.safeParse({ ...validData, email: "" })
    expect(result.success).toBe(false)
    expect(result.error!.issues[0].message).toBe("Email is required")
  })

  it("rejects invalid email format", () => {
    const result = userDetailsSchema.safeParse({ ...validData, email: "notanemail" })
    expect(result.success).toBe(false)
    expect(result.error!.issues[0].message).toBe("Please enter a valid email address")
  })

  it("rejects empty phone", () => {
    const result = userDetailsSchema.safeParse({ ...validData, phone: "" })
    expect(result.success).toBe(false)
    expect(result.error!.issues[0].message).toBe("Phone number is required")
  })

  it("rejects phone with fewer than 10 digits", () => {
    const result = userDetailsSchema.safeParse({ ...validData, phone: "123456789" })
    expect(result.success).toBe(false)
    expect(result.error!.issues[0].message).toBe("Phone number must be 10 digits")
  })

  it("rejects phone with more than 10 digits", () => {
    const result = userDetailsSchema.safeParse({ ...validData, phone: "12345678901" })
    expect(result.success).toBe(false)
  })

  it("rejects phone with dashes", () => {
    const result = userDetailsSchema.safeParse({ ...validData, phone: "123-456-7890" })
    expect(result.success).toBe(false)
  })

  it("rejects phone with non-digit characters", () => {
    const result = userDetailsSchema.safeParse({ ...validData, phone: "123456abc0" })
    expect(result.success).toBe(false)
  })

  it("accepts empty visitReason (optional)", () => {
    const result = userDetailsSchema.safeParse({ ...validData, visitReason: "" })
    expect(result.success).toBe(true)
  })
})
