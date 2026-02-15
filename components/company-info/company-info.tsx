import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface CompanyInfoProps {
  logoUrl: string
  name: string
  address: string
  email: string
  phone: string
  className?: string
}

export function CompanyInfo({
  logoUrl,
  name,
  address,
  email,
  phone,
  className,
}: CompanyInfoProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="size-24 overflow-hidden rounded-full border">
            <Image
              src={logoUrl}
              alt={name}
              width={96}
              height={96}
              className="size-full object-cover"
              loading="eager"
            />
          </div>
          <h2 className="text-lg font-bold">{name}</h2>
        </div>

        <div className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <Label className="text-muted-foreground flex items-start">Address</Label>
          <span className="whitespace-pre-line">{address}</span>

          <Label className="text-muted-foreground">Email</Label>
          <Button variant="link" asChild size="auto" className="justify-start">
            <a href={`mailto:${email}`} >{email}</a>
          </Button>

          <Label className="text-muted-foreground">Phone</Label>
          <Button variant="link" asChild size="auto" className="justify-start">
            <a href={`tel:${phone}`}>{phone}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
