import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CompanyInfo } from "./company-info"

const meta = {
  title: "Components/CompanyInfo",
  component: CompanyInfo,
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompanyInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    logoUrl: "/images/spa-logo.png",
    name: "Gold Spa",
    address: "123 Serenity Lane\nTranquil Heights, CA 90210",
    email: "hello@goldspa.com",
    phone: "(555) 123-4567",
  },
}
