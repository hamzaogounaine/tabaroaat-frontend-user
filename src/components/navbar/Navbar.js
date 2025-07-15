"use client"

import * as React from "react"
import Link from "next/link"
import { Languages, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import axios from "axios"
import { useTranslations, useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  const t = useTranslations("Navbar")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ]

  const navigationItems = [
    { name: t("home"), href: "/" },
    { name: t("donations"), href: "/donations" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("projects"), href: "/projects" },
    { name: t("news"), href: "/news" },
    { name: t("contact"), href: "/contact" },
  ]

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/status`)
        setLoggedIn(res.data.loggedIn || false)
      } catch (err) {
        console.log(err)
      }
    }
    checkStatus()
  }, [])

  const currentLanguage = languages.find((lang) => lang.code === locale)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="w-20 h-20 bg-gradient-to-br  rounded-xl flex items-center justify-center">
                <Image src="https://res.cloudinary.com/dioamie16/image/upload/v1752420971/donation_project_images/donation_logo_v1.png" height={60} width={60}/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                {t("brand")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-1" : "space-x-1"}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group px-4 py-2 rounded-xl text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:bg-green-50"
                >
                  {item.name}
                  <span className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-11 px-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="mr-2">{currentLanguage?.flag}</span>
                  <span className="font-medium">{currentLanguage?.code.toUpperCase()}</span>
                  <Languages className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-md">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => router.push(pathname, { locale: lang.code })}
                    className="rounded-lg mx-1 my-1 cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  >
                    <span className="mr-3">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {loggedIn && (
              <Button
                variant="ghost"
                className="h-11 px-4 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("logout")}
              </Button>
            )}

            <Link href="/donate">
              <Button className="primary-btn text-white  hover:scale-105">
                {t("donateNow")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("openMenu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "right" : "left"}
                className="w-[320px] p-0 bg-white/95 backdrop-blur-md border-0"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">❤</span>
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        {t("brand")}
                      </span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-10 w-10 rounded-lg hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 px-6 py-4 space-y-2">
                    {navigationItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-gray-100 space-y-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-transparent"
                        >
                          <span className="mr-2">{currentLanguage?.flag}</span>
                          <span className="font-medium">{currentLanguage?.label}</span>
                          <Languages className="ml-auto h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-md">
                        {languages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            onClick={() => {
                              router.push(pathname, { locale: lang.code })
                              setIsOpen(false)
                            }}
                            className="rounded-lg mx-1 my-1 cursor-pointer hover:bg-green-50 focus:bg-green-50"
                          >
                            <span className="mr-3">{lang.flag}</span>
                            <span className="font-medium">{lang.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {loggedIn && (
                      <Button
                        variant="ghost"
                        className="w-full h-12 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("logout")}
                      </Button>
                    )}

                    <Link href="/donate" onClick={() => setIsOpen(false)}>
                      <Button className={'btn-primary'}>
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
  )
}
