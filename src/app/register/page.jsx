"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, Lock, Eye, EyeOff, 
  UserPlus, Loader2, CheckCircle2, AlertCircle, ArrowLeft 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        // هدایت خودکار به صفحه ورود بعد از ۲ ثانیه
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "خطایی در ثبت‌نام رخ داد");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد رفیق!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* هاله‌های نوری پس‌زمینه (ثبات بصری با کل سایت) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          {/* <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="inline-flex w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl items-center justify-center shadow-lg shadow-green-500/20 mb-6"
          >
            <UserPlus size={40} className="text-black" />
          </motion.div> */}
          <h1 className="text-4xl font-black text-white mb-2">عضویت در تسبیح‌شاپ</h1>
          <p className="text-gray-500 font-medium">به جمع علاقه‌مندان تسبیح‌های خاص بپیوندید</p>
        </div>

        {/* --- REGISTER CARD --- */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 md:p-10 rounded-[3rem] shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* پیام‌های وضعیت */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm flex items-center justify-end gap-3 text-right"
                >
                  <span>{error}</span>
                  <AlertCircle size={18} />
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl text-sm flex items-center justify-end gap-3 text-right"
                >
                  <span>ثبت‌نام موفق! در حال انتقال به صفحه ورود...</span>
                  <CheckCircle2 size={18} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* فیلد نام */}
            <div className="space-y-2 text-right">
              <label className="text-xs text-gray-400 mr-2">نام و نام خانوادگی</label>
              <div className="relative">
                <input
                  required
                  className="w-full bg-[#020617]/40 border border-white/10 rounded-2xl py-4 pr-12 pl-5 text-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 outline-none transition-all text-right"
                  placeholder="مثلاً: محمد کریمی"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <User className="absolute right-4 top-4 text-gray-600" size={20} />
              </div>
            </div>

            {/* فیلد موبایل */}
            <div className="space-y-2 text-right">
              <label className="text-xs text-gray-400 mr-2">شماره موبایل</label>
              <div className="relative">
                <input
                  required
                  type="tel"
                  className="w-full bg-[#020617]/40 border border-white/10 rounded-2xl py-4 pr-12 pl-5 text-white focus:border-green-500 outline-none transition-all text-left"
                  placeholder="0912XXXXXXX"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <Phone className="absolute right-4 top-4 text-gray-600" size={20} />
              </div>
            </div>

            {/* فیلد رمز عبور */}
            <div className="space-y-2 text-right">
              <label className="text-xs text-gray-400 mr-2">رمز عبور (حداقل ۸ کاراکتر)</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#020617]/40 border border-white/10 rounded-2xl py-4 px-12 pr-12 text-white focus:border-green-500 outline-none transition-all text-left"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Lock className="absolute right-4 top-4 text-gray-600" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-4 text-gray-600 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* دکمه ثبت نام */}
            <button
              disabled={loading || success}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-800 disabled:text-gray-500 text-[#020617] py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_20px_40px_rgba(34,197,94,0.15)] mt-10"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <span>ایجاد حساب کاربری</span>
                  <ArrowLeft size={22} />
                </>
              )}
            </button>
          </form>

          {/* لینک ورود */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <button 
                onClick={() => router.push("/login")}
                className="text-green-500 font-bold hover:text-green-400 transition-colors"
              >
                وارد شوید
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-[11px] mt-8 leading-6">
          با ثبت‌نام، شما <span className="text-gray-400">شرایط استفاده</span> و <span className="text-gray-400">سیاست حریم خصوصی</span> تسبیح‌شاپ را می‌پذیرید.
        </p>
      </motion.div>
    </div>
  );
}