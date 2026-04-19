import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="bg-[#1F5D42] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>
              EcoWear
            </h3>
            <p className="text-[#A3B18A] text-sm mb-4">
              Thời trang bền vững cho cuộc sống có ý thức. Chúng tôi tin vào việc tạo ra những sản phẩm thân thiện với môi trường mà không làm giảm phong cách.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm mb-4" style={{ fontWeight: 600 }}>
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B18A]">
              <li>
                <Link to="/shop" className="hover:text-[#E9D8A6] transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/shop/new" className="hover:text-[#E9D8A6] transition-colors">
                  Hàng mới
                </Link>
              </li>
              <li>
                <Link to="/shop/organic" className="hover:text-[#E9D8A6] transition-colors">
                  Organic
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#E9D8A6] transition-colors">
                  Theo dõi đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm mb-4" style={{ fontWeight: 600 }}>
              Dịch vụ khách hàng
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B18A]">
              <li>
                <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                  Vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                  Đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                  Hướng dẫn chọn size
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9D8A6] transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm mb-4" style={{ fontWeight: 600 }}>
              Đăng ký nhận tin
            </h3>
            <p className="text-[#A3B18A] text-sm mb-4">
              Nhận thông tin về sản phẩm bền vững mới và ưu đãi độc quyền.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="bg-[#2A7557] border-[#3D8B6D] text-white placeholder:text-[#A3B18A]"
              />
              <Button className="bg-[#E9D8A6] hover:bg-[#D4C292] text-[#1F5D42]">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#2A7557] mt-12 pt-8 text-center text-sm text-[#A3B18A]">
          <p>&copy; 2026 EcoWear. Tất cả quyền được bảo lưu.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-[#E9D8A6] transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-[#E9D8A6] transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="#" className="hover:text-[#E9D8A6] transition-colors">
              Chính sách cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}