"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../navbar/AdminNavbar";
export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/order/get")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Prepared Orders (Admin View)
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-500">
            No prepared orders yet.
          </p>
        )}

        <div className="space-y-6">
          {orders.map((order) => {
            const placed = new Date(order.orderPlacedAt);
            const prepared = new Date(order.orderPreparedAt);
            const minutes =
              Math.round(
                (prepared.getTime() - placed.getTime()) / 60000
              ) || 0;

            return (
              <div
                key={order._id}
                className="bg-white shadow rounded-xl p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    PREPARED
                  </span>
                </div>

                {/* Timing */}
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    Received:{" "}
                    {placed.toLocaleString()}
                  </p>
                  <p>
                    Prepared:{" "}
                    {prepared.toLocaleString()}
                  </p>
                  <p className="font-semibold mt-1">
                    Preparation Time: {minutes} minutes
                  </p>
                </div>

                {/* Customer Details */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">
                    Delivery Details
                  </h3>

                  <p>Name: {order.customer.name}</p>
                  <p>Phone: {order.customer.phone}</p>
                  {order.customer.email && (
                    <p>Email: {order.customer.email}</p>
                  )}
                  <p>Address: {order.customer.address}</p>
                </div>

                {/* Items Summary */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">
                    Items
                  </h3>

                  <ul className="text-sm space-y-1">
                    {order.items.map((item: any) => (
                      <li key={item._id}>
                        {item.productId.name} (
                        {item.productId.category}) ×{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total */}
                <div className="mt-4 text-right">
                  <p className="font-bold text-lg">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
