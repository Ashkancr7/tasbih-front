"use client";

import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, increase, decrease, totalPrice } =
    useCartStore();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-2xl font-bold mb-6 text-right">
        سبد خرید 🛒
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          سبد خرید خالی است
        </p>
      ) : (
        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow flex items-center justify-between"
            >

              {/* info */}
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  className="w-20 h-20 rounded-xl"
                />

                <div className="text-right">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {item.price.toLocaleString()} تومان
                  </p>
                </div>

              </div>

              {/* actions */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => increase(item.id)}
                  className="bg-gray-200 px-3 rounded"
                >
                  +
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => decrease(item.id)}
                  className="bg-gray-200 px-3 rounded"
                >
                  -
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  حذف
                </button>

              </div>

            </div>
          ))}

          {/* total */}
          <div className="text-left mt-6">

            <p className="text-xl font-bold">
              مجموع: {totalPrice().toLocaleString()} تومان
            </p>

            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-2xl">
              ادامه خرید
            </button>

          </div>

        </div>
      )}
    </div>
  );
}