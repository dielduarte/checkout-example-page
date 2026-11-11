import { describe, it, expect } from "vitest"
import { cardNumberMask, cvvMask, expiryDateMask, phoneMask, zipCodeMask } from "./masks"

describe("phoneMask", () => {
  it.each([
    ["", ""],
    ["5", "(5"],
    ["555", "(555"],
    ["5551", "(555) 1"],
    ["555123", "(555) 123"],
    ["5551234", "(555) 123-4"],
    ["5551234567", "(555) 123-4567"],
  ])("formats %j as %j", (digits, formatted) => {
    expect(phoneMask.format(digits)).toBe(formatted)
  })

  it("keeps only the first 10 digits", () => {
    expect(phoneMask.removeFormatting("(555) 123-4567 89")).toBe("5551234567")
  })
})

describe("cardNumberMask", () => {
  it.each([
    ["", ""],
    ["4111", "4111"],
    ["41111", "4111 1"],
    ["4111111111111111", "4111 1111 1111 1111"],
    ["4111111111111111111", "4111 1111 1111 1111 111"],
  ])("formats %j as %j", (digits, formatted) => {
    expect(cardNumberMask.format(digits)).toBe(formatted)
  })

  it("keeps only the first 19 digits", () => {
    expect(cardNumberMask.removeFormatting("4111 1111 1111 1111 1111")).toBe("4111111111111111111")
  })
})

describe("expiryDateMask", () => {
  it.each([
    ["", ""],
    ["1", "1"],
    ["12", "12"],
    ["122", "12/2"],
    ["1229", "12/29"],
  ])("formats %j as %j", (digits, formatted) => {
    expect(expiryDateMask.format(digits)).toBe(formatted)
  })

  it("keeps only the first 4 digits", () => {
    expect(expiryDateMask.removeFormatting("12/2999")).toBe("1229")
  })
})

describe("cvvMask", () => {
  it("keeps only the first 4 digits", () => {
    expect(cvvMask.removeFormatting("12a345")).toBe("1234")
    expect(cvvMask.format("123")).toBe("123")
  })
})

describe("zipCodeMask", () => {
  it.each([
    ["", ""],
    ["12345", "12345"],
    ["123456", "12345-6"],
    ["123456789", "12345-6789"],
  ])("formats %j as %j", (digits, formatted) => {
    expect(zipCodeMask.format(digits)).toBe(formatted)
  })

  it("keeps only the first 9 digits", () => {
    expect(zipCodeMask.removeFormatting("12345-67890")).toBe("123456789")
  })
})
