"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";

export default function VerifyDevicePage() {
  const [email, setEmail] = useState("");
  const [authorized, setAuthorized] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useTranslations("VerifyDevice");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let found = false;

    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedEmail = sessionStorage.getItem("deviceVerificationEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        sessionStorage.removeItem("deviceVerificationEmail");
        found = true;
      }
      else {
        setAuthorized(false)
      } 
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email || !verificationCode) {
      setError(t("errors.required"));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifiy-device`,
        { email, code: verificationCode },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage(t("success"));
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("errors.network"));
    } finally {
      setLoading(false);
    }
  };

  // ❌ Unauthorized full-screen message
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white border border-red-300 text-center p-8 rounded-md shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t("unauthorizedTitle")}
          </h1>
          <p className="text-gray-700">{t("unauthorizedMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {t("title")}
        </h2>
        <p className="text-center text-gray-600 mb-6">{t("instructions")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("emailLabel")}
            </label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-800">
              {email}
            </p>
          </div>

          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
              {t("codeLabel")}
            </label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              maxLength="6"
              pattern="\d{6}"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-center   "
              placeholder={t("codePlaceholder")}
            />
          </div>

          {message && <p className="text-green-600 text-center text-sm">{message}</p>}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
          >
            {loading ? t("verifying") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
