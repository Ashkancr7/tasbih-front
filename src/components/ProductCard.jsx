"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Star, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";
export default function ProductCard({ product }) {
  // تابع کمکی برای فرمت قیمت (می‌تواند به یک فایل Utils منتقل شود)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/product/${product.id}`)}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2.5rem] p-3 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 border border-gray-100/50"
    >
      {/* --- اکشن‌های سریع (Quick Actions) --- */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <button className="p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all">
          <Heart
            size={18}
            fill="currentColor"
            className="fill-transparent hover:fill-red-500"
          />
        </button>
      </div>

      {/* --- بخش تصویر --- */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gray-50">
        {product.discount && (
          <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
            ویژه
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlay هنگام هوور */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* --- محتوای کارت --- */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-medium text-gray-500">۴.۸</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <span className="text-[10px] font-medium">اصالت سنگ</span>
            <ShieldCheck size={14} />
          </div>
        </div>

        <h3 className="text-lg font-extrabold text-gray-800 text-right group-hover:text-green-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 text-right leading-5 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* --- بخش قیمت و خرید --- */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 line-through leading-none mb-1">
              {product.oldPrice ? formatPrice(product.oldPrice) : ""}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] font-bold text-gray-500">تومان</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="relative flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-2xl hover:bg-green-600 hover:shadow-[0_10px_20px_rgba(22,163,74,0.3)] transition-all duration-300 group/btn"
          >
            <ShoppingCart
              size={20}
              className="group-hover/btn:scale-110 transition-transform"
            />
            {/* Tooltip کوچک برای دکمه */}
            <span className="absolute -top-10 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
              افزودن سریع
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
