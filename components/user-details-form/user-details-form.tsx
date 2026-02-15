"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import type { UserInfo } from "@/contexts/booking-context"

interface UserDetailsFormProps {
  className?: string
  onSubmit?: (data: UserInfo) => void
}

export function UserDetailsForm({ className, onSubmit }: UserDetailsFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: UserInfo = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      visitReason: formData.get("visitReason") as string,
    }
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Enter your details below</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input name="fullName" placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input name="email" type="email" placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input name="phone" type="tel" placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Visit reason</FieldLabel>
              <Textarea name="visitReason" placeholder="Input text" />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t px-6 py-4">
        <div className="flex justify-end max-w-md mx-auto">
          <Button type="submit" variant="default">Continue</Button>
        </div>
      </div>
    </form>
  )
}
