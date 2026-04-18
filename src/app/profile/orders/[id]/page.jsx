"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowRight, Printer, Package, Truck, 
  MapPin, Phone, User, Calendar, 
  CheckCircle2, Clock, CreditCard, Hash,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchOrderDetails(token);
  }, [id]);

  const fetchOrderDetails = async (token) => {
    try {
      // فرض بر این است که آدرس بک‌ند برای یک سفارش خاص این است:
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error("خطا در دریافت جزئیات سفارش:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat("fa-IR").format(p);

  const getStatusInfo = (status) => {
    const map = {
      pending: { label: "در انتظار بررسی", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: <Clock size={18}/> },
      shipped: { label: "ارسال شده", color: "text-blue-500", bg: "bg-blue-500/10", icon: <Truck size={18}/> },
      completed: { label: "تکمیل شده", color: "text-green-500", bg: "bg-green-500/10", icon: <CheckCircle2 size={18}/> },
      cancelled: { label: "لغو شده", color: "text-red-500", bg: "bg-red-500/10", icon: <Package size={18}/> },
    };
    return map[status] || { label: status, color: "text-gray-400", bg: "bg-white/5", icon: <Package size={18}/> };
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!order) return <div className="text-white text-center py-20">سفارش یافت نشد.</div>;

  const status = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 flex-row-reverse"
        >
          <ArrowLeft size={20} />
          <span>بازگشت به پروفایل</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl"
        >
          {/* Top Bar (Invoice Header) */}
          <div className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-right order-2 md:order-1">
              <div className="flex items-center justify-start gap-3 mb-2">
              
                <h1 className="text-2xl font-black">جزئیات فاکتور</h1>

                  <span className={`px-4 py-1 rounded-full text-xs font-bold border border-current ${status.bg} ${status.color}`}>
                  {status.label}
                </span>

              </div>
              <div className="flex items-center justify-end gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">{new Date(order.createdAt).toLocaleDateString("fa-IR")} <Calendar size={14}/></span>
                <span className="flex items-center gap-1">#{order._id.slice(-8)} <Hash size={14}/></span>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="p-4 bg-green-500 text-[#020617] rounded-2xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 order-1 md:order-2"
            >
              <Printer size={24} />
            </button>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Customer & Shipping Info */}
            <div className="space-y-6 text-right">
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <h3 className="text-green-500 font-bold mb-4 flex items-center justify-start gap-2">
                  <User size={18} />
                  اطلاعات گیرنده
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="flex justify-between flex-row"><span className="text-gray-400">نام:</span> {order.customer?.name}</p>
                  <p className="flex justify-between flex-row"><span className="text-gray-400">تلفن:</span> {order.customer?.phone}</p>
                  <p className="text-gray-400 mt-2 border-t border-white/5 pt-2 flex items-start justify-start gap-2">
                    <MapPin size={16} className="shrink-0 mt-1" />
                    <span className="text-white text-xs leading-6">{order.customer?.address}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-green-500/5 p-6 rounded-[2rem] border border-green-500/10 text-right">
              <h3 className="text-green-500 font-bold mb-4 flex items-center justify-start gap-2">
                <CreditCard size={18} />
                خلاصه تراکنش
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between flex-row text-sm">
                  <span className="text-gray-400">تعداد اقلام:</span>
                  <span>{order.items?.reduce((a, b) => a + b.quantity, 0)} کالا</span>
                </div>
                <div className="flex justify-between flex-row text-sm">
                  <span className="text-gray-400">هزینه ارسال:</span>
                  <span className="text-green-400">رایگان</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between flex-row">
                  <span className="font-bold">مبلغ نهایی:</span>
                  <span className="text-xl font-black text-green-500">{formatPrice(order.total)} تومان</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Items */}
          <div className="px-8 pb-12">
            <div className="bg-white/5 rounded-[2rem] border border-white/5 overflow-hidden">
              <table className="w-full text-right text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr className="flex flex-row p-4 justify-between md:table-row">
                    <th className="p-4 font-medium hidden md:table-cell">محصول</th>
                    <th className="p-4 font-medium hidden md:table-cell text-center">تعداد</th>
                    <th className="p-4 font-medium hidden md:table-cell text-center">قیمت واحد</th>
                    <th className="p-4 font-medium hidden md:table-cell">جمع کل</th>
                    <th className="p-4 font-medium md:hidden">لیست کالاها</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="flex flex-col md:table-row p-4 md:p-0 border-b border-white/5 md:border-none">
                      <td className="md:p-4 text-right">
                        <div className="flex items-center gap-3 flex-row">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                            <Package size={20} />
                          </div>
                          <span className="font-bold text-gray-200">{item.name}</span>
                        </div>
                      </td>
                      <td className="md:p-4 text-center py-2 md:py-4">
                        <span className="md:hidden text-gray-500 ml-2">تعداد:</span>
                        {item.quantity}
                      </td>
                      <td className="md:p-4 text-center py-2 md:py-4">
                        <span className="md:hidden text-gray-500 ml-2">واحد:</span>
                        {formatPrice(item.price)}
                      </td>
                      <td className="md:p-4 font-black text-green-500 py-2 md:py-4">
                        <span className="md:hidden text-gray-500 ml-2">جمع:</span>
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}