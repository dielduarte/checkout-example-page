# Booking Page UI Components

## Main user prompt

```
We are gonna create a few cards UI to reuse across the project, using the components/ui from shadcn already installed in this project.

What we need, within components/ folder:

Component: CompanyInfo

Requestiments:
A card component, that receives props:

- spa logo url (string) (example of image is in public nextjs folder)
- Spa name (stirng)
- address (string)
- Email (string)
- phone (string)

for email and phone, make then a link button with proper uri for web interaction, tel: and mail:

Component: use details form
Requirements:

a form with inputs:
- full name (input)
- email (input)
- phone (input)
- visit reason (text area)
- do not handle masks and validation yet, nor submission
- in this case the button needs to be a floating footer card with a continue button (see image)


Component: Payment details form
Requirements:

- Form with inputs:
  - Card information (string)
  - month/yeah (string)
  - security code (string)
  - billing zip code (string)
  -checkbox with alert about rescheduling rules, see image  
  - do not handle masks and validation yet, nor submission
  - a button, full book apointment

Component: Success message
Requirements:
- A simple card with the checkmark icon (the svg is in the next js public folder)
- title and description as prop to be reused (string)


Component: Services card
Requirements:
- a static component with a list of services, just add the same as the image here, static for now. In the future it can receive props to show the dynamic list, but not needed now.

General Requirements:

For all components we will:
 - Make sure all the ui is responsive
 - Document storybook basic cases, I just need a initial default state for now.
 - Setup basic unit tests, just smoking one, is rendering as expected?
 - Make sure you follow the UI as the images shows for each one of them
 - Make a todo list for each component work, so when we build the plan you can keep track of the work.
```

# Plan: Booking Page UI Components

## Context

We need 5 reusable card/form components for a spa booking flow. The project already has shadcn/ui primitives (Card, Button, Input, Textarea, Label, Checkbox, Field) installed with a purple primary theme. Storybook and Vitest (with Storybook addon) are set up but have no stories or tests yet.

---

## Pre-requisite: Storybook CSS Fix

**File:** `.storybook/preview.ts`
**Change:** Add `import "../app/globals.css"` so theme variables (primary purple, border radius, etc.) and fonts load in Storybook.

---

## File Structure

```
components/
  company-info/
    company-info.tsx
    company-info.stories.tsx
  user-details-form/
    user-details-form.tsx
    user-details-form.stories.tsx
  payment-details-form/
    payment-details-form.tsx
    payment-details-form.stories.tsx
  success-message/
    success-message.tsx
    success-message.stories.tsx
  services-card/
    services-card.tsx
    services-card.stories.tsx
```

Each component gets a co-located `.stories.tsx` file. The Storybook vitest plugin automatically turns each story into a smoke test (renders without crashing) -- no separate `.test.tsx` files needed.

---

## Component 1: CompanyInfo

**File:** `components/company-info/company-info.tsx`
**Props:** `logoUrl: string`, `name: string`, `address: string`, `email: string`, `phone: string`

**UI (from screenshots):**
- `Card` wrapper
- Centered circular logo (`rounded-full`, bordered circle, ~96px)
- Bold name centered below logo
- Info rows in a two-column grid layout:
  - Left column: muted label ("Address", "Email", "Phone")
  - Right column: value text
  - Address supports multi-line (use `whitespace-pre-line`)
  - Email: `<a href="mailto:...">` in `text-primary` (purple)
  - Phone: `<a href="tel:...">` in `text-primary` (purple)

**Reuses:** `Card`, `CardContent` from `@/components/ui/card`, `cn` from `@/lib/utils`, `next/image`

**Story:** Default with Gold Spa data (`/images/spa-logo.png`, address from screenshot). Decorator wraps in `max-w-sm` container.

---

## Component 2: UserDetailsForm

**File:** `components/user-details-form/user-details-form.tsx`
**Props:** `className?: string`
**Directive:** `"use client"`

**UI (from screenshots):**
- `Card` with title "Enter your details below" (bold)
- `FieldGroup` with 4 fields:
  - Full Name (`Input`, placeholder "Input text")
  - Email (`Input` type="email", placeholder "Input text")
  - Phone (`Input` type="tel", placeholder "Input text")
  - Visit reason (`Textarea`, placeholder "Input text")
