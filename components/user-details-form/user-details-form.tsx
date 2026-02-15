"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"

interface UserDetailsFormProps {
  className?: string
}

export function UserDetailsForm({ className }: UserDetailsFormProps) {
  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Enter your details below</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input type="tel" placeholder="Input text" />
            </Field>
            <Field>
              <FieldLabel>Visit reason</FieldLabel>
              <Textarea placeholder="Input text" />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t px-6 py-4">
        <div className="flex justify-end max-w-md mx-auto">
          <Button variant="default">Continue</Button>
        </div>
      </div>
    </>
  )
}
