"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("HeroSection");
  const locale = useLocale();

  return (
    <section
      className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
      dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={locale === "ar" ? "text-center lg:text-right" : "text-center lg:text-left"}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={'/donate'}  >
              <Button
                size="lg"
                className="bg-white cursor-pointer text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                {t("donateNow")}
              </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent">
                {t("learnMore")}
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/07/raising-happy-child.jpg"
              alt={t("imageAlt")}
              className="rounded-lg shadow-2xl"
              width={600}
              height={500}
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {t("beneficiariesCount")}
                  </p>
                  <p className="text-gray-600">{t("beneficiariesLabel")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
