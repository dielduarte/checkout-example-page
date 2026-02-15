export const companyData = {
  logoUrl: "/images/spa-logo.png",
  name: "Gold Spa",
  address: "2525 Camino del Rio S\nSuite 315 Room 8\nSan Diego, CA 92108",
  email: "goldspa@gmail.com",
  phone: "+1 123 4567 222",
} as const

export const servicesData = [
  { name: "Botox", duration: "45 mins", price: "$200" },
  { name: "Botox", duration: "45 mins", price: "$200" },
]

export const successData = {
  title: "Your appointment has been booked!",
  description: "A confirmation has been sent to your email address.",
} as const
