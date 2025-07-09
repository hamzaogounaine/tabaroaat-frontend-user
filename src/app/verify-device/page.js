// app/verify-device/page.jsx
// هذه الصفحة مخصصة للمستخدمين لإدخال رمز التحقق الذي تم إرساله إلى بريدهم الإلكتروني
// بعد محاولة تسجيل الدخول من جهاز أو عنوان IP جديد.

"use client"; // هذا يحدد المكون كمكون عميل (Client Component) في Next.js App Router

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyDevicePage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams(); // للحصول على معلمات URL

  // استخراج البريد الإلكتروني من sessionStorage أو معلمات URL عند تحميل المكون
  useEffect(() => {
    // الأولوية لـ sessionStorage إذا كان موجودًا
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedEmail = sessionStorage.getItem("deviceVerificationEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        // يمكن إزالة البريد الإلكتروني من sessionStorage بعد استرجاعه لتنظيفه
        sessionStorage.removeItem("deviceVerificationEmail");
        return; // توقف هنا إذا تم العثور على البريد الإلكتروني في sessionStorage
      }
    }

    // إذا لم يتم العثور عليه في sessionStorage، تحقق من معلمات URL
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]); // يعتمد على searchParams للتحقق من تحديثات URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // تحقق أساسي من البريد الإلكتروني والرمز
    if (!email || !verificationCode) {
      setError("البريد الإلكتروني ورمز التحقق مطلوبان.");
      setLoading(false);
      return;
    }

    try {
      // استخدام axios بدلاً من fetch
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifiy-device`,
        {
          email,
          code : verificationCode,
        },
        {withCredentials: true,}
      );

      // تحقق من حالة الاستجابة من axios (res.status)
      if (res.status === 200) {
        setMessage(
          res.data.message || "تم التحقق من الجهاز بنجاح! جارٍ إعادة التوجيه..."
        );
        router.push("/"); // إعادة التوجيه إلى لوحة التحكم أو الصفحة الرئيسية
      }
    } catch (err) {
      console.error("خطأ في التحقق من الجهاز:", err);
      // معالجة أخطاء axios: الخطأ عادة ما يكون في err.response.data.message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          التحقق من الجهاز الجديد
        </h2>
        <p className="text-center text-gray-600 mb-6">
          لقد اكتشفنا محاولة تسجيل دخول من جهاز أو عنوان IP جديد. يرجى إدخال رمز
          التحقق المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني المرتبط
            </label>
            {/* عرض البريد الإلكتروني كنص بدلاً من حقل إدخال */}
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-800 sm:text-sm">
              {email || "لا يوجد بريد إلكتروني متاح"}
            </p>
          </div>

          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رمز التحقق (6 أرقام)
            </label>
            <input
              type="text" // تم تغيير النوع إلى 'text' للحفاظ على maxLength و pattern
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              maxLength="6"
              pattern="\d{6}"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-center text-xl font-mono tracking-widest"
              placeholder="أدخل الرمز هنا"
            />
          </div>

          {message && (
            <p className="text-green-600 text-center text-sm">{message}</p>
          )}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جارٍ التحقق..." : "تحقق من الجهاز"}
          </button>
        </form>
      </div>
    </div>
  );
}
