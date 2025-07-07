"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "الخدمات", href: "/services" },
    { name: "المشاريع", href: "/projects" },
  ]

  const services = [
    { name: "التعليم", href: "/education" },
    { name: "الصحة", href: "/health" },
    { name: "الإسكان", href: "/housing" },
    { name: "الأمن الغذائي", href: "/food" },
  ]

  return (
    <footer className="bg-gray-800 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">الشعار</h3>
            <p className="text-gray-300 leading-relaxed">
              منظمة خيرية تهدف إلى تحسين حياة الأشخاص المحتاجين من خلال برامج التنمية المستدامة والمساعدات الإنسانية.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <Facebook
                className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter
                className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram
                className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Youtube
                className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 ml-3" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 ml-3" />
                <span className="text-gray-300" dir="ltr">
                  +966 11 123 4567
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 ml-3" />
                <span className="text-gray-300">info@charity.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 جميع الحقوق محفوظة - منظمة الخير</p>
        </div>
      </div>
    </footer>
  );
}
