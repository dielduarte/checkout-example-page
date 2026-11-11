import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { CompanyInfo } from "./company-info"
import { companyData } from "@/lib/booking-data"

describe("CompanyInfo", () => {
  it("renders the company name as a heading", () => {
    render(<CompanyInfo {...companyData} />)

    expect(screen.getByRole("heading", { name: companyData.name })).toBeInTheDocument()
  })

  it("presents contact details as a description list", () => {
    render(<CompanyInfo {...companyData} />)

    const terms = screen.getAllByRole("term").map((term) => term.textContent)
    expect(terms).toEqual(["Address", "Email", "Phone"])

    const definitions = screen.getAllByRole("definition")
    expect(definitions[0]).toHaveTextContent("2525 Camino del Rio S")
    expect(within(definitions[1]).getByRole("link", { name: companyData.email })).toHaveAttribute(
      "href",
      `mailto:${companyData.email}`
    )
    expect(within(definitions[2]).getByRole("link", { name: companyData.phone })).toHaveAttribute(
      "href",
      `tel:${companyData.phone}`
    )
  })
})
