"use client";
import { Clock, Package, CheckCircle2 } from "lucide-react";
import { useEffect, useRef,useState } from "react";

export default function ChefDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
   

  const fetchOrders = async () => {
    const res = await fetch("/api/chef/order/get");
    const data = await res.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const markPrepared = async (orderId: string) => {
    setLoadingId(orderId);

    await fetch("/api/chef/order/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    setLoadingId(null);
    fetchOrders();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
   <h1 className="text-2xl font-bold mb-6">
        Chef Dashboard 👨‍🍳
      </h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-6"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "PLACED"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "ACCEPTED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Times */}
            <p className="text-sm text-gray-500 mt-1">
              Received:{" "}
              {new Date(order.orderPlacedAt).toLocaleString()}
            </p>

            {order.orderPreparedAt && (
              <p className="text-sm text-gray-500">
                Prepared:{" "}
                {new Date(
                  order.orderPreparedAt
                ).toLocaleString()}
              </p>
            )}

            {/* Products */}
            <div className="mt-4 space-y-4">
              {order.items.map((item: any) => {
                const p = item.productId;

                return (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center border rounded-lg p-3"
                  >
                  
                    {/* <div className="flex-1">
                      <h3 className="font-semibold">
                        {p.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Category: {p.category}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ₹{p.price}
                      </p>
                    </div> */}

                    {/* <div className="text-right">
                      <p className="font-semibold">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-pink-600">
                        ₹{p.price * item.quantity}
                      </p>
                    </div> */}
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">
                Total: ₹{order.totalAmount}
              </p>

              {order.status !== "PREPARED" && (
                <button
                  onClick={() => markPrepared(order._id)}
                  disabled={loadingId === order._id}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  {loadingId === order._id
                    ? "Updating..."
                    : "Mark as Prepared"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
