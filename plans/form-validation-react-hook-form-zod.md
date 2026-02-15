# Form Validation with react-hook-form + zod

## Main user prompt

```
Now let's work on form handling and validation, here is what we need:

We will use https://ui.shadcn.com/docs/forms/react-hook-form shadcn integration. So we need: 

- install react-hook form following the instructions
- install zod for validation
- install @hookform/resolvers for zod integration

form validation requirements:
    - [ ] User details form
        - [ ] Full name, string, required
        - [ ] Email, string, valid email, required
        - [ ] Phone, string, required
    - [ ] Payment form
        - [ ] Card information, valid card number, required, when not locally should validate with luhn algorithm.
        - [ ] Month/yeah, number only, mm/yy, required
        - [ ] Security number, number, 3 or 4 digits, required
        - [ ] Zip code, 6 numbers minimum required

General requirements:
    - show an error message when form is invalid using FieldError, use the shadcn field error state to update the input's state styles

```

# Form Validation with react-hook-form + zod

## Context

The booking flow has two forms (UserDetailsForm, PaymentDetailsForm) that currently submit data without validation. We need to add client-side validation using react-hook-form + zod, following the shadcn `Controller` + `Field`/`FieldError` pattern. The existing UI primitives already support error states (`aria-invalid` on inputs, `data-invalid` on `Field`, `FieldError` component).

---

## Step 1: Install dependencies

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Step 2: Create `lib/schemas/luhn.ts` (NEW)

Luhn algorithm utility for card number validation. Strips spaces/dashes, validates digit checksum.

---

## Step 3: Create `lib/schemas/user-details-schema.ts` (NEW)

```ts
import { z } from "zod"

export const userDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  visitReason: z.string().default(""),
})

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>
```

---

## Step 4: Create `lib/schemas/payment-details-schema.ts` (NEW)

```ts
import { z } from "zod"
import { isValidLuhn } from "./luhn"

const isDev = process.env.NODE_ENV === "development"

export const paymentDetailsSchema = z.object({
  cardNumber: z.string()
    .min(1, "Card number is required")
    .regex(/^[\d\s-]+$/, "Card number must contain only digits")
    .refine(val => { const d = val.replace(/[\s-]/g, ""); return d.length >= 13 && d.length <= 19 }, "Card number must be between 13 and 19 digits")
    .refine(val => isDev || isValidLuhn(val), "Invalid card number"),
  expiryDate: z.string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\s?\/\s?\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  billingZip: z.string()
    .min(1, "Billing zip code is required")
    .regex(/^\d{6,}$/, "Billing zip code must be at least 6 digits"),
  acceptedPolicy: z.boolean()
    .refine(val => val === true, "You must accept the cancellation policy"),
})

export type PaymentDetailsFormValues = z.infer<typeof paymentDetailsSchema>
```

---

## Step 5: Refactor `components/user-details-form/user-details-form.tsx` (MODIFY)

- Replace manual `FormData` handling with `useForm` + `zodResolver(userDetailsSchema)`
- `defaultValues`: `{ fullName: "", email: "", phone: "", visitReason: "" }`
- Wrap each input with `Controller` from react-hook-form
- Spread `field` props onto each `Input`/`Textarea`
- Set `aria-invalid={fieldState.invalid}` on inputs
- Set `data-invalid={fieldState.invalid}` on `Field` wrappers (triggers red label text)
- Render `<FieldError errors={[fieldState.error]} />` conditionally when `fieldState.invalid`
- `onSubmit` prop signature unchanged — `handleSubmit` receives validated data, calls `onSubmit?.(data)` directly (defaultValues guarantee all fields are strings, no coercion needed)

---

## Step 6: Refactor `components/payment-details-form/payment-details-form.tsx` (MODIFY)

- Replace `useState` for checkbox + manual `FormData` with `useForm` + `zodResolver(paymentDetailsSchema)`
- `defaultValues`: `{ cardNumber: "", expiryDate: "", cvv: "", billingZip: "", acceptedPolicy: false }`
- Wrap each input with `Controller`; checkbox uses `field.value` → `checked`, `field.onChange` → `onCheckedChange`
- Add `aria-invalid` on all inputs and checkbox
- Add `FieldError` for each field including checkbox (below the checkbox+label group)
- `onSubmit` prop signature unchanged — `handleSubmit` calls `onSubmit?.(data)` directly (defaultValues guarantee correct types)

---

## Key Files

| File | Action |
|------|--------|
| `lib/schemas/luhn.ts` | CREATE |
| `lib/schemas/user-details-schema.ts` | CREATE |
| `lib/schemas/payment-details-schema.ts` | CREATE |
| `components/user-details-form/user-details-form.tsx` | MODIFY |
| `components/payment-details-form/payment-details-form.tsx` | MODIFY |

No changes to: `contexts/booking-context.tsx`, `app/page.tsx`, step components, or UI primitives.

---

## Verification

1. `npx tsc --noEmit` — zero errors
2. `npx vitest --project storybook --run` — existing stories pass
3. Manual browser test:
   - User form: click Continue empty → fullName, email, phone show errors; visitReason does not
   - Enter invalid email → format error on blur
   - Payment form: click Book empty → all fields + checkbox show errors
   - Enter valid data + check checkbox → submits successfully, console logs state