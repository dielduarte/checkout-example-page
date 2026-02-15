# Booking Step Pages & Flow

## Main user prompt

```
Next step is to build booking step pages, we need 3 steps:
 - step 1: 
   - shows spa info card, services card, and user details form 
   - page a wrapper in this case is grid here with two columns, column 1 spa info + services card, column 2 user details form, when on mobile break the columns
 - step 2:
   - show spa info card, services card, and payment details form
   - page a wrapper in this cae is a grid here with two columns, column 1 spa info + services card, column 2 payment details form, when on mobile break the columns
 - step 3:
   - int this the page wrapper case is a flex column direction:
    - shows success message
    - shows spa info card
    - shows services card

components changes:
  - add to user info form a onSubmit callback prop, executed when clicked on continue button, do not add form or validation for now.
  - add to payment details form a onSubmit callback prop, executed when clicked on book appointment button, do not add form or validation for now.

general requirements:
  - let's create a react context to handle the booking flow and avoid state prop drilling, the state must be an object with the following keys:
    - user info, contains the user info form data, when on submit callback is executed, the state must be updated with the form data
    - payment info, contains the payment details form data, when on submit callback is executed, the state must be updated with the form data
    - step type (user infor, payment info, success)
    - once the user procees to step 3, log the state to the console
```

# Plan: Booking Step Pages & Flow

## Context

The 5 UI components (CompanyInfo, ServicesCard, UserDetailsForm, PaymentDetailsForm, SuccessMessage) are built. Now we need to wire them into a 3-step booking flow with shared state via React Context. Steps are managed client-side (no URL routing for steps).

---

## New Files

| File | Purpose |
|------|---------|
| `contexts/booking-context.tsx` | React context, provider, hook, types |
| `lib/booking-data.ts` | Hardcoded Gold Spa data constants |
| `components/booking-steps/step-one.tsx` | Step 1 layout |
| `components/booking-steps/step-two.tsx` | Step 2 layout |
| `components/booking-steps/step-three.tsx` | Step 3 layout |

## Modified Files

| File | Changes |
|------|---------|
| `components/user-details-form/user-details-form.tsx` | Add `<form>` wrapper, `name` attrs on inputs, `onSubmit` callback prop |
| `components/payment-details-form/payment-details-form.tsx` | Add `<form>` wrapper, `name` attrs on inputs, `onSubmit` callback prop, `useState` for checkbox |
| `app/page.tsx` | Add `"use client"`, BookingProvider, BookingFlow with step state |

---

## Step 1: `contexts/booking-context.tsx` (CREATE)

`"use client"` module. Defines types, context, provider, and hook.

**Types:**
```ts
export interface UserInfo {
  fullName: string
  email: string
  phone: string
  visitReason: string
}

export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  billingZip: string
  acceptedPolicy: boolean
}

export interface BookingState {
  userInfo: UserInfo | null
  paymentInfo: PaymentInfo | null
}
```

```ts
export type StepType = "userinfo" | "paymentinfo" | "success"
```

**Provider:** wraps children, holds `BookingState` + `step: StepType` (initial `"userinfo"`) with `useState`. Exposes `setUserInfo`, `setPaymentInfo`, `setStep` via `useCallback`. Values memoized with `useMemo`.

**Hook:** `useBooking()` — throws if used outside provider.

---

## Step 2: `lib/booking-data.ts` (CREATE)

Hardcoded constants extracted from story args:

```ts
export const companyData = {
  logoUrl: "/images/spa-logo.png",
  name: "Gold Spa",
  address: "2525 Camino del Rio S\nSuite 315 Room 8\nSan Diego, CA 92108",
  email: "goldspa@gmail.com",
  phone: "+1 123 4567 222",
} as const

export const servicesData = [
  { name: "Botox", duration: "45 mins", price: "$200" },
  { name: "Botox", duration: "45 mins", price: "$200" },
]

export const successData = {
  title: "Your appointment has been booked!",
  description: "A confirmation has been sent to your email address.",
} as const
```

