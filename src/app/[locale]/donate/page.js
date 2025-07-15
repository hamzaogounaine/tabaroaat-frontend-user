"use client";

import { GET_CATEGORIES } from "@/app/queries/campaignQueries";
import Loader from "@/components/Loader";
import { useQuery } from "@apollo/client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

const rtlLanguages = ["ar", "he", "fa", "ur"];

const Page = () => {
  const locale = useLocale();
  const t = useTranslations("DonatePage");

  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { lang: locale },
  });

  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";

  if (loading) {
    return <Loader />;
  }
  console.log(error);

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">Error: {error.message}</p>
    );
  }

  return (
    <div
      dir={dir} // dynamically sets direction
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20"
    >
      <h1 className="text-6xl pt-20">{t("browseCategories")}</h1>
      <div className="grid grid-cols-4 gap-10 container">
        {data.categories.map((el, i) => {
          const IconComponent = LucideIcons[el.icon] || LucideIcons.Folder; // fallback icon
          return (
            <div key={i} className="space-y-4">
              <Link href={`/donate/categorie/${el.origin_name}`}>
              <div
                
                className="bg-secondary/50 p-10 border flex justify-center text-center hover:bg-secondary/100 rounded-lg hover:border-black transition-all cursor-pointer"
              >
                <IconComponent size={48} className="mb-3" />
              </div>
              </Link>
              <p className="text-center text-xl">{el.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
