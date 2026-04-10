import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Mail, CheckCircle } from "lucide-react";

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl border border-[#E5E7EB] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-[#10B981]" />
        </div>
        <h2 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
          Kiểm tra email của bạn
        </h2>
        <p className="text-[#6B7280] mb-8">
          Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến địa chỉ email của bạn.
        </p>
        <Button asChild className="w-full bg-[#111827] hover:bg-[#1F2937]" size="lg">
          <Link to="/auth/login">Quay lại Đăng nhập</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl border border-[#E5E7EB] p-8">
      <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-6">
        <Mail className="h-8 w-8 text-[#F59E0B]" />
      </div>
      <h2 className="text-2xl mb-2 text-center" style={{ fontWeight: 600 }}>
        Quên mật khẩu?
      </h2>
      <p className="text-[#6B7280] text-center mb-8">
        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Địa chỉ Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="abc@example.com"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#111827] hover:bg-[#1F2937]"
          size="lg"
        >
          Gửi Liên kết Đặt lại
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B7280] mt-6">
        Nhớ mật khẩu của bạn không?{" "}
        <Link to="/auth/login" className="text-[#F59E0B] hover:underline">
          Quay lại đăng nhập
        </Link>
      </p>
    </div>
  );
}
