"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { name: "الرئيسية", href: "/" },
  { name: "تبرعات", href: "/donations" },
  { name: "من نحن", href: "/about" },
  { name: "الخدمات", href: "/services" },
  { name: "المشاريع", href: "/projects" },
  { name: "الأخبار", href: "/news" },
  { name: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loggedIn , setLoggedId] = React.useState(false)

  
  React.useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log(token)
    if(token) {
      setLoggedId(true)
    }
  },[])

  return (
    <nav className="bg-white shadow-sm border-b" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-600">
              تبرعات
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-reverse space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}

          <div className="hidden md:block">
            <Link href={"/donate"}>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                تبرع الآن
              </Button>
            </Link>
            {loggedIn && 
            <Button>تسجيل الخروج</Button>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px]"
                dir="rtl"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-2xl font-bold text-red-600 mb-8"
                  >
                    الشعار
                  </Link>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-50 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Link href={"/donate"}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        تبرع الآن
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
