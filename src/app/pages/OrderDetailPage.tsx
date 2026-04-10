import { useParams, Link } from "react-router";
import { Package, Truck, CheckCircle, MapPin, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

export function OrderDetailPage() {
  const { id } = useParams();

  const order = {
    id: id || "ORD-001",
    date: "2026-04-05",
    status: "đã giao",
    total: 159.98,
    subtotal: 139.98,
    shipping: 10,
    tax: 10,
    items: [
      {
        id: "1",
        name: "Áo phông trắng kích cỡ lớn",
        price: 29.99,
        quantity: 2,
        size: "L",
        color: "White",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
      },
      {
        id: "3",
        name: "Áo Hoodie Đen Tối Giản",
        price: 59.99,
        quantity: 1,
        size: "M",
        color: "Black",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
      },
    ],
    shippingAddress: {
      name: "Duy Quy",
      address: "123 Hung Vuong",
      city: "Da Nang",
      state: "Dn",
      zip: "50000",
    },
    trackingSteps: [
      { status: "Đã đặt hàng", date: "Apr 5, 10:30 AM", completed: true },
      { status: "Đơn hàng đã xác nhận", date: "Apr 5, 11:00 AM", completed: true },
      { status: "Đang xử lý", date: "Apr 5, 2:00 PM", completed: true },
      { status: "Đã gửi hàng", date: "Apr 6, 9:00 AM", completed: true },
      { status: "Đang giao hàng", date: "Apr 7, 8:00 AM", completed: true },
      { status: "Đã giao", date: "Apr 7, 2:30 PM", completed: true },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/orders" className="text-sm text-[#F59E0B] hover:underline">
          ← Quay lại Đơn hàng
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
                  Đặt hàng {order.id}
                </h1>
                <p className="text-sm text-[#6B7280]">
                  Đặt trên {new Date(order.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="px-4 py-2 bg-[#10B981] text-white rounded-lg">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Theo dõi đơn hàng
            </h2>

            <div className="space-y-4">
              {order.trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-[#10B981] text-white"
                          : "bg-[#E5E7EB] text-[#6B7280]"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    {index < order.trackingSteps.length - 1 && (
                      <div className="w-0.5 h-12 bg-[#E5E7EB]" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-sm" style={{ fontWeight: 500 }}>
                      {step.status}
                    </p>
                    <p className="text-sm text-[#6B7280]">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Mục đơn hàng
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm mb-1" style={{ fontWeight: 500 }}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-2">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-[#6B7280]">Qty: {item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ fontWeight: 600 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Subtotal</span>
                <span style={{ fontWeight: 500 }}>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Shipping</span>
                <span style={{ fontWeight: 500 }}>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Tax</span>
                <span style={{ fontWeight: 500 }}>${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span style={{ fontWeight: 600 }}>Total</span>
                <span className="text-xl" style={{ fontWeight: 600 }}>
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[#F59E0B]" />
              <h2 className="text-lg" style={{ fontWeight: 600 }}>
                Địa chỉ giao hàng
              </h2>
            </div>
            <div className="text-sm text-[#6B7280] space-y-1">
              <p style={{ fontWeight: 500, color: "#111827" }}>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" variant="outline">
              Tải hóa đơn
            </Button>
            <Button className="w-full" variant="outline">
              Liên hệ Hỗ trợ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
