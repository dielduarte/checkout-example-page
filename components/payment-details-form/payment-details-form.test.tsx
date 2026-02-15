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

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "123456")
    await user.type(screen.getByPlaceholderText("MM / YY"), "1325")
    await user.type(screen.getByPlaceholderText("CVV"), "12")
    await user.type(screen.getByPlaceholderText("Billing zip code"), "123")
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
      expect(screen.getByPlaceholderText("1234 1234 1234 1234")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    })
  })

  it("calls onSubmit with correct data on valid submission", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PaymentDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4111111111111111")
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25")
    await user.type(screen.getByPlaceholderText("CVV"), "123")
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345")
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

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4111111111111111")
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25")
    await user.type(screen.getByPlaceholderText("CVV"), "123")
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345")
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
      expect(screen.getByPlaceholderText("1234 1234 1234 1234")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
      expect(screen.getByPlaceholderText("MM / YY")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByPlaceholderText("CVV")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByPlaceholderText("Billing zip code")).toHaveAttribute(
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

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4111111111111112")
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25")
    await user.type(screen.getByPlaceholderText("CVV"), "123")
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345")
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

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4111 1111 1111 1111")
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25")
    await user.type(screen.getByPlaceholderText("CVV"), "123")
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345")
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

    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "abcd1234efgh5678")
    await user.click(screen.getByRole("button", { name: "Book appointment" }))

    await waitFor(() => {
      expect(screen.getByText("Card number must contain only digits")).toBeInTheDocument()
    })
  })
})
