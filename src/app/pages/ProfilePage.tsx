import { useEffect, useState } from "react";
import { User, MapPin, CreditCard, Settings, Heart, Package, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { getCurrentUser, logoutUser } from "../utils/auth";

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate("/auth/login");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8" style={{ fontWeight: 600 }}>
        Tài khoản của tôi
      </h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full bg-[#F59E0B] flex items-center justify-center text-white text-2xl"
                style={{ fontWeight: 600 }}
              >
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm mb-1" style={{ fontWeight: 600 }}>
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-[#6B7280]">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a
                href="#profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <User className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Hồ sơ</span>
              </a>

              <Link
                to="/orders"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Package className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Đơn hàng</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Heart className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Yêu thích</span>
              </Link>

              <a
                href="#addresses"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <MapPin className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Địa chỉ</span>
              </a>

              <a
                href="#payment"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <CreditCard className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Phương thức thanh toán</span>
              </a>

              <a
                href="#settings"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Settings className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm">Cài đặt</span>
              </a>

              <Separator className="my-4" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors w-full text-left text-[#EF4444]"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Đăng xuất</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="addresses">Địa chỉ</TabsTrigger>
              <TabsTrigger value="payment">Phương thức thanh toán</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>
                  Thông tin cá nhân
                </h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Tên</Label>
                      <Input id="firstName" value={user.firstName} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Họ</Label>
                      <Input id="lastName" value={user.lastName} readOnly />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Địa chỉ email</Label>
                    <Input id="email" type="email" value={user.email} readOnly />
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="tel" value={user.phone || ""} readOnly />
                  </div>

                  <Separator />

                  <h3 className="text-lg" style={{ fontWeight: 600 }}>
                    Đổi mật khẩu
                  </h3>

                  <div>
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button className="bg-[#111827] hover:bg-[#1F2937]">
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addresses">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl" style={{ fontWeight: 600 }}>
                    Địa chỉ đã lưu
                  </h2>
                  <Button className="bg-[#111827] hover:bg-[#1F2937]">
                    Thêm địa chỉ mới
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm mb-1" style={{ fontWeight: 600 }}>
                          Home
                        </h3>
                        <p className="text-sm text-[#6B7280]">123 Xô viết nghệ tỉnh</p>
                        <p className="text-sm text-[#6B7280]">Đà Nẵng, ĐN 50000</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-[#EF4444]">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl" style={{ fontWeight: 600 }}>
                    Payment Methods
                  </h2>
                  <Button className="bg-[#111827] hover:bg-[#1F2937]">
                    Thêm thẻ
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-[#6B7280]" />
                        <div>
                          <p className="text-sm" style={{ fontWeight: 600 }}>
                            •••• •••• •••• 4242
                          </p>
                          <p className="text-sm text-[#6B7280]">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#EF4444]">
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>
                  Tùy chọn thông báo
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
                    <div>
                      <p className="text-sm" style={{ fontWeight: 500 }}>
                        Cập nhật đơn hàng
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Nhận thông báo về đơn hàng của bạn
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
                    <div>
                      <p className="text-sm" style={{ fontWeight: 500 }}>
                        Khuyến mãi & ưu đãi
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Nhận thông báo về khuyến mãi và ưu đãi độc quyền
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm" style={{ fontWeight: 500 }}>
                        Bản tin
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Mẹo phối đồ hàng tuần và sản phẩm mới
                      </p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
