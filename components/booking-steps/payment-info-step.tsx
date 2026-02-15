import { CompanyInfo } from "@/components/company-info/company-info"
import { ServicesCard } from "@/components/services-card/services-card"
import { PaymentDetailsForm } from "@/components/payment-details-form/payment-details-form"
import { companyData, servicesData } from "@/lib/booking-data"
import type { PaymentInfo } from "@/contexts/booking-context"

interface PaymentInfoStepProps {
  onSubmit: (data: PaymentInfo) => void
}

export function PaymentInfoStep({ onSubmit }: PaymentInfoStepProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col gap-6 md:min-w-sm">
        <CompanyInfo {...companyData} />
        <ServicesCard services={servicesData} />
      </div>
      <div className="flex flex-col gap-6 flex-1">
        <PaymentDetailsForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
