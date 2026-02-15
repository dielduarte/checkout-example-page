import { CompanyInfo } from "@/components/company-info/company-info"
import { ServicesCard } from "@/components/services-card/services-card"
import { UserDetailsForm } from "@/components/user-details-form/user-details-form"
import { companyData, servicesData } from "@/lib/booking-data"
import type { UserInfo } from "@/contexts/booking-context"

interface UserInfoStepProps {
  onSubmit: (data: UserInfo) => void
}

export function UserInfoStep({ onSubmit }: UserInfoStepProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col gap-6 md:min-w-sm">
        <CompanyInfo {...companyData} />
        <ServicesCard services={servicesData} />
      </div>
      <div className="flex flex-col gap-6 flex-1">
        <UserDetailsForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
