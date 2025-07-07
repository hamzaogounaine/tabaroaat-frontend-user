"use suspense"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Loader } from "lucide-react" // Import icons
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation" // For App Router

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams() // To get query parameters from the URL
  const [token, setToken] = useState(null) // State to store the reset token from URL
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // For success or error messages
  const [messageType, setMessageType] = useState(null) // 'success' or 'error'

  useEffect(() => {
 
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      // Handle case where token is missing in the URL
      setMessage("رمز إعادة تعيين كلمة السر مفقود في الرابط.");
      setMessageType('error');
    }
  }, [searchParams]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null) // Clear previous messages
    setMessageType(null)

    if (!token) {
      setMessage("رمز إعادة تعيين كلمة السر غير موجود.");
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("كلمة السر الجديدة يجب أن تكون 6 أحرف على الأقل.");
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("كلمتا السر غير متطابقتين.");
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // Call your backend endpoint to reset the password
      // The backend endpoint is likely POST /user/reset-password/:token
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password/${token}`, { password: newPassword });

      if (res.status === 200) { // Backend returns 200 OK for success
        setMessage(res.data.message || "تم إعادة تعيين كلمة السر بنجاح. يمكنك الآن تسجيل الدخول.");
        setMessageType('success');
        setNewPassword("");
        setConfirmPassword("");
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage(err.response?.data?.message || "فشل إعادة تعيين كلمة السر. يرجى المحاولة مرة أخرى.");
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
          <p className="text-gray-600 mt-2">إعادة تعيين كلمة المرور</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">إعادة تعيين كلمة المرور</CardTitle>
            <p className="text-gray-600">أدخل كلمة السر الجديدة لحسابك</p>
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
              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-right block">
                  كلمة السر الجديدة
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="أدخل كلمة السر الجديدة"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10 pl-10 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-right block">
                  تأكيد كلمة السر الجديدة
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة السر الجديدة"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10 pl-10 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-2">
                {loading ? (
                  <>
                    جاري إعادة التعيين <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  'إعادة تعيين كلمة السر'
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
