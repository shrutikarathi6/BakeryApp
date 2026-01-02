"use client";
import { Clock, Package, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { PlacedOrderCard } from "./PlacedOrderCard";
import { AcceptedOrderCard } from "./AcceptedOrderCard";

export default function ChefDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const placedOrders = orders.filter((o) => o.status === "PLACED");
  const acceptedOrders = orders.filter((o) => o.status === "ACCEPTED");

  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("new-order", () => {
      if (soundEnabled) {
        audioRef.current?.play();
      }
    });
    return () => {
      socket.off("new-order");
    };
  }, [soundEnabled]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/chef/order/get");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
   
  }, []);

  const updateStatus = async (orderId: string, action: string) => {
    setLoadingId(orderId);

    await fetch("/api/chef/order/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, action }),
    });

    setLoadingId(null);
    fetchOrders(); // refresh orders list
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <audio ref={audioRef} src="/Notification.mp3" />
      <h1 className="text-2xl font-bold mb-6">
        Chef Dashboard 👨‍🍳
      </h1>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: PLACED ORDERS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-yellow-700 flex items-center gap-3">
            Placed Orders 
            <span className="text-lg font-normal text-gray-600">({placedOrders.length})</span>
          </h2>

          {placedOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow">
              No new orders yet. Relax! ☕
            </div>
          ) : (
            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
              {placedOrders.map((order) => (
                <PlacedOrderCard
                  key={order._id}
                  order={order}
                  onUpdateStatus={updateStatus}
                  loadingId={loadingId}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: ACCEPTED ORDERS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-3">
            Accepted Orders ✅
            <span className="text-lg font-normal text-gray-600">({acceptedOrders.length})</span>
          </h2>

          {acceptedOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow">
              No orders in preparation.
            </div>
          ) : (
            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
              {acceptedOrders.map((order) => (
                <AcceptedOrderCard
                  key={order._id}
                  order={order}
                  onMarkPrepared={(id) => updateStatus(id, "PREPARED")}
                  loadingId={loadingId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}
