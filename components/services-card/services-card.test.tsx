import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServicesCard } from "./services-card"

describe("ServicesCard", () => {
  it("lists every service with its duration and price", () => {
    render(
      <ServicesCard
        services={[
          { name: "Botox", duration: "45 mins", price: "$200" },
          { name: "Facial", duration: "30 mins", price: "$90" },
        ]}
      />
    )

    expect(screen.getByText("Services")).toBeInTheDocument()
    expect(screen.getByText("Botox")).toBeInTheDocument()
    expect(screen.getByText("45 mins · $200")).toBeInTheDocument()
    expect(screen.getByText("Facial")).toBeInTheDocument()
    expect(screen.getByText("30 mins · $90")).toBeInTheDocument()
  })
})
