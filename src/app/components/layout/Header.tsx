import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useStore } from "../../store/useStore";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cart, wishlist } = useStore();

  const categories = [
    { name: "Hàng mới", path: "/shop/new" },
    { name: "Organic", path: "/shop/organic" },
    { name: "Tái chế", path: "/shop/recycled" },
    { name: "Áo thun", path: "/shop/ao-thun" },
    { name: "Áo hoodie", path: "/shop/ao-hoodie" },
    { name: "Áo khoác", path: "/shop/ao-khoac" },
    { name: "Khuyến mãi", path: "/shop/sale" },
    { name: "Best Seller", path: "/shop/Best Seller" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/shop?search=${encodeURIComponent(searchQuery)}`,
      );
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D4D4D4]">
      {/* Top Bar */}
      <div className="bg-[#1F5D42] text-white py-2 px-4 text-center text-sm">
        <p>
          Miễn phí vận chuyển eco cho đơn hàng trên 999.000₫ | Bộ sưu tập Bền vững 2026
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div
              className="text-2xl tracking-tight text-[#1F5D42]"
              style={{ fontWeight: 600 }}
            >
              EcoWear
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-sm hover:text-[#1F5D42] transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#F5F5F3] border-[#D4D4D4]"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#1F5D42] text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#1F5D42] text-xs">
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  )}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="hidden sm:flex"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form
          onSubmit={handleSearch}
          className="md:hidden mt-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#F5F5F3] border-[#D4D4D4]"
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D4D4D4] bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-sm hover:text-[#1F5D42] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className="text-sm hover:text-[#1F5D42] transition-colors py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Tài khoản
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}