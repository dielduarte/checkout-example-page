import { Card, CardContent } from "@/components/ui/card"
import type { Service } from "@/lib/booking-data"

interface ServicesCardProps {
  services: Service[]
  className?: string
}

export function ServicesCard({
  services,
  className,
}: ServicesCardProps) {
  return (
    <Card className={className}>
      <CardContent className="space-y-4">
        <h3 className="text-muted-foreground font-normal">Services</h3>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id}>
              <p className="font-bold">{service.name}</p>
              <p className="text-muted-foreground text-sm">
                {service.duration} &middot; {service.price}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
