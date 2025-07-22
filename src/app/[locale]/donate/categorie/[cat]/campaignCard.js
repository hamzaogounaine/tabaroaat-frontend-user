"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, MapPin, Users, Calendar } from "lucide-react"
import Image from "next/image"
import { useLocale } from "next-intl"

export default function CampaignInsightCard({
  campaign,
  raised ,
  goal,
  donors ,
  daysLeft ,
}) {
  const progressPercentage = (raised / goal) * 100
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <Card
      className="w-full max-w-md overflow-hidden shadow-lg hover:shadow-2xl  transition-shadow duration-300"
      dir={dir}
    >
      <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-100">
        <Image src={campaign.image} alt={campaign.campaignName} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-emerald-700">
            {campaign.categorie || "Category"}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className="bg-white/90 border-emerald-200">
            <Calendar className="w-3 h-3 mr-1" />
            {daysLeft} days left
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {campaign.campaignName}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mt-2">
          {campaign.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-emerald-600">${ raised}</span>
            <span className="text-gray-500">of ${goal}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-gray-500">{Math.round(progressPercentage)}% funded</div>
        </div>

        <div className="flex justify-between items-center py-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{donors} donors</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Rural Community</span>
          </div>
        </div>

        {/* Tags – Only if available */}
        {/* <div className="flex flex-wrap gap-1">
          {(campaign.tags?.[locale] || []).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div> */}

        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Donate Now</Button>
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
