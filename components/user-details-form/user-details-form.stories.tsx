import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { UserDetailsForm } from "./user-details-form"

const meta = {
  title: "Components/UserDetailsForm",
  component: UserDetailsForm,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto pb-24">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserDetailsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
