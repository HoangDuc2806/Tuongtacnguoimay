import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { WishlistPage } from "./pages/WishlistPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "shop", Component: ShopPage },
      { path: "shop/:category", Component: ShopPage },
      { path: "product/:id", Component: ProductDetailPage },
      { path: "wishlist", Component: WishlistPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "orders", Component: OrdersPage },
      { path: "orders/:id", Component: OrderDetailPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
