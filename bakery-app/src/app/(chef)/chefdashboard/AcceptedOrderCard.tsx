// components/AcceptedOrderCard.tsx
import { CheckCircle2, Clock } from "lucide-react";

type AcceptedOrderCardProps = {
  order: any;
  onMarkPrepared: (orderId: string) => void;
  loadingId: string | null;
};

export function AcceptedOrderCard({ order, onMarkPrepared, loadingId }: AcceptedOrderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold text-gray-900">
          Order #{order._id.slice(-6).toUpperCase()}
        </h2>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          ACCEPTED
        </span>
      </div>

      {/* Accepted Time */}
      <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
        <Clock className="w-4 h-4" />
        Accepted: {new Date(order.updatedAt).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </p>

      {/* Items - Compact */}
      <div className="space-y-3 mb-1">
        {order.items.map((item: any) => {
          const p = item.productId;
          return (
            <div
              key={item._id}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{p.name}</h3>
                <p className="text-xs text-gray-600">
                  {item.quantity} × ₹{p.price.toLocaleString()}
                </p>
              </div>
              <p className="font-bold text-pink-600">
                ₹{(p.price * item.quantity).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-3 border-t border-gray-300 mb-1">
        <span className="text-lg font-bold text-gray-800">Total</span>
        <span className="text-xl font-extrabold text-gray-900">
          ₹{order.totalAmount.toLocaleString()}
        </span>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onMarkPrepared(order._id)}
        disabled={loadingId === order._id}
        className="max-w-1/2 mx-auto py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 
                   hover:from-green-700 hover:to-emerald-700
                   disabled:from-gray-400 disabled:to-gray-500
                   text-white font-bold rounded-xl shadow-md hover:shadow-lg
                   transform hover:-translate-y-0.5 transition-all duration-200
                   flex items-center justify-center gap-2 text-base
                   disabled:cursor-not-allowed disabled:transform-none"
      >
        {loadingId === order._id ? (
          "Preparing..."
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Mark as Prepared
          </>
        )}
      </button>
    </div>
  );
}