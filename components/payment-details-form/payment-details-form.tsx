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
  FieldContent,
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
                    autoComplete="cc-number"
                    inputMode="numeric"
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
                      autoComplete="cc-exp"
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
                      autoComplete="cc-csc"
                      inputMode="numeric"
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
                    autoComplete="postal-code"
                    inputMode="numeric"
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
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid || undefined}
              >
                <Checkbox
                  id="cancellationPolicy"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={fieldState.invalid || undefined}
                  aria-describedby={
                    fieldState.invalid ? "cancellationPolicy-error" : undefined
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor="cancellationPolicy" className="font-normal leading-normal">
                    We ask that you please reschedule or cancel at least 24 hours before
                    the beginning of your appointment or you may be charged a
                    cancellation fee of $50. In the event of emergency, contact us
                    directly. Your card will held in case of late cancellation and for
                    future purchases. It will not be charged now.
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError id="cancellationPolicy-error" errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
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
