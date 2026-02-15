import { CompanyInfo } from "@/components/company-info/company-info"
import { ServicesCard } from "@/components/services-card/services-card"
import { SuccessMessage } from "@/components/success-message/success-message"
import { companyData, servicesData, successData } from "@/lib/booking-data"

export function StepThree() {
  return (
    <div className="flex flex-col gap-6">
      <SuccessMessage {...successData} />
      <CompanyInfo {...companyData} />
      <ServicesCard services={servicesData} />
    </div>
  )
}
