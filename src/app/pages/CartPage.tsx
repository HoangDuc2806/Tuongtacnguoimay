import { Link, useNavigate } from "react-router";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useStore } from "../store/useStore";
import { toast } from "sonner";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-[#D4D4D4]" />
          <h2 className="text-2xl mb-4" style={{ fontWeight: 600 }}>
            Giỏ hàng trống
          </h2>
          <p className="text-[#6B7280] mb-8">
            Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm!
          </p>
          <Button asChild className="bg-[#1F5D42] hover:bg-[#2A7557]">
            <Link to="/shop">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8" style={{ fontWeight: 600 }}>
        Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-white rounded-xl border border-[#D4D4D4] p-4 flex gap-4"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm mb-1 line-clamp-2" style={{ fontWeight: 600 }}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-2">{item.category}</p>
                </Link>

                {(item.selectedSize || item.selectedColor) && (
                  <div className="flex gap-3 text-xs text-[#6B7280] mb-3">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && <span>Màu: {item.selectedColor}</span>}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-[#D4D4D4] rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg" style={{ fontWeight: 600 }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success("Đã xóa khỏi giỏ hàng");
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-[#EF4444]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F3] rounded-xl border border-[#D4D4D4] p-6 sticky top-24">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Tổng đơn hàng
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Tạm tính</span>
                <span style={{ fontWeight: 500 }}>{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Phí vận chuyển</span>
                <span style={{ fontWeight: 500 }}>
                  {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString('vi-VN')}₫`}
                </span>
              </div>
              {subtotal < 999000 && (
                <p className="text-xs text-[#6B7280]">
                  Mua thêm {(999000 - subtotal).toLocaleString('vi-VN')}₫ để được miễn phí vận chuyển
                </p>
              )}
              <Separator />
              <div className="flex justify-between">
                <span style={{ fontWeight: 600 }}>Tổng cộng</span>
                <span className="text-xl text-[#1F5D42]" style={{ fontWeight: 600 }}>
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input placeholder="Mã giảm giá" />
                <Button variant="outline">Áp dụng</Button>
              </div>
            </div>

            <Button
              className="w-full bg-[#1F5D42] hover:bg-[#2A7557] mb-3"
              size="lg"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành thanh toán
            </Button>

            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <Link to="/shop">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
