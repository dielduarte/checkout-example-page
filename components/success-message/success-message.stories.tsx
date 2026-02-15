import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SuccessMessage } from "./success-message"

const meta = {
  title: "Components/SuccessMessage",
  component: SuccessMessage,
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SuccessMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Your appointment has been booked!",
    description: "A confirmation has been sent to your email address.",
  },
}
