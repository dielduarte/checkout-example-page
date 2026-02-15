"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field"
import type { UserInfo } from "@/contexts/booking-context"
import {
  userDetailsSchema,
  type UserDetailsFormValues,
} from "./schema"

interface UserDetailsFormProps {
  className?: string
  onSubmit?: (data: UserInfo) => void
}

export function UserDetailsForm({ className, onSubmit }: UserDetailsFormProps) {
  const { control, handleSubmit } = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      visitReason: "",
    },
  })

  function onValid(data: UserDetailsFormValues) {
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="pb-20">
      <Card className={className}>
        <CardHeader>
          <CardTitle>Enter your details below</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id="fullName"
                    placeholder="Input text"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Input text"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="Input text"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="visitReason"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="visitReason">Visit reason</FieldLabel>
                  <Textarea {...field} id="visitReason" placeholder="Input text" />
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
        <div className="flex justify-end max-w-6xl mx-auto">
          <Button type="submit" variant="default">Continue</Button>
        </div>
      </div>
    </form>
  )
}
