import { Link } from "react-router";
import { ArrowRight, Leaf, Recycle, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/product/ProductCard";
import { products } from "../data/products";

export function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.filter((p) => p.badge === "New");
  const organicProducts = products.filter((p) => p.badge === "Organic").slice(0, 4);
  const saleProducts = products.filter((p) => p.badge === "Sale");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#1F5D42] to-[#2A7557] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1762810555695-00ffdad1daca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBsaWZlc3R5bGUlMjBuYXR1cmFsJTIwZWFydGh8ZW58MXx8fHwxNzc1NzU1OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sustainable Fashion"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 600 }}>
              Thời trang Bền vững 2026
            </h1>
            <p className="text-xl text-[#E9D8A6] mb-8">
              Khám phá những sản phẩm thiết yếu bền vững được tạo ra cho cuộc sống có ý thức. Phong cách gặp gỡ trách nhiệm.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-[#E9D8A6] hover:bg-[#D4C292] text-[#1F5D42]"
              >
                <Link to="/shop/new">
                  Xem hàng mới
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/shop/organic">Bộ sưu tập Organic</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-[#F5F5F3]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1F5D42]/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-6 w-6 text-[#1F5D42]" />
              </div>
              <div>
                <h3 className="text-sm mb-1" style={{ fontWeight: 600 }}>
                  100% Organic
                </h3>
                <p className="text-sm text-[#6B7280]">Vải hữu cơ chứng nhận</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1F5D42]/10 flex items-center justify-center flex-shrink-0">
                <Recycle className="h-6 w-6 text-[#1F5D42]" />
              </div>
              <div>
                <h3 className="text-sm mb-1" style={{ fontWeight: 600 }}>
                  Vật liệu tái chế
                </h3>
                <p className="text-sm text-[#6B7280]">Giảm tác động môi trường</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1F5D42]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-[#1F5D42]" />
              </div>
              <div>
                <h3 className="text-sm mb-1" style={{ fontWeight: 600 }}>
                  Sản xuất đạo đức
                </h3>
                <p className="text-sm text-[#6B7280]">Công bằng cho người lao động</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-8 text-center" style={{ fontWeight: 600 }}>
            Mua sắm theo danh mục
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Áo thun Organic", path: "/shop/ao-thun", image: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdC1zaGlydCUyMHN1c3RhaW5hYmxlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzU3NTU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
              { name: "Áo hoodie tái chế", path: "/shop/ao-hoodie", image: "https://images.unsplash.com/photo-1575552356269-a624a8344126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMGhvb2RpZSUyMGVjbyUyMGNsb3RoaW5nfGVufDF8fHx8MTc3NTc1NTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
              { name: "Áo khoác bền vững", path: "/shop/ao-khoac", image: "https://images.unsplash.com/photo-1594587639781-a68a2796bb90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGphY2tldCUyMGdyZWVuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzU3NTU3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
              { name: "Phụ kiện Eco", path: "/shop/phu-kien", image: "https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW52YXMlMjB0b3RlJTIwYmFnJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzc1NzU1Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
            ].map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F5D42]/80 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl mb-1" style={{ fontWeight: 600 }}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#E9D8A6]">Khám phá bộ sưu tập</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl" style={{ fontWeight: 600 }}>
              Hàng mới về
            </h2>
            <Button asChild variant="ghost" className="text-[#1F5D42]">
              <Link to="/shop/new">
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Eco Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1F5D42] to-[#2A7557] rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-12 text-white">
                <h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>
                  Bộ sưu tập Organic
                </h2>
                <p className="text-xl mb-6 text-[#E9D8A6]">
                  Cotton hữu cơ 100%, được chứng nhận GOTS. Thoải mái, bền vững và thời trang.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E9D8A6] text-[#1F5D42] hover:bg-[#D4C292]"
                >
                  <Link to="/shop/organic">Khám phá ngay</Link>
                </Button>
              </div>
              <div className="h-80 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1643286131725-5e0ad3b3ca02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nJTIwb3JnYW5pYyUyMGNvdHRvbnxlbnwxfHx8fDE3NzU3NTU5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Organic Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-8 text-center" style={{ fontWeight: 600 }}>
            Sản phẩm nổi bật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Info */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-6" style={{ fontWeight: 600 }}>
              Cam kết của chúng tôi
            </h2>
            <p className="text-lg text-[#6B7280] mb-8">
              Tại EcoWear, chúng tôi tin rằng thời trang có thể vừa đẹp vừa bền vững. 
              Mỗi sản phẩm được tạo ra với sự quan tâm đến môi trường, 
              sử dụng vật liệu organic và tái chế, đảm bảo điều kiện lao động công bằng.
            </p>
            <Button asChild size="lg" className="bg-[#1F5D42] hover:bg-[#2A7557]">
              <Link to="/shop">Mua sắm bền vững</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
