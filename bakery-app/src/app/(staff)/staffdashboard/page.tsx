"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);
    useEffect(() => {
        if (!socket) return;

        socket.on("order-prepared", (data) => {
            console.log("🔔 Order prepared event:", data);

            if (soundEnabled && audioRef.current) {
                audioRef.current
                    .play()
                    .catch((err) => console.error("Audio blocked:", err));
            }
        });

        return () => {
            socket.off("order-prepared");
        };
    }, [soundEnabled]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/staff/order/get")
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

        await fetch("/api/chef/order/status", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, action }),
        });
        fetchOrders();

        alert("Order marked as delivered!");
    };



    return (
        <>
            <audio ref={audioRef} src="/Notification.mp3" />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    Staff Dashboard
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
                                        {order.items.map((item: any, index: number) => {
                                            const product = item.productId;
                                            if (!product) return null;

                                            return (
                                                <li key={`${product._id}-${index}`}>
                                                    {product.name} ({product.category}) × {item.quantity}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Total */}
                                <div className="mt-4 text-right">
                                    <p className="font-bold text-lg">
                                        Total: ₹{order.totalAmount}
                                    </p>
                                </div>

                                <button
                                    onClick={() => updateStatus(order._id, "DELIVERED")}

                                    className="bg-green-500 hover:bg-green-600  px-4 py-2 rounded-lg"
                                >
                                    Mark as Delivered
                                </button>


                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
