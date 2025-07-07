"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe, Award } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "الشفافية",
      description: "نضمن وصول تبرعاتكم للمستحقين بكل شفافية ووضوح",
    },
    {
      icon: Users,
      title: "الخبرة",
      description: "أكثر من 15 عاماً من العمل الخيري والإنساني",
    },
    {
      icon: Globe,
      title: "التأثير العالمي",
      description: "نعمل في أكثر من 25 دولة حول العالم",
    },
    {
      icon: Award,
      title: "الجودة",
      description: "حاصلون على شهادات الجودة والاعتماد الدولية",
    },
  ]

  return (
    <section className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">من نحن</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن منظمة خيرية تهدف إلى تحسين حياة الأشخاص المحتاجين من خلال برامج التنمية المستدامة والمساعدات الإنسانية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="فريق العمل"
              className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">رسالتنا</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نسعى لبناء مجتمع أكثر عدالة ورحمة من خلال تقديم المساعدة للمحتاجين وتمكين الأفراد والمجتمعات من تحقيق
              إمكاناتهم الكاملة. نؤمن بأن كل شخص يستحق الحصول على الفرص الأساسية للعيش بكرامة.
            </p>
            <p className="text-gray-600 leading-relaxed">
              من خلال شراكاتنا المحلية والدولية، نعمل على تنفيذ برامج مستدامة في مجالات التعليم والصحة والتنمية
              الاقتصادية والإغاثة الطارئة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
