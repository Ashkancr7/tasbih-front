import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // افزودن به سبد خرید
      addToCart: (product) => {
        const productId = product._id || product.id;
        
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === productId);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          // اضافه کردن آیتم جدید با ساختار استاندارد
          return {
            cart: [...state.cart, { ...product, id: productId, quantity: 1 }],
          };
        });
      },

      // حذف کامل یک محصول
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      // افزایش تعداد
      increase: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      // کاهش تعداد (با قابلیت حذف خودکار در صورت رسیدن به صفر)
      decrease: (id) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      // پاکسازی کامل سبد خرید (بعد از ثبت سفارش)
      clearCart: () => set({ cart: [] }),

      // --- توابع کمکی (Selectors) ---
      
      // گرفتن مجموع قیمت (بدون هزینه ارسال)
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // گرفتن تعداد کل کالاها
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: "cart-storage", // نام کلید در LocalStorage
    }
  )
);