"use client"

import { useEffect } from "react"
import { BookingProvider, useBooking } from "@/contexts/booking-context"
import type { UserInfo, PaymentInfo } from "@/contexts/booking-context"
import { UserInfoStep } from "@/components/booking-steps/user-info-step"
import { PaymentInfoStep } from "@/components/booking-steps/payment-info-step"
import { SuccessStep } from "@/components/booking-steps/success-step"

function BookingFlow() {
  const { state, step, setUserInfo, setPaymentInfo, setStep } = useBooking()

  function handleUserSubmit(data: UserInfo) {
    setUserInfo(data)
    setStep("paymentinfo")
  }

  function handlePaymentSubmit(data: PaymentInfo) {
    setPaymentInfo(data)
    setStep("success")
  }

  useEffect(() => {
    if (step === "success") {
      console.log("Booking complete:", state)
    }
  }, [step, state])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-center md:text-left mb-6">Book appointment</h1>
      {step === "userinfo" && <UserInfoStep onSubmit={handleUserSubmit} />}
      {step === "paymentinfo" && <PaymentInfoStep onSubmit={handlePaymentSubmit} />}
      {step === "success" && <SuccessStep />}
    </main>
  )
}

export default function Home() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  )
}
