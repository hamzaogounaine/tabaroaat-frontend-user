"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Award } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function AboutSection() {
  const t = useTranslations("AboutSection");
  const locale = useLocale();

  const features = [
    {
      icon: Heart,
      title: t("features.transparency.title"),
      description: t("features.transparency.description"),
    },
    {
      icon: Users,
      title: t("features.experience.title"),
      description: t("features.experience.description"),
    },
    {
      icon: Globe,
      title: t("features.globalImpact.title"),
      description: t("features.globalImpact.description"),
    },
    {
      icon: Award,
      title: t("features.quality.title"),
      description: t("features.quality.description"),
    },
  ];

  return (
    <section className="py-20 bg-gray-50" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("sectionDescription")}
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
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt={t("teamImageAlt")}
              className="rounded-lg shadow-lg"
              width={500}
              height={400}
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("missionTitle")}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("missionParagraph1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("missionParagraph2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
