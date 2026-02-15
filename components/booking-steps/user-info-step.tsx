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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <CompanyInfo {...companyData} />
        <ServicesCard services={servicesData} />
      </div>
      <UserDetailsForm onSubmit={onSubmit} />
    </div>
  )
}
