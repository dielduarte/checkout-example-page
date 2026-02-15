"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

export interface UserInfo {
  fullName: string
  email: string
  phone: string
  visitReason: string
}

export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  billingZip: string
  acceptedPolicy: boolean
}

export interface BookingState {
  userInfo: UserInfo | null
  paymentInfo: PaymentInfo | null
}

export type StepType = "userinfo" | "paymentinfo" | "success"

interface BookingContextValue {
  state: BookingState
  step: StepType
  setUserInfo: (info: UserInfo) => void
  setPaymentInfo: (info: PaymentInfo) => void
  setStep: (step: StepType) => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({
    userInfo: null,
    paymentInfo: null,
  })
  const [step, setStep] = useState<StepType>("userinfo")

  const setUserInfo = useCallback((info: UserInfo) => {
    setState((prev) => ({ ...prev, userInfo: info }))
  }, [])

  const setPaymentInfo = useCallback((info: PaymentInfo) => {
    setState((prev) => ({ ...prev, paymentInfo: info }))
  }, [])

  const value = useMemo(
    () => ({ state, step, setUserInfo, setPaymentInfo, setStep }),
    [state, step, setUserInfo, setPaymentInfo]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
