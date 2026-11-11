import { describe, it, expect } from "vitest"
import { phoneMask } from "./masks"

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
