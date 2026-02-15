"use client"

import { useEffect } from "react"
import { BookingProvider, useBooking } from "@/contexts/booking-context"
import type { UserInfo, PaymentInfo } from "@/contexts/booking-context"
import { StepOne } from "@/components/booking-steps/step-one"
import { StepTwo } from "@/components/booking-steps/step-two"
import { StepThree } from "@/components/booking-steps/step-three"

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
    <main className="mx-auto max-w-4xl px-4 py-8">
      {step === "userinfo" && <StepOne onSubmit={handleUserSubmit} />}
      {step === "paymentinfo" && <StepTwo onSubmit={handlePaymentSubmit} />}
      {step === "success" && <StepThree />}
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
