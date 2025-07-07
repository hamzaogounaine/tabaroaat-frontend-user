"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
      dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">معاً نبني مستقبلاً أفضل</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              انضم إلينا في رحلة العطاء والتغيير الإيجابي في المجتمع
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                تبرع الآن
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent">
                اعرف المزيد
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="أطفال سعداء"
              className="rounded-lg shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">+10,000</p>
                  <p className="text-gray-600">مستفيد</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
