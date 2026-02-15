"use client"

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

interface PaymentDetailsFormProps {
  className?: string
}

export function PaymentDetailsForm({ className }: PaymentDetailsFormProps) {
  return (
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
            <Input placeholder="1234 1234 1234 1234" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM / YY" />
            <Input placeholder="CVV" />
          </div>
          <Input placeholder="Billing zip code" />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="cancellation-policy" />
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

        <Button variant="default" className="w-full">Book appointment</Button>

        <p className="text-muted-foreground text-xs text-center">
          By creating this appointment, you acknowledge you will receive
          automated transactional messages from this merchant.
        </p>
      </CardContent>
    </Card>
  )
}
