import { describe, it, expect } from "vitest"
import { isValidLuhn } from "./luhn"

describe("isValidLuhn", () => {
  describe("valid card numbers", () => {
    it("accepts Visa test number 4111111111111111", () => {
      expect(isValidLuhn("4111111111111111")).toBe(true)
    })

    it("accepts Mastercard test number 5500000000000004", () => {
      expect(isValidLuhn("5500000000000004")).toBe(true)
    })

    it("accepts Amex test number 378282246310005", () => {
      expect(isValidLuhn("378282246310005")).toBe(true)
    })
  })

  describe("formatting tolerance", () => {
    it("accepts card number with spaces", () => {
      expect(isValidLuhn("4111 1111 1111 1111")).toBe(true)
    })

    it("accepts card number with dashes", () => {
      expect(isValidLuhn("4111-1111-1111-1111")).toBe(true)
    })

    it("accepts card number with mixed spaces and dashes", () => {
      expect(isValidLuhn("4111 1111-1111 1111")).toBe(true)
    })
  })

  describe("invalid inputs", () => {
    it("rejects invalid checksum (4111111111111112)", () => {
      expect(isValidLuhn("4111111111111112")).toBe(false)
    })

    it("rejects non-numeric input", () => {
      expect(isValidLuhn("abcd1234efgh5678")).toBe(false)
    })

    it("rejects empty string", () => {
      expect(isValidLuhn("")).toBe(false)
    })

    it("accepts single digit 0", () => {
      expect(isValidLuhn("0")).toBe(true)
    })

    it("rejects letters mixed with spaces", () => {
      expect(isValidLuhn("41xx 1111 1111 1111")).toBe(false)
    })

    it("rejects purely whitespace", () => {
      expect(isValidLuhn("    ")).toBe(false)
    })
  })
})
