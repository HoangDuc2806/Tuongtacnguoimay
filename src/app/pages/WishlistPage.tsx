import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useStore } from "../store/useStore";
import { toast } from "sonner";

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success("Đã thêm vào giỏ hàng!");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="h-24 w-24 mx-auto mb-6 text-[#D4D4D4]" />
          <h2 className="text-2xl mb-4" style={{ fontWeight: 600 }}>
            Danh sách yêu thích trống
          </h2>
          <p className="text-[#6B7280] mb-8">
            Bắt đầu thêm các sản phẩm bạn yêu thích vào danh sách!
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
        Sản phẩm yêu thích ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-[#D4D4D4] overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-[3/4] bg-[#F5F5F3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <p className="text-xs text-[#6B7280] mb-1">{product.category}</p>
                <h3 className="text-sm mb-2 line-clamp-2" style={{ fontWeight: 500 }}>
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg" style={{ fontWeight: 600 }}>
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6B7280] line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-[#1F5D42] hover:bg-[#2A7557]"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Thêm vào giỏ
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Heart className="h-4 w-4 fill-[#1F5D42] text-[#1F5D42]" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* Dat Wishlist */