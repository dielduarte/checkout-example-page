import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SuccessMessage } from "./success-message"
import { successData } from "@/lib/booking-data"

describe("SuccessMessage", () => {
  it("renders the title and description", () => {
    render(<SuccessMessage {...successData} />)

    expect(screen.getByText(successData.title)).toBeInTheDocument()
    expect(screen.getByText(successData.description)).toBeInTheDocument()
  })
})
