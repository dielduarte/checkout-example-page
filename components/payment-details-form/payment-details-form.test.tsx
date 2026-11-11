import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PaymentDetailsForm } from "./payment-details-form"

describe("PaymentDetailsForm", () => {
  it("renders title, description, and Book appointment button", () => {
    render(<PaymentDetailsForm />)

    expect(screen.getByText("Secure your appointment by card")).toBeInTheDocument()
    expect(
      screen.getByText("A credit or debit card is required to book your appointment.")
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Book appointment" })).toBeInTheDocument()
  })

  it("lets browsers autofill payment fields", () => {
    render(<PaymentDetailsForm />)

    expect(screen.getByLabelText("Card information")).toHaveAttribute("autocomplete", "cc-number")
    expect(screen.getByLabelText("Expiry date")).toHaveAttribute("autocomplete", "cc-exp")
    expect(screen.getByLabelText("CVV")).toHaveAttribute("autocomplete", "cc-csc")
    expect(screen.getByLabelText("Billing zip code")).toHaveAttribute("autocomplete", "postal-code")
  })

  it("shows a numeric keyboard for digit-only payment fields", () => {
    render(<PaymentDetailsForm />)

    for (const label of ["Card information", "CVV", "Billing zip code"]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("inputmode", "numeric")
    }
  })

  it("shows all required errors on empty submit", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Card number is required")).toBeInTheDocument()
      expect(screen.getByText("Expiry date is required")).toBeInTheDocument()
      expect(screen.getByText("CVV is required")).toBeInTheDocument()
      expect(screen.getByText("Billing zip code is required")).toBeInTheDocument()
      expect(screen.getByText("You must accept the cancellation policy")).toBeInTheDocument()
    })
  })

  it("shows format errors for invalid inputs", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.type(screen.getByLabelText("Card information"), "123456")
    await user.type(screen.getByLabelText("Expiry date"), "1325")
    await user.type(screen.getByLabelText("CVV"), "12")
    await user.type(screen.getByLabelText("Billing zip code"), "123")
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Card number must be between 13 and 19 digits")).toBeInTheDocument()
      expect(screen.getByText("Expiry date must be in MM/YY format")).toBeInTheDocument()
      expect(screen.getByText("CVV must be 3 or 4 digits")).toBeInTheDocument()
      expect(
        screen.getByText("Zip code must be 5 digits or ZIP+4 (e.g. 12345 or 12345-6789)")
      ).toBeInTheDocument()
    })
  })

  it("sets aria-invalid on card number when invalid", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByLabelText("Card information")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    })
  })

  it("links each error message to its input as accessible description", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByLabelText("Card information")).toHaveAccessibleDescription(
        "Card number is required"
      )
      expect(screen.getByLabelText("Expiry date")).toHaveAccessibleDescription(
        "Expiry date is required"
      )
      expect(screen.getByLabelText("CVV")).toHaveAccessibleDescription("CVV is required")
      expect(screen.getByLabelText("Billing zip code")).toHaveAccessibleDescription(
        "Billing zip code is required"
      )
    })
  })

  it("toggles the cancellation policy checkbox when clicking its label", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByText(/please reschedule or cancel/i))

    expect(
      screen.getByRole("checkbox", { name: /please reschedule or cancel/i })
    ).toBeChecked()
  })

  it("links the cancellation policy error to the checkbox", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(
        "You must accept the cancellation policy"
      )
    })
  })

  it("calls onSubmit with correct data on valid submission", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PaymentDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Card information"), "4111111111111111")
    await user.type(screen.getByLabelText("Expiry date"), "12/25")
    await user.type(screen.getByLabelText("CVV"), "123")
    await user.type(screen.getByLabelText("Billing zip code"), "12345")
    await user.click(screen.getByRole("checkbox"))
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
        billingZip: "12345",
        acceptedPolicy: true,
      })
    })
  })

  it("does NOT call onSubmit when form is invalid", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PaymentDetailsForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Card number is required")).toBeInTheDocument()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("shows policy error when all fields valid but checkbox unchecked", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PaymentDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Card information"), "4111111111111111")
    await user.type(screen.getByLabelText("Expiry date"), "12/25")
    await user.type(screen.getByLabelText("CVV"), "123")
    await user.type(screen.getByLabelText("Billing zip code"), "12345")
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("You must accept the cancellation policy")).toBeInTheDocument()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("sets aria-invalid on all fields when submitting empty form", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByLabelText("Card information")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
      expect(screen.getByLabelText("Expiry date")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByLabelText("CVV")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByLabelText("Billing zip code")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    })
  })

  it("shows Luhn error for card that passes length but fails checksum", async () => {
    // Re-import component with NODE_ENV=test so Luhn validation is active
    const prev = process.env.NODE_ENV
    process.env.NODE_ENV = "test"
    vi.resetModules()
    const { PaymentDetailsForm: Form } = await import("./payment-details-form")
    process.env.NODE_ENV = prev

    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText("Card information"), "4111111111111112")
    await user.type(screen.getByLabelText("Expiry date"), "12/25")
    await user.type(screen.getByLabelText("CVV"), "123")
    await user.type(screen.getByLabelText("Billing zip code"), "12345")
    await user.click(screen.getByRole("checkbox"))
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Invalid card number")).toBeInTheDocument()
    })
  })

  it("accepts card number with spaces in the form", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PaymentDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Card information"), "4111 1111 1111 1111")
    await user.type(screen.getByLabelText("Expiry date"), "12/25")
    await user.type(screen.getByLabelText("CVV"), "123")
    await user.type(screen.getByLabelText("Billing zip code"), "12345")
    await user.click(screen.getByRole("checkbox"))
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ cardNumber: "4111 1111 1111 1111" })
      )
    })
  })

  it("rejects letters in card number field", async () => {
    const user = userEvent.setup()
    render(<PaymentDetailsForm />)

    await user.type(screen.getByLabelText("Card information"), "abcd1234efgh5678")
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Card number must contain only digits")).toBeInTheDocument()
    })
  })
})