---

## Step 3: Modify `components/user-details-form/user-details-form.tsx`

- Add `onSubmit?: (data: UserInfo) => void` prop
- Import `UserInfo` from `@/contexts/booking-context`
- Wrap `<Card>` + fixed footer inside a `<form>` element
- Add `name` attributes to inputs: `fullName`, `email`, `phone`, `visitReason`
- Change Continue button to `type="submit"`
- Add `handleSubmit`: `e.preventDefault()`, build `UserInfo` from `FormData`, call `onSubmit?.(data)`

---

## Step 4: Modify `components/payment-details-form/payment-details-form.tsx`

- Add `onSubmit?: (data: PaymentInfo) => void` prop
- Import `PaymentInfo` from `@/contexts/booking-context`
- Wrap `<Card>` inside a `<form>` element
- Add `name` attributes: `cardNumber`, `expiryDate`, `cvv`, `billingZip`
- Change "Book appointment" button to `type="submit"`
- Add `useState<boolean>(false)` for checkbox (Radix Checkbox doesn't work with native FormData)
- Pass `checked` and `onCheckedChange` to Checkbox
- Add `handleSubmit`: build `PaymentInfo` from `FormData` + checkbox state, call `onSubmit?.(data)`

---

## Step 5: Step Layout Components (CREATE)

### `components/booking-steps/step-one.tsx`
- Props: `onSubmit: (data: UserInfo) => void`
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Col 1: `CompanyInfo` + `ServicesCard` (stacked with `flex flex-col gap-6`)
- Col 2: `UserDetailsForm` with `onSubmit` passed through

### `components/booking-steps/step-two.tsx`
- Props: `onSubmit: (data: PaymentInfo) => void`
- Layout: same grid as step one
- Col 1: `CompanyInfo` + `ServicesCard`
- Col 2: `PaymentDetailsForm` with `onSubmit` passed through

### `components/booking-steps/step-three.tsx`
- No props needed
- Layout: `flex flex-col gap-6`
- Renders: `SuccessMessage`, `CompanyInfo`, `ServicesCard`

All step components import data from `@/lib/booking-data`.

---

## Step 6: Modify `app/page.tsx`

Add `"use client"`. Split into two pieces (because `useBooking()` must be inside `<BookingProvider>`):

**`Home` (default export):** renders `<BookingProvider><BookingFlow /></BookingProvider>`

**`BookingFlow` (local component):**
- `useBooking()` for `state`, `step`, `setUserInfo`, `setPaymentInfo`, `setStep`
- `handleUserSubmit`: calls `setUserInfo(data)`, then `setStep("paymentinfo")`
- `handlePaymentSubmit`: calls `setPaymentInfo(data)`, then `setStep("success")`
- `useEffect`: when `step === "success"`, logs `state` to console (ensures React batched updates are flushed)
- Wraps in `<main className="mx-auto max-w-4xl px-4 py-8">`
- Conditional rendering: `step === "userinfo" && <StepOne />`, `step === "paymentinfo" && <StepTwo />`, `step === "success" && <StepThree />`

---

## Implementation Order

1. `lib/booking-data.ts` (no dependencies)
2. `contexts/booking-context.tsx` (no dependencies)
3. Modify `user-details-form.tsx` (depends on types from #2)
4. Modify `payment-details-form.tsx` (depends on types from #2)
5. Create step layout components (depends on #3, #4)
6. Modify `app/page.tsx` (depends on everything above)
7. Verify

---

## Verification

1. `npx tsc --noEmit` — zero TypeScript errors
2. `npx vitest --project storybook --run` — existing stories still pass
3. `npm run dev` — open browser, verify:
   - Step 1: two-column grid with info cards + user form, responsive on mobile
   - Fill form, click Continue → moves to step 2
   - Step 2: same grid with payment form
   - Fill form, click Book → moves to step 3, console logs full state
   - Step 3: flex column with success message + info cards
