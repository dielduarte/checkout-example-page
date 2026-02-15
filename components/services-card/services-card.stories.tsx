import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ServicesCard } from "./services-card"

const meta = {
  title: "Components/ServicesCard",
  component: ServicesCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ServicesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
