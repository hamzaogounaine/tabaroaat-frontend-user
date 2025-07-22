"use client";

import {
  GET_CAMPAIGN,
  GET_CATEGORIE,
} from "@/app/queries/campaignQueries";
import { useQuery } from "@apollo/client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import CampaignInsightCard from "./campaignCard";

const Page = () => {
  const { cat } = useParams();
  const locale = useLocale();
  const t = useTranslations("DonatePage");

  const { error, loading, data } = useQuery(GET_CATEGORIE, {
    variables: { name: cat },
  });

  const {
    error: camError,
    loading: camLoading,
    data: camData,
  } = useQuery(GET_CAMPAIGN, { variables: { categorie: cat  , lang:locale}});

  console.log('data' , data)

  const catName = data?.categories?.name;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const calculateDaysLeft = (deadline) => {
    const timestamp = Number(deadline); // Convert string to number
    const deadlineDate = new Date(timestamp);
    if (isNaN(deadlineDate.getTime())) {
      console.error('Invalid deadline:', deadline);
      return 0; // Or throw new Error('Invalid deadline format');
    }
    const now = new Date();
    const diff = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={dir}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {t("discoverTitle", { category: catName })}
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl mt-6">
            {t("description")}
          </p>
          <button className={"mt-12 primary-btn"}>
            {t("startFundraising")}
          </button>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://res.cloudinary.com/dioamie16/image/upload/v1752611184/donation_project_images/donation_logo_v1.png"
            height={2000}
            width={400}
            alt="Category illustration"
            className="max-h-[400px] rounded-lg object-fill"
          />
        </div>
      </div>

      <hr className="my-10 border-gray-300" />

      <div>
        <h1 className="text-2xl mb-4">
          {t("browseFundraisersByCategory", { category: catName })}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {camLoading && <p>Loading campaigns...</p>}
          {camData?.
campaignsByCategory
?.map((el, i) => (
            <div key={i} className="p-4 rounded">
              <CampaignInsightCard
                campaign={el}
                raised={el.currentAmount}
                goal={el.goalAmount}
                donors={el.donorsCount}
                daysLeft={calculateDaysLeft(el.deadline)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
