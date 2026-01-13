import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProductPage from "./pages/Product/ProductPage";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import BecomeVendorPage from "./pages/BecomeVendor/BecomeVendorPage";
import TermsConditionsPage from "./pages/TermsConditions/TermsConditionsPage";
import ReturnRefundPolicyPage from "./pages/ReturnRefundPolicy/ReturnRefundPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicy/CookiePolicyPage";
import BillingShippingPolicyPage from "./pages/BillingShippingPolicy/BillingShippingPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicyPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import DashboardPage from "./pages/UserDashboard/DashboardPage";
import ProfilePage from "./pages/UserDashboard/ProfilePage";
import InvoicePage from "./pages/UserDashboard/InvoicePage";
import ShopPage from "./pages/Home/ShopPage";
import { useEffect, useState } from "react";
import VisitPopup from "./components/Modal/VisitPopup";
import RightWidget from "./components/Widget/RightWiget";
import DisclaimerPage from "./pages/Disclaimer/DisclaimerPage";
import OrderSuccessPage from "./pages/Order/OrderSuccessPage";
import BottomTab from "./components/BottomTab/BottomTab";

const App = () => {
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  window.openVisitPopup = () => setOpenPopup(true);

  useEffect(() => {
    setTimeout(() => {
      if (window.initUI) window.initUI();
    }, 300);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <VisitPopup open={openPopup} setOpen={setOpenPopup} onClose={() => setOpenPopup(false)} />
      <RightWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/products" element={<ProductPage key={location.search} />} />
        <Route path="/product-detail/:slug" element={<ProductDetailPage key={location.search} />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-detail/:slug" element={<BlogDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/become-dealer" element={<BecomeVendorPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/return-refund-policy" element={<ReturnRefundPolicyPage />} />
        <Route path="/billing-shipping-policy" element={<BillingShippingPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomTab />
    </>
  );
};

export default App;
