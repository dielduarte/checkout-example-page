import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { BookingProvider, useBooking } from "./booking-context"
import type { ReactNode } from "react"

function wrapper({ children }: { children: ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>
}

describe("useBooking", () => {
  it("throws when used outside BookingProvider", () => {
    expect(() => {
      renderHook(() => useBooking())
    }).toThrow("useBooking must be used within a BookingProvider")
  })

  it("has correct initial state", () => {
    const { result } = renderHook(() => useBooking(), { wrapper })

    expect(result.current.state).toEqual({ userInfo: null, paymentInfo: null })
    expect(result.current.step).toBe("userinfo")
  })

  it("updates userInfo via setUserInfo", () => {
    const { result } = renderHook(() => useBooking(), { wrapper })
    const userInfo = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      visitReason: "Checkup",
    }

    act(() => {
      result.current.setUserInfo(userInfo)
    })

    expect(result.current.state.userInfo).toEqual(userInfo)
  })

  it("updates paymentInfo via setPaymentInfo", () => {
    const { result } = renderHook(() => useBooking(), { wrapper })
    const paymentInfo = {
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "123",
      billingZip: "12345",
      acceptedPolicy: true,
    }

    act(() => {
      result.current.setPaymentInfo(paymentInfo)
    })

    expect(result.current.state.paymentInfo).toEqual(paymentInfo)
  })

  it("updates step via setStep", () => {
    const { result } = renderHook(() => useBooking(), { wrapper })

    act(() => {
      result.current.setStep("paymentinfo")
    })

    expect(result.current.step).toBe("paymentinfo")
  })

  it("preserves userInfo when setting paymentInfo", () => {
    const { result } = renderHook(() => useBooking(), { wrapper })
    const userInfo = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      visitReason: "",
    }
    const paymentInfo = {
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "123",
      billingZip: "12345",
      acceptedPolicy: true,
    }

    act(() => {
      result.current.setUserInfo(userInfo)
    })

    act(() => {
      result.current.setPaymentInfo(paymentInfo)
    })

    expect(result.current.state.userInfo).toEqual(userInfo)
    expect(result.current.state.paymentInfo).toEqual(paymentInfo)
  })
})
