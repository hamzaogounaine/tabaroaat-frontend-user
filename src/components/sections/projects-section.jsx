"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ProjectsSection() {
  const projects = [
    {
      title: "مشروع كفالة الأيتام",
      description: "برنامج شامل لرعاية وتعليم الأطفال الأيتام",
      image: "/placeholder.svg?height=200&width=400",
      raised: 75000,
      goal: 100000,
      progress: 75,
    },
    {
      title: "حفر الآبار",
      description: "توفير المياه النظيفة للقرى النائية",
      image: "/placeholder.svg?height=200&width=400",
      raised: 45000,
      goal: 60000,
      progress: 75,
    },
    {
      title: "التعليم للجميع",
      description: "بناء مدارس في المناطق المحرومة",
      image: "/placeholder.svg?height=200&width=400",
      raised: 120000,
      goal: 150000,
      progress: 80,
    },
  ]

  return (
    <section className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">مشاريعنا الحالية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ساهم في مشاريعنا الجارية واصنع فرقاً حقيقياً في حياة المحتاجين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تم جمع: {project.raised.toLocaleString()} ريال</span>
                    <span>الهدف: {project.goal.toLocaleString()} ريال</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <p className="text-sm text-gray-500 text-center">{project.progress}% مكتمل</p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">تبرع للمشروع</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
