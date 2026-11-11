import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CompanyInfo } from "./company-info"
import { companyData } from "@/lib/booking-data"

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
  args: companyData,
}
