import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Chrome } from "lucide-react";
import { registerUser } from "../../utils/auth";

export function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const result = registerUser({
      firstName,
      lastName,
      email,
      password,
      phone: "",
    });

    alert(result.message);

    if (result.success) {
      navigate("/auth/login");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl border border-[#E5E7EB] p-8">
      <h2 className="text-2xl mb-2 text-center" style={{ fontWeight: 600 }}>
        Tạo tài khoản
      </h2>
      <p className="text-[#6B7280] text-center mb-8">
        Tham gia EcoWear và bắt đầu mua sắm
      </p>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Tên</Label>
            <Input
              id="firstName"
              placeholder="Duc"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Họ</Label>
            <Input
              id="lastName"
              placeholder="Hoang"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Địa chỉ email</Label>
          <Input
            id="email"
            type="email"
            placeholder="abc@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" required className="mt-1" />
          <Label htmlFor="terms" className="text-sm text-[#6B7280] cursor-pointer">
            Tôi đồng ý với{" "}
            <a href="#" className="text-[#F59E0B] hover:underline">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#" className="text-[#F59E0B] hover:underline">
              Chính sách bảo mật
            </a>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#111827] hover:bg-[#1F2937]"
          size="lg"
        >
          Tạo tài khoản
        </Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-sm text-[#6B7280]">OR</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full" size="lg" type="button">
        <Chrome className="h-5 w-5 mr-2" />
        Sign up with Google
      </Button>

      <p className="text-center text-sm text-[#6B7280] mt-6">
        Đã có tài khoản?{" "}
        <Link to="/auth/login" className="text-[#F59E0B] hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
