"use client";

import { motion } from "framer-motion";
import { 
  FaPhoneFlip, FaEnvelope, FaLocationDot, FaWhatsapp, 
  FaAward, FaShieldHalved, FaUsers, FaEarthAmericas,
  FaInstagram, FaTelegram, FaClock, FaMap
} from "react-icons/fa6";

// --- تنظیمات انیمیشن‌های زنجیره‌ای ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  },
};

export default function AboutPage() {
  const stats = [
    { label: "مشتری راضی", value: "+۵۰۰۰", icon: <FaUsers size={24} /> },
    { label: "تسبیح کلکسیونی", value: "+۳۰۰", icon: <FaAward size={24} /> },
    { label: "سال سابقه", value: "۱۲", icon: <FaEarthAmericas size={24} /> },
    { label: "ضمانت اصالت", value: "۱۰۰٪", icon: <FaShieldHalved size={24} /> },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#020617] text-white py-20 px-6 relative overflow-hidden ">
      
      {/* --- افکت‌های نوری متحرک (Breathing Glows) --- */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-green-500/20 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            {/* <span className="text-green-400 text-xs font-bold tracking-widest uppercase">The Story of Soltan</span> */}
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            درباره مجموعه ما
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed italic text-lg"
          >
            "هنر، اصالت و معنویت در هر دانه تسبیح نهفته است."
          </motion.p>
        </motion.div>

        {/* --- Story Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-green-400">
              میراثی از جنس سنگ و صبوری
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-300 leading-9 text-lg text-justify">
              ما در این مجموعه، با بیش از یک دهه تجربه در شناخت سنگ‌های قیمتی، متعهد به ارائه تسبیح‌هایی هستیم که هر کدام داستانی از اعماق زمین را در خود دارند. از شاه‌مقصودهای کهنه تا فیروزه‌های نیشابور، تمام تلاش ما حفظ کیفیت و جلب رضایت کلکسیون‌داران عزیز است.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-5 pt-4">
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                    <FaShieldHalved size={20} />
                  </div>
                  <span className="text-gray-200 font-bold text-lg">تضمین مادام‌العمر اصالت سنگ</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                    <FaAward size={20} />
                  </div>
                  <span className="text-gray-200 font-bold text-lg">تراش‌های انحصاری اساتید بنام</span>
               </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* قاب تزئینی متحرک */}
            <div className="absolute inset-0 border-2 border-green-500/20 rounded-[3rem] -rotate-3 scale-105 group-hover:-rotate-6 transition-transform duration-700"></div>
            
            <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent mix-blend-overlay z-10"></div>
               <img 
                 src="https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg" 
                 alt="گالری تسبیح" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
               />
            </div>
          </motion.div>
        </div>

        {/* --- Stats Section --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 to-green-500/0 group-hover:from-green-500/10 transition-all duration-500"></div>
              <div className="text-green-500 flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-white">{stat.value}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Contact Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full"></div>
            
            <h3 className="text-4xl font-black mb-12 relative z-10">ارتباط با ما</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 relative z-10">
               <ContactBox icon={<FaPhoneFlip />} title="تلفن تماس پشتیبانی" value="۰۹۱۸-۵۳۳-۸۶۹۳" />
               <ContactBox icon={<FaInstagram />} title="صفحه اینستاگرام" value="@Tasbih_Soltan" />
               <ContactBox icon={<FaLocationDot />} title="آدرس مراجعه حضوری" value="سنندج، بازار بزرگ، پلاک ۱۲" />
               <ContactBox icon={<FaTelegram />} title="کانال تلگرام" value="@Admin_Support" />
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[3rem] p-10 flex flex-col justify-between text-[#020617] shadow-[0_20px_40px_rgba(34,197,94,0.2)]">
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-black opacity-90">
                   <FaClock size={28} /> ساعت کاری
                </div>
                <div>
                   <p className="font-bold opacity-80 mb-1">شنبه تا پنجشنبه</p>
                   <p className="text-4xl md:text-5xl font-black tracking-tight">۱۰ - ۲۱</p>
                </div>
                <p className="text-sm font-bold border-t border-black/10 pt-6 leading-relaxed">
                  ارسال سفارشات آنلاین به سراسر کشور به صورت روزانه انجام می‌شود.
                </p>
             </div>
             <button className="w-full bg-[#020617] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black/80 hover:scale-[1.02] transition-all mt-8 group">
               <FaMap className="group-hover:text-green-400 transition-colors" /> مشاهده روی نقشه
             </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function ContactBox({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5 group cursor-pointer">
      <div className="w-16 h-16 bg-[#020617]/50 rounded-2xl flex items-center justify-center border border-white/5 text-green-400 group-hover:bg-green-400 group-hover:text-[#020617] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h5 className="text-xs text-gray-400 font-bold mb-1.5 group-hover:text-green-400 transition-colors">{title}</h5>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}