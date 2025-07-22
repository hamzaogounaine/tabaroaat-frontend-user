"use client"

import { GET_CATEGORIES } from "@/app/queries/campaignQueries"
import Loader from "@/components/Loader"
import { useQuery } from "@apollo/client"
import { useLocale, useTranslations } from "next-intl"
import * as LucideIcons from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const rtlLanguages = ["ar", "he", "fa", "ur"]

const Page = () => {
  const locale = useLocale()
  const t = useTranslations("DonatePage")
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { lang: locale },
  })

  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr"

  if (loading) {
    return <Loader />
  }

  console.log(error)
  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error.message}</p>
  }

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r " />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-6">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm">
              ✨ Discover Causes That Matter
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              {t("browseCategories")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose from our carefully curated categories and make a difference in the world, one donation at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.categories.map((el, i) => {
            const IconComponent = LucideIcons[el.icon] || LucideIcons.Folder

            // Color variations for different categories
            const colorVariants = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-green-500 to-emerald-500",
              "from-orange-500 to-red-500",
              "from-indigo-500 to-purple-500",
              "from-teal-500 to-green-500",
              "from-rose-500 to-pink-500",
              "from-amber-500 to-orange-500",
            ]

            const gradientClass = colorVariants[i % colorVariants.length]

            return (
              <Link key={i} href={`/donate/categorie/${el.origin_name}`}>
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  <CardContent className="relative p-8 text-center space-y-6">
                    {/* Icon Container */}
                    <div className="relative">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${gradientClass} p-5 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}
                      >
                        <IconComponent size={40} className="text-white w-full h-full" />
                      </div>

                      {/* Floating particles effect */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse" />
                    </div>

                    {/* Category Name */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {el.name}
                      </h3>

                      {/* Animated underline */}
                      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto rounded-full" />
                    </div>

                    {/* Hover indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-600">
                        Click to explore →
                      </Badge>
                    </div>
                  </CardContent>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -top-40 -bottom-40 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-1000" />
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm font-medium">Can't find what you're looking for?</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Suggest a Category
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
