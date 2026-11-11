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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
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
    mode: "onBlur",
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
          <FieldGroup>
            <Controller
              control={control}
              name="cardNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="cardNumber">Card information</FieldLabel>
                  <Input
                    {...field}
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    aria-invalid={fieldState.invalid || undefined}
                    aria-describedby={fieldState.invalid ? "cardNumber-error" : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="cardNumber-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <Controller
                control={control}
                name="expiryDate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || undefined}>
                    <FieldLabel htmlFor="expiryDate" className="sr-only">
                      Expiry date
                    </FieldLabel>
                    <Input
                      {...field}
                      id="expiryDate"
                      placeholder="MM / YY"
                      aria-invalid={fieldState.invalid || undefined}
                      aria-describedby={fieldState.invalid ? "expiryDate-error" : undefined}
                    />
                    {fieldState.invalid && (
                      <FieldError id="expiryDate-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="cvv"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || undefined}>
                    <FieldLabel htmlFor="cvv" className="sr-only">
                      CVV
                    </FieldLabel>
                    <Input
                      {...field}
                      id="cvv"
                      placeholder="CVV"
                      aria-invalid={fieldState.invalid || undefined}
                      aria-describedby={fieldState.invalid ? "cvv-error" : undefined}
                    />
                    {fieldState.invalid && (
                      <FieldError id="cvv-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              control={control}
              name="billingZip"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="billingZip" className="sr-only">
                    Billing zip code
                  </FieldLabel>
                  <Input
                    {...field}
                    id="billingZip"
                    placeholder="Billing zip code"
                    aria-invalid={fieldState.invalid || undefined}
                    aria-describedby={fieldState.invalid ? "billingZip-error" : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="billingZip-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

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
