import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Product } from "../../store/useStore";
import { useStore } from "../../store/useStore";
import { toast } from "sonner";
import { cn } from "../ui/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden border border-[#D4D4D4] hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badge */}
          {product.badge && (
            <Badge
              className={cn(
                "absolute top-3 left-3 px-3 py-1",
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

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist && "fill-[#1F5D42] text-[#1F5D42]"
              )}
            />
          </Button>

          {/* Quick Actions - Visible on Hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              className="w-full bg-[#1F5D42] hover:bg-[#2A7557] text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Thêm vào giỏ
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-[#6B7280] mb-1">{product.category}</p>
          <h3 className="text-sm mb-2 line-clamp-2" style={{ fontWeight: 500 }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-[#1F5D42] text-[#1F5D42]"
                    : "text-[#D4D4D4]"
                )}
              />
            ))}
            <span className="text-xs text-[#6B7280] ml-1">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg" style={{ fontWeight: 600 }}>
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#6B7280] line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}