- All inputs have rounded corners matching the screenshots (~`rounded-lg`)
- **Floating footer:** A separate `div` with `fixed bottom-0` positioning, light background, containing a purple pill-shaped "Continue" `Button` (`rounded-full`), aligned to the right

**Reuses:** `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Input`, `Textarea`, `Button`, `Field`, `FieldLabel`, `FieldGroup`

**Story:** Default state. Decorator wraps in `max-w-md` container. Layout: `"padded"`.

---

## Component 3: PaymentDetailsForm

**File:** `components/payment-details-form/payment-details-form.tsx`
**Props:** `className?: string`
**Directive:** `"use client"`

**UI (from screenshots):**
- `Card` with:
  - Title: "Secure your appointment by card" (bold)
  - Description: "A credit or debit card is required to book your appointment." (muted)
- Fields (no labels on MM/YY and CVV, just placeholders):
  - "Card information" label + full-width `Input` (placeholder "1234 1234 1234 1234")
  - Grid row (`grid-cols-2`): MM/YY `Input` (placeholder "MM / YY") + CVV `Input` (placeholder "CVV")
  - Full-width `Input` (placeholder "Billing zip code")
- `Checkbox` + policy text (horizontal layout): "We ask that you please reschedule or cancel at least 24 hours before the beginning of your appointment or you may be charged a cancellation fee of $50. In the event of emergency, contact us directly. Your card will held in case of late cancellation and for future purchases. It will not be charged now."
- `FieldSeparator` line
- Full-width purple pill `Button`: "Book appointment" (`rounded-full`)
- Disclaimer below: "By creating this appointment, you acknowledge you will receive automated transactional messages from this merchant." (small muted text)

**Reuses:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Input`, `Checkbox`, `Button`, `FieldSeparator`

**Story:** Default state. Decorator wraps in `max-w-lg` container.

---

## Component 4: SuccessMessage

**File:** `components/success-message/success-message.tsx`
**Props:** `title: string`, `description: string`

**UI (from screenshots):**
- `Card` wrapper
- Centered `<img>` of `/images/success-icon.svg` (the SVG already contains the light green circle background + checkmark)
- Title below in `text-muted-foreground`, medium weight, centered
- Description below in `text-foreground`, regular weight, centered

**Reuses:** `Card`, `CardContent`, `next/image`

**Story:** Default with title "Your appointment has been booked!" and description "A confirmation has been sent to your email address." Decorator wraps in `max-w-md`.

---

## Component 5: ServicesCard

**File:** `components/services-card/services-card.tsx`
**Props:** `services?: Service[]` (with default static data), `className?: string`
**Type:** `Service = { name: string; duration: string; price: string }`

**UI (from screenshot):**
- `Card` wrapper
- "Services" as a muted/light title at the top (use `text-muted-foreground` and normal weight)
- List of service items with vertical spacing (no dividers/borders between items):
  - Service name: bold text ("Botox")
  - Below name: "45 mins • $200" in `text-muted-foreground text-sm` (duration dot-separated from price)
- Default static data: two "Botox" entries (matching the screenshot), each 45 mins / $200

**Reuses:** `Card`, `CardContent`

**Story:** Default with static data. Decorator wraps in `max-w-sm`.

---

## Testing Strategy

All stories are automatically run as smoke tests via `@storybook/addon-vitest` + Playwright. Running `npx vitest --project storybook` will:
1. Discover all `.stories.tsx` files
2. Render each exported story in headless Chromium
3. Verify components render without errors

No separate test files needed for the basic "renders as expected" requirement.

---

## Verification

1. `npm run storybook` -- visually verify all 5 components render correctly
2. `npx vitest --project storybook` -- confirm all smoke tests pass
3. Check responsive behavior by resizing Storybook viewport

---

## Implementation Order

1. Storybook preview fix (prerequisite)
2. SuccessMessage (simplest -- validates setup works end-to-end)
3. CompanyInfo (display-only card with links)
4. ServicesCard (static list card)
5. UserDetailsForm (first form, introduces floating footer pattern)
6. PaymentDetailsForm (most complex form)
7. Final verification run
