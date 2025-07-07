"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "أحمد محمد",
      role: "متبرع",
      content: "تجربة رائعة مع المنظمة، شفافية كاملة في التعامل ومتابعة مستمرة للمشاريع",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "فاطمة علي",
      role: "مستفيدة",
      content: "ساعدتني المنظمة في تعليم أطفالي وتوفير احتياجاتهم الأساسية، جزاهم الله خيراً",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "محمد السعيد",
      role: "متطوع",
      content: "فخور بكوني جزء من هذا العمل الإنساني النبيل، فريق عمل متميز ومخلص",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">آراء المتبرعين والمستفيدين</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">اقرأ تجارب من تعاملوا معنا وشاهدوا أثر العطاء</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full ml-4" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
