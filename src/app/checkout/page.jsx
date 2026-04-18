"use client";

import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, MapPin, Truck, CreditCard,
  ShoppingBag, CheckCircle2, ShieldCheck,
  Loader2, ArrowRight, Plus, Minus, Trash2
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart, increase, decrease, removeFromCart } = useCartStore();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("express");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  // جلوگیری از خطای Hydration در Next.js
  useEffect(() => {
    setHydrated(true);
  }, []);

  // محاسبه قیمت‌ها (مستقیم از روی cart که در لحظه آپدیت می‌شود)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingPrice = shippingMethod === "today" ? 45000 : 0;
  const totalPrice = subtotal + shippingPrice;

  const handleSubmit = async () => {
    if (cart.length === 0) return;
    if (!form.name || !form.phone || !form.address) {
      setError("لطفاً تمامی فیلدهای ستاره‌دار را پر کنید");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const order = {
      customer: form,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        alert("سفارش شما با موفقیت ثبت شد 💚");
        clearCart();
        router.push("/profile");
      } else {
        const data = await res.json();
        setError(data.message || "خطا در ثبت سفارش");
      }
    } catch (err) {
      setError("اتصال با سرور برقرار نشد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat("fa-IR").format(p);

  if (!hydrated) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h2>
        <button onClick={() => router.push("/")} className="bg-green-500 text-black px-8 py-3 rounded-2xl font-bold flex items-center gap-2 mt-4">
          <ArrowRight size={20} /> برگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-8 flex-row">
          <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
            <ShoppingBag size={24} />
          </div>
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-black">نهایی کردن سفارش</h1>
            <p className="text-gray-500 text-xs">مدیریت سبد و اطلاعات ارسال</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* بخش فرم اطلاعات */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-10 flex-row">
                <h2 className="text-xl font-bold">۱. اطلاعات گیرنده</h2>
                <User className="text-green-500" size={24} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 mr-2">نام و نام خانوادگی *</label>
                  <input
                    className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-4 px-5 focus:border-green-500 outline-none transition-all text-right"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 mr-2">شماره تماس *</label>
                  <input
                    className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-4 px-5 focus:border-green-500 outline-none transition-all text-left"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs text-gray-400 mr-2">آدرس پستی *</label>
                  <textarea
                    className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-4 px-5 focus:border-green-500 outline-none transition-all h-24 resize-none text-right"
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* شیوه ارسال */}
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8 flex-row">
                <h2 className="text-xl font-bold">۲. شیوه ارسال</h2>
                <Truck className="text-green-500" size={24} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "express", title: "پست پیشتاز", price: 0 },
                  { id: "today", title: "ارسال فوری (تهران)", price: 45000 },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setShippingMethod(m.id)}
                    className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                      shippingMethod === m.id ? "border-green-500 bg-green-500/5" : "border-white/5"
                    }`}
                  >
                    <span className="font-bold text-green-400">{m.price === 0 ? "رایگان" : `${formatPrice(m.price)} تومان`}</span>
                    <span className="font-medium">{m.title}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* خلاصه سفارش و مدیریت محصولات */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 sticky top-8">
              <h3 className="text-lg font-bold text-right mb-6 border-b border-white/5 pb-4">لیست خرید شما</h3>
              
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 bg-white/[0.02] p-3 rounded-2xl border border-white/5 flex-row-reverse"
                    >
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      
                      <div className="flex-1 text-right">
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatPrice(item.price)} تومان</p>
                        
                        {/* کنترلرهای تعداد */}
                        <div className="flex items-center gap-3 mt-3 flex-row-reverse">
                          <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-1">
                            <button onClick={() => increase(item.id)} className="p-1 hover:text-green-500"><Plus size={14}/></button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => decrease(item.id)} className="p-1 hover:text-red-500"><Minus size={14}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors mr-auto">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* مجموع کل */}
              <div className="space-y-3 border-t border-white/5 pt-6">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>{formatPrice(subtotal)} تومان</span>
                  <span>مجموع کالاها</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-white pt-2">
                  <span className="text-green-500">{formatPrice(totalPrice)}</span>
                  <span className="text-lg">مبلغ نهایی</span>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-2xl font-black mt-8 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><span>ثبت نهایی سفارش</span><CreditCard size={20}/></>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}