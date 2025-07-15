"use client";

import { GET_CATEGORIE } from "@/app/queries/campaignQueries";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { cat } = useParams();
  const locale = useLocale();
  const t = useTranslations("DonatePage");

  const { error, loading, data } = useQuery(GET_CATEGORIE, {
    variables: { name: cat },
  });

  const catName = data?.getCategorie?.[`${locale}_name`];
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
    >
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          {t.rich("discoverTitle", {
            category: (chunks) => (
              <span className="text-green-600 font-semibold">{chunks}</span>
            ),
          })}
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl mt-6">
          {t("description")}
        </p>
        <button className={'mt-12 primary-btn'} >
          Start a fundraising
        </button>
      </div>

      <div className="flex justify-center">
        <Image
          src="https://res.cloudinary.com/dioamie16/image/upload/v1752611184/donation_project_images/donation_logo_v1.png"
          height={400}
          width={300}
          alt="Category illustration"
          className="object-contain max-h-[400px]"
        />
      </div>
    </div>
  );
};

export default Page;
