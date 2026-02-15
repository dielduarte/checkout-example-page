import { Card, CardContent } from "@/components/ui/card"

export interface Service {
  name: string
  duration: string
  price: string
}

const defaultServices: Service[] = [
  { name: "Botox", duration: "45 mins", price: "$200" },
  { name: "Botox", duration: "45 mins", price: "$200" },
]

interface ServicesCardProps {
  services?: Service[]
  className?: string
}

export function ServicesCard({
  services = defaultServices,
  className,
}: ServicesCardProps) {
  return (
    <Card className={className}>
      <CardContent className="space-y-4">
        <h3 className="text-muted-foreground font-normal">Services</h3>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index}>
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
