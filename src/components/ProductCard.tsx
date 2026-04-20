"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ShieldCheck } from "lucide-react";
import { useCartStore } from "../store/cartStore";

// ۱. تعریف دقیق تایپ محصول برای رفع خطای "Property product does not exist"
interface Product {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: boolean;
  rating?: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

// --- Utilities ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

// ۲. اضافه کردن تایپ به ورودی کامپوننت
const ProductCard = memo(({ product }: ProductCardProps) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const formattedPrice = useMemo(() => formatCurrency(product.price), [product.price]);
  const formattedOldPrice = useMemo(() => 
    product.oldPrice ? formatCurrency(product.oldPrice) : null, 
    [product.oldPrice]
  );

  const handleNavigation = () => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      layout
      onClick={handleNavigation}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group cursor-pointer relative bg-white rounded-[2.5rem] p-3 shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-100"
    >
      {/* --- Actions --- */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        <button 
          type="button"
          aria-label="Add to wishlist"
          className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all active:scale-90"
        >
          <Heart size={18} className="transition-colors" />
        </button>
      </div>

      {/* --- Media Section --- */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gray-50">
        {product.discount && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg shadow-red-200">
            ویژه
          </div>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 space-y-4 text-right">
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-600">{product.rating || "۴.۸"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
            <span className="text-[10px] font-bold">اصالت سنگ</span>
            <ShieldCheck size={14} />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-black text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 min-h-[3rem]">
            {product.description || "توضیحی برای این محصول وارد نشده است."}
          </p>
        </div>

        {/* --- Footer / Pricing --- */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 flex-row-reverse">
          <div className="flex flex-col items-end">
            {formattedOldPrice && (
              <span className="text-[11px] text-gray-400 line-through decoration-red-400/50">
                {formattedOldPrice}
              </span>
            )}
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                {formattedPrice}
              </span>
              <span className="text-[10px] font-bold text-gray-500">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="group/btn relative flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-emerald-200"
          >
            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;