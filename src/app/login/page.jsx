"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        // هدایت کاربر به صفحه پنل یا خانه بعد از ۱ ثانیه
        setTimeout(() => router.push("/"), 1000);
      } else {
        setError(data.message || "خطایی در ورود رخ داد");
      }
    } catch (err) {
      setError("سرور در دسترس نیست، بعداً تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 overflow-hidden relative">
      {/* --- Background Elements --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 space-y-3">
          {/* <div className="inline-flex w-16 h-16 bg-green-500 rounded-2xl items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-2">
            <Sparkles size={32} className="text-black" />
          </div> */}
          <h1 className="text-3xl font-black text-white">خوش آمدید</h1>
          <p className="text-gray-500 text-sm">
            لطفاً وارد حساب کاربری خود شوید
          </p>
        </div>

        {/* --- LOGIN CARD --- */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs flex items-center justify-end gap-2 text-right"
                >
                  <span>{error}</span>
                  <AlertCircle size={16} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phone Input */}
            <div className="space-y-2 text-right">
              <label className="text-xs text-gray-400 mr-2 font-medium">
                شماره موبایل
              </label>
              <div className="relative group">
                <input
                  required
                  type="tel"
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-4 px-5 pr-12 text-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-left"
                  placeholder="0912XXXXXXX"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Phone
                  className="absolute right-4 top-4 text-gray-600 group-focus-within:text-green-500 transition-colors"
                  size={20}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 text-right">
              <div className="flex justify-between items-center px-2">
                <button
                  type="button"
                  className="text-[10px] text-green-500 hover:text-green-400 transition"
                >
                  فراموشی رمز عبور؟
                </button>
                <label className="text-xs text-gray-400 font-medium">
                  رمز عبور
                </label>
              </div>
              <div className="relative group">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-4 px-12 pr-12 text-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-left"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock
                  className="absolute right-4 top-4 text-gray-600 group-focus-within:text-green-500 transition-colors"
                  size={20}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-4 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-[#020617] py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_15px_30px_rgba(34,197,94,0.2)] mt-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>ورود به حساب</span>
                  <ArrowLeft size={20} />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              حساب کاربری ندارید؟{" "}
              <button
                onClick={() => router.push(`/register/`)}
                className="text-green-500 font-bold hover:underline"
              >
                ثبت‌نام کنید
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-600 text-[10px] mt-8">
          با ورود به تسبیح‌شاپ، تمامی قوانین و حریم خصوصی را می‌پذیرید
        </p>
      </motion.div>
    </div>
  );
}
