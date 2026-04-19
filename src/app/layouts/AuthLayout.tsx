import { Outlet, Link } from "react-router";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4">
      <Link to="/" className="mb-8">
        <div className="text-3xl tracking-tight" style={{ fontWeight: 600 }}>
          TRENDORA
        </div>
      </Link>
      <Outlet />
    </div>
  );
}
