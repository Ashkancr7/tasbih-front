"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Package, LogOut, Clock, 
  ChevronLeft, ShoppingBag, Crown,
  MapPin, Phone
} from "lucide-react";

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // مقدار اولیه برای کاربر
  const [user, setUser] = useState({ name: "کاربر عزیز", phone: "ثبت نشده", address: "ثبت نشده" });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchOrders(token);
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // منطق اصلاح شده برای تشخیص آرایه یا آبجکت
      let ordersList = [];
      if (Array.isArray(data)) {
        ordersList = data;
      } else if (data && data.items) {
        // اگر بک‌ند فقط یک سفارش (مثل نمونه‌ای که فرستادی) برگرداند
        ordersList = [data];
      } else if (data && Array.isArray(data.orders)) {
        ordersList = data.orders;
      }

      setOrders(ordersList);

      // استخراج اطلاعات کاربر از اولین سفارش (طبق دیتایی که فرستادی)
      if (ordersList.length > 0 && ordersList[0].customer) {
        setUser({
          name: ordersList[0].customer.name || "کاربر عزیز",
          phone: ordersList[0].customer.phone || "---",
          address: ordersList[0].customer.address || "---"
        });
      }
    } catch (err) {
      console.log("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // اصلاح وضعیت‌های انگلیسی بک‌ند به فارسی برای استایل دهی
  const getStatusStyle = (status) => {
    switch (status) {
      case "shipped":
      case "ارسال شده": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "completed":
      case "تکمیل شده": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "cancelled":
      case "لغو شده": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const translateStatus = (status) => {
    const statuses = {
      pending: "در انتظار بررسی",
      shipped: "ارسال شده",
      completed: "تکمیل شده",
      cancelled: "لغو شده"
    };
    return statuses[status] || status;
  };

  const formatPrice = (p) => new Intl.NumberFormat("fa-IR").format(p);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full" 
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- DASHBOARD HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex items-center gap-5 flex-row text-right">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <User size={40} className="text-[#020617]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">خوش آمدید به پنل کاربری</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            <span>خروج از حساب</span>
            <LogOut size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- SIDEBAR INFO (اطلاعات واقعی کاربر) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-6">
              <h3 className="font-bold text-lg text-right border-b border-white/5 pb-4">اطلاعات کاربری</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-300 font-medium">{user.phone}</span>
                  <Phone size={16} className="text-gray-500" />
                </div>
                <div className="flex justify-between items-center text-sm p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-300 font-medium">عضویت عادی</span>
                  <Crown size={16} className="text-gray-500" />
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-right space-y-2">
                  <div className="flex items-center justify-end gap-2 text-gray-500 text-sm">
                    <span>آدرس ثبت شده</span>
                    <MapPin size={16} />
                  </div>
                  <p className="text-gray-300 text-xs leading-5">{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ORDERS LIST --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between flex-row mb-2 px-2">
              <h2 className="text-xl font-black flex items-center gap-2">
                تاریخچه سفارشات
                <Package size={22} className="text-green-500" />
              </h2>
              <span className="text-xs text-gray-500 font-medium">{orders.length} مورد ثبت شده</span>
            </div>

            <AnimatePresence>
              {orders.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-16 text-center space-y-6"
                >
                  <ShoppingBag size={48} className="mx-auto text-gray-700" />
                  <p className="text-gray-500 font-bold">هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
                  <button onClick={() => router.push("/")} className="bg-green-500 text-[#020617] px-8 py-3 rounded-2xl font-black">شروع خرید</button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, idx) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden"
                    >
                      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] flex-row-reverse">
                        <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold border ${getStatusStyle(order.status)}`}>
                          {translateStatus(order.status)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <span>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
                          <Clock size={14} />
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center flex-row">
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-200">{item.name}</p>
                              <p className="text-[10px] text-gray-500 mt-1">{item.quantity} عدد × {formatPrice(item.price)} تومان</p>
                            </div>
                            <span className="text-sm text-green-500 font-black">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="px-6 py-4 bg-white/5 flex justify-between items-center flex-row">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 block">مبلغ کل قابل پرداخت</span>
                          <span className="text-xl font-black text-green-400">{formatPrice(order.total)} <small className="text-[10px]">تومان</small></span>
                        </div>
                        <button onClick={() => router.push(`/profile/orders/${order._id}`)} className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1">
                           جزئیات فاکتور <ChevronLeft size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}