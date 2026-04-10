import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="max-w-md text-center">
        <div className="text-9xl mb-6" style={{ fontWeight: 600, color: "#F59E0B" }}>
          404
        </div>
        <h1 className="text-3xl mb-4" style={{ fontWeight: 600 }}>
          Page Not Found
        </h1>
        <p className="text-[#6B7280] mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-[#111827] hover:bg-[#1F2937]">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/shop">
              <Search className="h-4 w-4 mr-2" />
              Browse Shop
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
