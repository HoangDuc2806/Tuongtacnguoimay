import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { ProductCard } from "../components/product/ProductCard";
import { products, getCategoryProducts } from "../data/products";

type SortOption = "relevance" | "newest" | "price-low" | "price-high" | "best-selling";

export function ShopPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1200000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const categoryProducts = getCategoryProducts(category);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes?.some((size) => selectedSizes.includes(size))
      );
    }

    // Badge filter
    if (selectedBadges.length > 0) {
      filtered = filtered.filter((p) =>
        p.badge && selectedBadges.includes(p.badge)
      );
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort((a, b) => (b.badge === "New" ? 1 : -1));
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [categoryProducts, searchQuery, selectedCategories, priceRange, selectedSizes, selectedBadges, sortBy]);

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>
          Danh mục
        </h3>
        <div className="space-y-2">
          {["Áo thun", "Áo hoodie", "Áo khoác", "Áo polo", "Áo sơ mi", "Quần", "Váy", "Giày", "Phụ kiện"].map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(
                    checked
                      ? [...selectedCategories, cat]
                      : selectedCategories.filter((c) => c !== cat)
                  );
                }}
              />
              <Label htmlFor={cat} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Badges */}
      <div>
        <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>
          Chứng nhận Eco
        </h3>
        <div className="space-y-2">
          {["Organic", "Recycled", "New", "Sale", "Best Seller"].map((badge) => (
            <div key={badge} className="flex items-center space-x-2">
              <Checkbox
                id={badge}
                checked={selectedBadges.includes(badge)}
                onCheckedChange={(checked) => {
                  setSelectedBadges(
                    checked
                      ? [...selectedBadges, badge]
                      : selectedBadges.filter((b) => b !== badge)
                  );
                }}
              />
              <Label htmlFor={badge} className="text-sm cursor-pointer">
                {badge}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>
          Khoảng giá
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1200000}
          step={50000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-[#6B7280]">
          <span>{(priceRange[0] / 1000).toFixed(0)}k₫</span>
          <span>{(priceRange[1] / 1000).toFixed(0)}k₫</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>
          Kích cỡ
        </h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedSizes(
                  selectedSizes.includes(size)
                    ? selectedSizes.filter((s) => s !== size)
                    : [...selectedSizes, size]
                );
              }}
              className={selectedSizes.includes(size) ? "bg-[#1F5D42] hover:bg-[#2A7557]" : ""}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 1200000]);
          setSelectedSizes([]);
          setSelectedBadges([]);
        }}
      >
        <X className="h-4 w-4 mr-2" />
        Xóa bộ lọc
      </Button>
    </div>
  );

  const getCategoryTitle = () => {
    const categoryMap: Record<string, string> = {
      "new": "Hàng mới về",
      "sale": "Khuyến mãi",
      "organic": "Bộ sưu tập Organic",
      "recycled": "Vật liệu tái chế",
      "ao-thun": "Áo thun",
      "ao-hoodie": "Áo hoodie",
      "ao-khoac": "Áo khoác",
      "quan": "Quần",
      "giay": "Giày",
      "phu-kien": "Phụ kiện",
    };
    return category ? categoryMap[category] || "Tất cả sản phẩm" : "Tất cả sản phẩm";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2" style={{ fontWeight: 600 }}>
          {getCategoryTitle()}
        </h1>
        {searchQuery && (
          <p className="text-[#6B7280]">Kết quả tìm kiếm cho "{searchQuery}"</p>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Bộ lọc</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>

          <p className="text-sm text-[#6B7280]">
            {filteredProducts.length} sản phẩm
          </p>
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Liên quan</SelectItem>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
            <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
            <SelectItem value="best-selling">Bán chạy nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl border border-[#D4D4D4] p-6">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Bộ lọc
            </h2>
            <FilterPanel />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6B7280] text-lg mb-4">Không tìm thấy sản phẩm</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 1200000]);
                  setSelectedSizes([]);
                  setSelectedBadges([]);
                }}
              >
                Xóa tất cả bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
