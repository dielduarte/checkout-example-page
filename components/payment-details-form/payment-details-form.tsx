"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { FieldSeparator, FieldError } from "@/components/ui/field"
import type { PaymentInfo } from "@/contexts/booking-context"
import {
  paymentDetailsSchema,
  type PaymentDetailsFormValues,
} from "./schema"

interface PaymentDetailsFormProps {
  className?: string
  onSubmit?: (data: PaymentInfo) => void
}

export function PaymentDetailsForm({ className, onSubmit }: PaymentDetailsFormProps) {
  const { control, handleSubmit } = useForm<PaymentDetailsFormValues>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingZip: "",
      acceptedPolicy: false,
    },
  })

  function onValid(data: PaymentDetailsFormValues) {
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Secure your appointment by card</CardTitle>
          <CardDescription>
            A credit or debit card is required to book your appointment.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-4">
            <Controller
              control={control}
              name="cardNumber"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label>Card information</Label>
                  <Input
                    {...field}
                    placeholder="1234 1234 1234 1234"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <Controller
                control={control}
                name="expiryDate"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="MM / YY"
                      aria-invalid={fieldState.invalid || undefined}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="cvv"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="CVV"
                      aria-invalid={fieldState.invalid || undefined}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              control={control}
              name="billingZip"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    placeholder="Billing zip code"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            control={control}
            name="acceptedPolicy"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="cancellation-policy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid || undefined}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />

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
