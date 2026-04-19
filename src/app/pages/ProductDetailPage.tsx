import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Heart, Star, Minus, Plus, ShoppingCart, Truck, Shield, RefreshCw, Leaf } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { ProductCard } from "../components/product/ProductCard";
import { products } from "../data/products";
import { useStore } from "../store/useStore";
import { toast } from "sonner";
import { cn } from "../components/ui/utils";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">Không tìm thấy sản phẩm</h2>
        <Button onClick={() => navigate("/shop")}>Quay lại cửa hàng</Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error("Vui lòng chọn màu sắc");
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } else {
      addToWishlist(product);
      toast.success("Đã thêm vào danh sách yêu thích!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-8">
        <Link to="/" className="hover:text-[#1F5D42]">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#1F5D42]">
          Cửa hàng
        </Link>
        <span>/</span>
        <span className="text-[#2B2B2B]">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F5F5F3]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge
                className={cn(
                  "absolute top-4 left-4 px-3 py-1",
                  product.badge === "Sale" && "bg-[#EF4444] hover:bg-[#DC2626]",
                  product.badge === "New" && "bg-[#1F5D42] hover:bg-[#2A7557]",
                  product.badge === "Organic" && "bg-[#A3B18A] text-[#2B2B2B] hover:bg-[#8FA177]",
                  product.badge === "Recycled" && "bg-[#E9D8A6] text-[#2B2B2B] hover:bg-[#D4C292]",
                  product.badge === "Best Seller" && "bg-[#1F5D42] hover:bg-[#2A7557]"
                )}
              >
                {product.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-[#6B7280] mb-2">{product.category}</p>
            <h1 className="text-3xl mb-2" style={{ fontWeight: 600 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-[#1F5D42] text-[#1F5D42]"
                        : "text-[#D4D4D4]"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-[#6B7280]">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl" style={{ fontWeight: 600 }}>
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[#6B7280] line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                  <Badge className="bg-[#EF4444] hover:bg-[#DC2626]">
                    Tiết kiệm {(product.originalPrice - product.price).toLocaleString('vi-VN')}₫
                  </Badge>
                </>
              )}
            </div>

            <p className="text-[#6B7280] mb-6">{product.description}</p>
          </div>

          <Separator className="my-6" />

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm" style={{ fontWeight: 600 }}>
                  Kích cỡ
                </label>
                <button className="text-sm text-[#1F5D42]">Hướng dẫn chọn size</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? "bg-[#1F5D42] hover:bg-[#2A7557]" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <label className="text-sm mb-3 block" style={{ fontWeight: 600 }}>
                Màu sắc: {selectedColor || "Chọn màu"}
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === color
                        ? "border-[#1F5D42] bg-[#1F5D42]/10"
                        : "border-[#D4D4D4] hover:border-[#A3B18A]"
                    }`}
                  >
                    <span className="text-sm">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-sm mb-3 block" style={{ fontWeight: 600 }}>
              Số lượng
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D4D4D4] rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-[#6B7280]">
                ({product.inStock ? "Còn hàng" : "Hết hàng"})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              size="lg"
              className="flex-1 bg-[#1F5D42] hover:bg-[#2A7557]"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  inWishlist && "fill-[#1F5D42] text-[#1F5D42]"
                )}
              />
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-3 text-sm bg-[#F5F5F3] rounded-xl p-4">
            <div className="flex items-center gap-3 text-[#6B7280]">
              <Truck className="h-5 w-5 text-[#1F5D42]" />
              <span>Miễn phí vận chuyển cho đơn trên 999.000₫</span>
            </div>
            <div className="flex items-center gap-3 text-[#6B7280]">
              <RefreshCw className="h-5 w-5 text-[#1F5D42]" />
              <span>Chính sách đổi trả trong 30 ngày</span>
            </div>
            <div className="flex items-center gap-3 text-[#6B7280]">
              <Shield className="h-5 w-5 text-[#1F5D42]" />
              <span>Thanh toán an toàn</span>
            </div>
            <div className="flex items-center gap-3 text-[#6B7280]">
              <Leaf className="h-5 w-5 text-[#1F5D42]" />
              <span>Sản phẩm bền vững, thân thiện môi trường</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F5D42]"
          >
            Mô tả sản phẩm
          </TabsTrigger>
          <TabsTrigger
            value="sustainability"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F5D42]"
          >
            Tính bền vững
          </TabsTrigger>
          <TabsTrigger
            value="care"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F5D42]"
          >
            Hướng dẫn bảo quản
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F5D42]"
          >
            Đánh giá ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-[#6B7280] mb-6">{product.description}</p>
            <h3 className="mt-6 mb-3" style={{ fontWeight: 600 }}>Đặc điểm nổi bật</h3>
            <ul className="text-[#6B7280] space-y-2">
              <li>Chất liệu cao cấp từ nguồn bền vững</li>
              <li>Form dáng thoải mái, phù hợp vóc dáng người Việt</li>
              <li>Có thể giặt máy, dễ dàng bảo quản</li>
              <li>Nhiều size và màu sắc lựa chọn</li>
              <li>Sản xuất đạo đức với điều kiện lao động công bằng</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="sustainability" className="mt-6">
          <div className="text-[#6B7280] space-y-4">
            <div className="bg-[#F5F5F3] p-4 rounded-lg">
              <h4 className="text-[#1F5D42] mb-2" style={{ fontWeight: 600 }}>
                🌱 Vật liệu thân thiện môi trường
              </h4>
              <p>
                {product.badge === "Organic" 
                  ? "Sản phẩm được làm từ cotton hữu cơ 100%, được chứng nhận GOTS (Global Organic Textile Standard)."
                  : product.badge === "Recycled"
                  ? "Sản phẩm được làm từ 80% vật liệu tái chế, giúp giảm thiểu rác thải và tiết kiệm tài nguyên."
                  : "Sản phẩm được làm từ vật liệu bền vững, thân thiện với môi trường."}
              </p>
            </div>
            <div className="bg-[#F5F5F3] p-4 rounded-lg">
              <h4 className="text-[#1F5D42] mb-2" style={{ fontWeight: 600 }}>
                💧 Tiết kiệm nước
              </h4>
              <p>Quy trình sản xuất của chúng tôi sử dụng 70% ít nước hơn so với phương pháp truyền thống.</p>
            </div>
            <div className="bg-[#F5F5F3] p-4 rounded-lg">
              <h4 className="text-[#1F5D42] mb-2" style={{ fontWeight: 600 }}>
                ♻️ Tuần hoàn
              </h4>
              <p>Bao bì của chúng tôi có thể tái chế 100%. Chúng tôi khuyến khích bạn tái sử dụng và tái chế.</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="care" className="mt-6">
          <div className="text-[#6B7280] space-y-4">
            <h3 style={{ fontWeight: 600 }} className="text-[#2B2B2B]">Hướng dẫn giặt và bảo quản:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Giặt máy ở nhiệt độ tối đa 30°C</li>
              <li>Không sử dụng chất tẩy mạnh</li>
              <li>Phơi ở nơi thoáng mát, tránh ánh nắng trực tiếp</li>
              <li>Là ở nhiệt độ vừa phải nếu cần</li>
              <li>Không giặt khô</li>
              <li>Nên giặt với màu tương tự ở lần giặt đầu tiên</li>
            </ul>
            <p className="mt-4">
              <strong>Mẹo:</strong> Giặt ở nhiệt độ thấp và phơi tự nhiên sẽ giúp kéo dài tuổi thọ sản phẩm và tiết kiệm năng lượng.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <p className="text-[#6B7280]">Đánh giá của khách hàng sẽ được hiển thị ở đây.</p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl mb-6" style={{ fontWeight: 600 }}>
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
