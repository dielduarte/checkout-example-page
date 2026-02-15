import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PaymentDetailsForm } from "./payment-details-form"

const meta = {
  title: "Components/PaymentDetailsForm",
  component: PaymentDetailsForm,
  decorators: [
    (Story) => (
      <div className="max-w-lg mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentDetailsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
