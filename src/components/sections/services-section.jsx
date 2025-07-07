"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Heart, Home, Utensils } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: GraduationCap,
      title: "التعليم",
      description: "برامج تعليمية شاملة للأطفال والكبار",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Heart,
      title: "الصحة",
      description: "خدمات طبية ورعاية صحية للمجتمعات المحتاجة",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Home,
      title: "الإسكان",
      description: "توفير مساكن آمنة ولائقة للعائلات المتضررة",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Utensils,
      title: "الأمن الغذائي",
      description: "برامج التغذية ومكافحة الجوع",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">خدماتنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات والبرامج لتلبية احتياجات المجتمعات المختلفة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
