"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FieldSeparator } from "@/components/ui/field"
import type { PaymentInfo } from "@/contexts/booking-context"

interface PaymentDetailsFormProps {
  className?: string
  onSubmit?: (data: PaymentInfo) => void
}

export function PaymentDetailsForm({ className, onSubmit }: PaymentDetailsFormProps) {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: PaymentInfo = {
      cardNumber: formData.get("cardNumber") as string,
      expiryDate: formData.get("expiryDate") as string,
      cvv: formData.get("cvv") as string,
      billingZip: formData.get("billingZip") as string,
      acceptedPolicy,
    }
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Secure your appointment by card</CardTitle>
          <CardDescription>
            A credit or debit card is required to book your appointment.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Card information</Label>
              <Input name="cardNumber" placeholder="1234 1234 1234 1234" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input name="expiryDate" placeholder="MM / YY" />
              <Input name="cvv" placeholder="CVV" />
            </div>
            <Input name="billingZip" placeholder="Billing zip code" />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="cancellation-policy"
              checked={acceptedPolicy}
              onCheckedChange={(checked) => setAcceptedPolicy(checked === true)}
            />
            <label
              htmlFor="cancellation-policy"
              className="text-sm leading-normal"
            >
              We ask that you please reschedule or cancel at least 24 hours before
              the beginning of your appointment or you may be charged a
              cancellation fee of $50. In the event of emergency, contact us
              directly. Your card will held in case of late cancellation and for
              future purchases. It will not be charged now.
            </label>
          </div>

          <FieldSeparator />

          <Button type="submit" variant="default" className="w-full">Book appointment</Button>

          <p className="text-muted-foreground text-xs text-center">
            By creating this appointment, you acknowledge you will receive
            automated transactional messages from this merchant.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
