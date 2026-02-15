import { CompanyInfo } from "@/components/company-info/company-info"
import { ServicesCard } from "@/components/services-card/services-card"
import { PaymentDetailsForm } from "@/components/payment-details-form/payment-details-form"
import { companyData, servicesData } from "@/lib/booking-data"
import type { PaymentInfo } from "@/contexts/booking-context"

interface StepTwoProps {
  onSubmit: (data: PaymentInfo) => void
}

export function StepTwo({ onSubmit }: StepTwoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <CompanyInfo {...companyData} />
        <ServicesCard services={servicesData} />
      </div>
      <PaymentDetailsForm onSubmit={onSubmit} />
    </div>
  )
}
