"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
  ];

  const handleLocaleChange = (e) => {
    const newLocale = e.target.value;
    router.push(pathname, { locale: newLocale });
  };

  const navigationItems = [
    { name: t("home"), href: "/" },
    { name: t("donations"), href: "/donations" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("projects"), href: "/projects" },
    { name: t("news"), href: "/news" },
    { name: t("contact"), href: "/contact" },
  ];

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/status`
        );
        setLoggedIn(res.data.loggedIn || false);
      } catch (err) {
        console.log(err);
      }
    };
    checkStatus();
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-600">
              {t("brand")}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div
              className={`flex items-baseline ${
                isRTL ? "space-x-reverse space-x-8 mr-10" : "space-x-8 ml-10"
              }`}
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex hap-4">
            <Link href="/donate">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                {t("donateNow")}
              </Button>
            </Link>
            <select
              className="ml-4 px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={locale}
              onChange={handleLocaleChange}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            {loggedIn && <Button className="ml-4">{t("logout")}</Button>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("openMenu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "right" : "left"}
                className="w-[300px] sm:w-[400px]"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-2xl font-bold text-red-600 mb-8"
                  >
                    {t("logo")}
                  </Link>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-50 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Link href="/donate">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        {t("donateNow")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
