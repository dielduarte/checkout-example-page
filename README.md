# Booking Page

You can play with the project live here: [https://checkout-example-page.vercel.app/](https://checkout-example-page.vercel.app/)

## Setup instructions


First install the depencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also run storybook to check basic components documentation or work on quickly UI updates with:

```bash
npm run storybook
```

## AI usage

How I use AI is based on human in the loop idea, mainly because the human (engineer) needs to be the one defining:

- The Architecture, where the code should live, boundaries and modules responsabilities.
- Tech stack and tooling, you don't really want AI to be installing random tools or duplicating code unnecessarily just to get the work done.

I used claudecode for this project plan mode + execution, and cursor for smart autocomplete when I had to manually update and adjust some stuff. To make it easier to understand my thinking, I created a /save-plan command for claude, the idea is that it would save in `plans` folder the plans I used AI to mainly drive the code + my initial prompt. Of course this is not saving the interactions after the first prompt, just initial prompt + final plan executed. When I used AI, I commited without any changes the AI generated code + plan, following the commit message format: `chore: ${task done} - AI + Plan
` 

How I prompt is envolving everyday, I'm still learning, but I see myself most productive when interating over small plans rather than a huge unique plan to create the whole platform in one go. That is how I can make sure I can follow the progress and make sure that everything generated is following the architecture defined by me.

## Assumptions

- US only app, hence the localized validations.
- No backend integration, given the only requirement was to log to console the data.
- No design system rules, so following mostly tailwind defaults.

## Tradeoffs

- React Context over a state management library, simpler for a 3-step flow, but wouldn't scale well if the booking flow grew significantly (e.g. multiple forms, async operations, server state),in complex cases like that could even consider state machines to avoid impossible states.
- Added storybook to document components and facilitate developers onboarding, but documentation are easier to get stale and really quickly stop delivering the values desired. What we need to do to avoid this problem is to have a process in place to keep docs updated. Things like: a rotation so each dev in the team has time to play with docs and update them, or automation, like AI agent that notifies when docs needs to be updated or even proactively suggest changes.
- Inconsitent navigation UX, step 1 uses a floating footer, step 2 uses the button as part of the form stack. Doing exactly like figma, but would want to change it in real life.
- Unit tests over e2e tests, faster to write and run, but don't cover the full user flow across steps
- The app assumes a linear, uninterrupted flow (user info → payment → success). In production, you'd need to handle edge cases like session expiration, network failures mid-checkout, users refreshing the page and losing state, and partial form recovery.

## Scope decisions

- All requirements asked are implemented. That said though thinking like a product engineer I think there is a lot to be done here in order to get a good product production ready:
    
    - The app is localized right now, so no multi languages and formats supported
    - Could offer an "add to calendar" after confirmation
    - No error handling besides form validation, could do a much better job here
    - Add e2e tests for critical user workflow such as the checkout, making sure client side flow + integration with backend is working
    - Add option to go back/navigate between the steps so user can update the data before finalizing the payment.
    - Could add better transition and success animations to delight the user.

## Scope change response
The scope is not clear from the first interaction with the PM, so first I would need to understand a few questions:

- Is the backend ready to notify the user via sms?
- What would the SMS notify the user about?
- How the UI would look like and behave, questions like: should we put the checkbox after and close the phone input, after all inputs? What is the default state (unchecked, checked)?

Assuming the easiest path, all the backend side is ready and we know how the UI should look like and behave, what would need to change:

- Update context type UserInfo adding a new boolean flag for the opt-in checkbox
- Add a new checkbox with label to user details form 
- Update form schema, and initial values adding the new field.

Done. On submit is already sending all the form data and saving to context, so when loging it on success page the new field value will be there.
