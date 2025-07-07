"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function StatisticsSection() {
  const stats = [
    { number: "50,000+", label: "مستفيد" },
    { number: "25", label: "دولة" },
    { number: "100+", label: "مشروع" },
    { number: "15", label: "سنة خبرة" },
  ]

  return (
    <section className="py-20 bg-blue-600 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">إنجازاتنا بالأرقام</h2>
          <p className="text-xl text-blue-100">نفتخر بما حققناه من إنجازات في خدمة المجتمع</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
