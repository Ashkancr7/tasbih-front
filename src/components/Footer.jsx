"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6"; // نسخه جدیدتر
import { 
  Phone, Mail, MapPin, Sparkles, ShieldCheck, 
  CreditCard, ArrowUpRight, Send 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { title: "تسبیح عقیق", href: "/category/agates" },
      { title: "شاه مقصود", href: "/category/shahmakhsoud" },
      { title: "فیروزه", href: "/category/turquoise" },
      { title: "خاص و دست‌ساز", href: "/category/handmade" },
    ],
    support: [
      { title: "پیگیری سفارش", href: "/track" },
      { title: "سوالات متداول", href: "/faq" },
      { title: "قوانین و مقررات", href: "/rules" },
      { title: "ارسال و بازگشت", href: "/shipping" },
    ],
  };

  return (
    <footer className="relative bg-[#020617] text-white border-t border-white/5 overflow-hidden">
      
      {/* --- Glow Background Effect --- */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        
        {/* --- TOP SECTION: Brand & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-6 text-right">
            <Link href="/" className="flex items-center justify-start gap-3 group">
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-green-400 to-emerald-200">
                تسبیح‌شاپ
              </h2>
              {/* <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:rotate-12 transition-transform">
                <Sparkles size={20} className="text-black" />
              </div> */}
            </Link>
            <p className="text-gray-400 text-sm leading-8 max-w-sm mr-0 ml-auto font-medium">
              هنر، اصالت و معنویت در دانه‌های تسبیح. ما بهترین سنگ‌های معدنی را با دستان هنرمندان ایرانی به رشته می‌کشیم تا همراه لحظات ناب شما باشیم.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-start gap-4">
              {[
                { icon: <FaInstagram size={20} />, href: "#" },
                { icon: <FaXTwitter size={20} />, href: "#" },
                { icon: <FaTelegram size={20} />, href: "#" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-500/50 transition-all duration-300 shadow-sm"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-right">
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-start gap-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />  فروشگاه
              </h4>
              <ul className="space-y-4">
                {footerLinks.shop.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center justify-start group">
                      <span className="group-hover:translate-x-[-4px] transition-transform">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-start gap-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> پشتیبانی 
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center justify-start">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-5">
              <h4 className="text-white font-bold text-right mb-2">ارتباط مستقیم</h4>
              
              <div className="flex justify-start items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#020617] flex items-center justify-center text-green-500 border border-white/5">
                  <Phone size={18} />
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-green-400 transition-colors">09910616048</span>
                
              </div>

              <div className="flex justify-start items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#020617] flex items-center justify-center text-green-500 border border-white/5">
                  <Mail size={18} />
                </div>
                <span className="text-gray-300 text-[13px] font-medium group-hover:text-green-400 transition-colors">support@tasbih.com</span>

              </div>

              <div className="flex justify-start items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#020617] flex items-center justify-center text-green-500 border border-white/5 shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-gray-400 text-xs leading-6 text-right">کردستان-مریوان</span>

              </div>
            </div>
          </div>

        </div>

        {/* --- MIDDLE SECTION: Trust & Newsletter --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-12 border-y border-white/5">
          
       

          <div className="flex-1 max-w-md w-full text-right">
            <h4 className="text-xl font-bold mb-2">عضویت در باشگاه مشتریان</h4>
            <p className="text-gray-500 text-sm mb-6">از جدیدترین کالکشن‌ها و کدهای تخفیف باخبر شوید</p>
            <div className="relative group">
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-5 pl-14 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-right"
                placeholder="شماره موبایل یا ایمیل"
              />
              <button className="absolute left-2 top-2 bottom-2 bg-green-500 hover:bg-green-400 text-black px-5 rounded-xl transition-all flex items-center justify-center gap-2 font-bold active:scale-95">
                <span className="hidden sm:inline">تایید</span>
                <Send size={16} />
              </button>
            </div>
          </div>

             <div className="flex gap-6">
            {[ShieldCheck, CreditCard].map((Icon, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-2 bg-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-24 h-28 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center transition-all group-hover:border-green-500/50 group-hover:bg-white/10 cursor-help">
                  <Icon size={40} className="text-gray-500 group-hover:text-green-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* --- BOTTOM SECTION: Copyright --- */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* <p className="text-[12px] text-gray-500 font-medium" dir="rtl">
            © {currentYear} تمامی حقوق برای <span className="text-gray-300">تسبیح‌شاپ</span> محفوظ است. طراحی با ❤️ برای شما.
          </p> */}
{/* 
          <div className="flex items-center gap-8 text-[12px] text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">فرصت‌های شغلی</Link>
            <Link href="#" className="hover:text-white transition-colors">حریم خصوصی</Link>
            <Link href="#" className="hover:text-white transition-colors">نقشه سایت</Link>
          </div> */}

        </div>

      </div>
    </footer>
  );
}