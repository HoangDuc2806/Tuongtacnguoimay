import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Chrome } from "lucide-react";
import { loginUser } from "../../utils/auth";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginUser(email, password);

    alert(result.message);

    if (result.success) {
      navigate("/profile");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl border border-[#E5E7EB] p-8">
      <h2 className="text-2xl mb-2 text-center" style={{ fontWeight: 600 }}>
        Chào mừng quay trở lại
      </h2>
      <p className="text-[#6B7280] text-center mb-8">
        Đăng nhập vào tài khoản để tiếp tục
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-[#F59E0B] hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#111827] hover:bg-[#1F2937]"
          size="lg"
        >
          Đăng nhập
        </Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-sm text-[#6B7280]">OR</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full" size="lg" type="button">
        <Chrome className="h-5 w-5 mr-2" />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-[#6B7280] mt-6">
        Chưa có tài khoản?{" "}
        <Link to="/auth/register" className="text-[#F59E0B] hover:underline">
          Tạo tài khoản
        </Link>
      </p>
    </div>
  );
}
