import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface SuccessMessageProps {
  title: string
  description: string
  className?: string
}

export function SuccessMessage({
  title,
  description,
  className,
}: SuccessMessageProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center gap-4">
        <Image
          src="/images/success-icon.svg"
          alt=""
          width={120}
          height={120}
        />
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-lg font-medium">{title}</p>
          <p className="text-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
