"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Loader } from "lucide-react" // Import Mail and Loader icons
import axios from "axios"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // For success or error messages
  const [messageType, setMessageType] = useState(null) // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null) // Clear previous messages
    setMessageType(null)

    try {
      // Call your backend endpoint to send the reset password link
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sendResetPasswordLink`, { email });

      if (res.status === 200) {
        setMessage(res.data.message || "تم إرسال رابط إعادة تعيين كلمة السر إلى بريدك الإلكتروني.");
        setMessageType('success');
        setEmail(""); // Clear the email input on success
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage(err.response?.data?.message || "فشل إرسال رابط إعادة تعيين كلمة السر. يرجى المحاولة مرة أخرى.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-red-600">
            تبرعات
          </Link>
          <p className="text-gray-600 mt-2">استعادة كلمة المرور</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">نسيت كلمة المرور؟</CardTitle>
            <p className="text-gray-600">أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور</p>
          </CardHeader>
          {message && (
            <div className="px-2">
              <div className={`rounded text-white text-center py-2 ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {message}
              </div>
            </div>
          )}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-2">
                {loading ? (
                  <>
                    جاري الإرسال <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  'إرسال رابط إعادة التعيين'
                )}
              </Button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                تذكرت كلمة المرور؟{" "}
                <Link href="/login" className="text-red-600 hover:text-red-800 font-medium">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-reverse space-x-4 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-red-600">
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-red-600">
              الشروط والأحكام
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-red-600">
              المساعدة
            </Link>
          </div>
          <p className="text-xs text-gray-500">© 2024 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
}
