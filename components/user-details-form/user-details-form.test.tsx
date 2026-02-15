import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserDetailsForm } from "./user-details-form"

describe("UserDetailsForm", () => {
  it("renders all field labels and the Continue button", () => {
    render(<UserDetailsForm />)

    expect(screen.getByText("Full Name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Phone")).toBeInTheDocument()
    expect(screen.getByText("Visit reason")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument()
  })

  it("shows required errors on empty submit", async () => {
    const user = userEvent.setup()
    render(<UserDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument()
      expect(screen.getByText("Email is required")).toBeInTheDocument()
      expect(screen.getByText("Phone number is required")).toBeInTheDocument()
    })

    expect(screen.queryByText(/visit reason/i)).not.toHaveTextContent("required")
  })

  it("shows email format error for invalid email", async () => {
    const user = userEvent.setup()
    const { container } = render(<UserDetailsForm />)

    await user.type(screen.getByLabelText("Email"), "notanemail")
    // Use fireEvent.submit to bypass native type="email" constraint validation
    // which blocks form submission in happy-dom for invalid email values
    fireEvent.submit(container.querySelector("form")!)

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument()
    })
  })

  it("shows phone format error for too-short phone", async () => {
    const user = userEvent.setup()
    render(<UserDetailsForm />)

    await user.type(screen.getByLabelText("Phone"), "12345")
    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(screen.getByText("Phone number must be 10 digits")).toBeInTheDocument()
    })
  })

  it("sets aria-invalid on invalid inputs after submit", async () => {
    const user = userEvent.setup()
    render(<UserDetailsForm />)

    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true")
      expect(screen.getByLabelText("Phone")).toHaveAttribute("aria-invalid", "true")
    })
  })

  it("calls onSubmit with correct data on valid submission", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<UserDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Full Name"), "John Doe")
    await user.type(screen.getByLabelText("Email"), "john@example.com")
    await user.type(screen.getByLabelText("Phone"), "1234567890")
    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        visitReason: "",
      })
    })
  })

  it("includes visitReason in callback when provided", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<UserDetailsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Full Name"), "John Doe")
    await user.type(screen.getByLabelText("Email"), "john@example.com")
    await user.type(screen.getByLabelText("Phone"), "1234567890")
    await user.type(screen.getByLabelText("Visit reason"), "Annual checkup")
    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ visitReason: "Annual checkup" })
      )
    })
  })

  it("does NOT call onSubmit when form is invalid", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<UserDetailsForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
