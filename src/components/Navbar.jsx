"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";

const NAV_LINKS = [
  { id: 1, title: "خانه", href: "/" },
  { id: 2, title: "محصولات", href: "/products" },
  { id: 3, title: "پرفروش‌ها", href: "/best-sellers" },
  { id: 4, title: "تماس با ما", href: "/contact" },
];

const CATEGORIES = [
  "تسبیح عقیق",
  "شاه مقصود",
  "فیروزه",
  "چوبی",
  "خاص و دست‌ساز",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  // ✅ حل مشکل hydration + چک login
  useEffect(() => {
    setHydrated(true);

    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  // ❌ تا قبل از hydration چیزی رندر نکن
  if (!hydrated) return null;

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      {/* TOP BAR */}
      <div className="bg-gradient-to-l from-green-600 to-emerald-700 text-white text-[11px] md:text-xs py-2 text-center font-bold flex items-center justify-center gap-2">
        <Sparkles size={14} className="animate-pulse" />
        ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان ✨
      </div>

      <nav className="max-w-7xl mx-auto px-6">
        {/* MAIN */}
        <div className="flex items-center justify-between h-16 md:h-20 gap-8">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">ت</span>
            </div>
            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-200">
              تسبیح‌شاپ
            </span>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-200 outline-none pr-12"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* 👇 AUTH */}
            {!user ? (
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-4 py-2.5 rounded-2xl text-sm font-bold"
              >
                <User size={18} />
                ورود / ثبت‌نام
              </Link>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="hidden lg:flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2.5 rounded-2xl text-sm"
                >
                  <User size={18} />
                  پروفایل
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    location.reload();
                  }}
                  className="hidden lg:flex text-red-400 text-sm"
                >
                  خروج
                </button>
              </>
            )}

            {/* CART */}
            <button
              onClick={() => router.push("/checkout")}
              className="relative p-2.5 bg-white/5 border border-white/10 rounded-2xl"
            >
              <ShoppingCart size={22} className="text-gray-300" />
              <span className="absolute -top-1 -left-1 bg-green-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </button>

            {/* MOBILE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 bg-white/5 rounded-2xl text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="hidden md:flex gap-8 py-3 border-t border-white/5 text-sm">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <span className="text-gray-400 hover:text-green-400">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] p-6 space-y-6"
          >
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 text-lg"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 👇 AUTH MOBILE */}
            {!user ? (
              <Link
                href="/login"
                className="block bg-green-500 text-black text-center py-2 rounded-xl"
              >
                ورود / ثبت‌نام
              </Link>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  location.reload();
                }}
                className="block w-full text-red-400"
              >
                خروج
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}