import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import AddSubCategoryPage from './pages/SubCategory/AddSubCategoryPage';
import AddSubSubCategoryPage from './pages/SubSubCategory/AddSubSubCategoryPage';
import CategoryListPage from './pages/Category/CategoryListPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/LoginPage';
import { useAuth } from './context/auth.context';
import UpdateCategoryPage from './pages/Category/UpdateCategoryPage';
import SubCategoryListPage from './pages/SubCategory/SubCategoryListPage';
import UpdateSubCategoryPage from './pages/SubCategory/UpdateSubCategoryPage';
import SubSubCategoryListPage from './pages/SubSubCategory/SubSubCategoryListPage';
import UpdateSubSubCategoryPage from './pages/SubSubCategory/UpdateSubSubCategoryPage';
import AddColorPage from './pages/Color/AddColorPage';
import ColorListPage from './pages/Color/ColorListPage';
import UpdateColorPage from './pages/Color/UpdateColorPage';
import BrandListPage from './pages/Brand/BrandListPage';
import AddBrandPage from './pages/Brand/AddBrandPage';
import UpdateBrandPage from './pages/Brand/UpdateBrandPage';
import AddProductPage from './pages/Product/AddProductPage';
import SizeListPage from './pages/Size/SizeListPage';
import AddSizePage from './pages/Size/AddSizePage';
import UpdateSizePage from './pages/Size/UpdateSizePage';
import Test from './Test';
import ProductListPage from './pages/Product/ProductListPage';
import UpdateProductPage from './pages/Product/UpdateProductPage';
import CarouselListPage from './pages/WebsiteHome/Carousel/CarouselListPage';
import CarouselFormPage from './pages/WebsiteHome/Carousel/CarouselFormPage';
import YouTubeVideoListPage from './pages/WebsiteHome/YouTubeVideo/YouTubeVideoListPage';
import YouTubeVideoFormPage from './pages/WebsiteHome/YouTubeVideo/YouTubeVideoForm';
import TestimonialListPage from './pages/WebsiteHome/Testimonial/TestimonialListPage';
import TestimonialFormPage from './pages/WebsiteHome/Testimonial/TestimonialFormPage';
import ClientListPage from './pages/WebsiteHome/Client/ClientListPage';
import ClientFormPage from './pages/WebsiteHome/Client/ClientFormPage';
import PromotionListPage from './pages/WebsiteHome/Promotion/PromotionListPage';
import PromotionFormPage from './pages/WebsiteHome/Promotion/PromotionFormPage';
import BlogCategoryListPage from './pages/WebsiteHome/BlogCategory/BlogCategoryListPage';
import BlogCategoryFormPage from './pages/WebsiteHome/BlogCategory/BlogCategoryFormPage';
import BlogListPage from './pages/WebsiteHome/Blog/BlogListPage';
import BlogFormPage from './pages/WebsiteHome/Blog/BlogFormPage';
import OrderListPage from './pages/Order/OrderListPage';
import PrivacyPolicyFormPage from './pages/FooterPage/PrivacyPolicyFormPage';
import BillingShippingFormPage from './pages/FooterPage/BillingShippingFormPage';
import CookiePolicyFormPage from './pages/FooterPage/CookiePolicyPage';
import DisclaimerFormPage from './pages/FooterPage/DisclaimerFormPage';
import ReturnRefundPolicyFormPage from './pages/FooterPage/returnRefundPolicyFormPage';
import TermConditionFormPage from './pages/FooterPage/TermConditionFormPage';
import AboutUsFormPage from './pages/Aboutus/AboutusFormPage';
import ContactusFormPage from './pages/Contactus/ContactusFormPage';
import ContactEnquiryListPage from './pages/ContactEnquiry/ContactEnquiryListPage';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleToggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Layout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleToggleSidebar={handleToggleSidebar} />}>
            <Route index element={<Dashboard />} />
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route path="/category/add" element={<AddCategoryPage />} />
            <Route path="/category/update/:id" element={<UpdateCategoryPage />} />

            <Route path="/sub-category/list" element={<SubCategoryListPage />} />
            <Route path="/sub-category/add" element={<AddSubCategoryPage />} />
            <Route path="/sub-category/update/:id" element={<UpdateSubCategoryPage />} />

            <Route path="/sub-sub-category/list" element={<SubSubCategoryListPage />} />
            <Route path="/sub-sub-category/add" element={<AddSubSubCategoryPage />} />
            <Route path="/sub-sub-category/update/:id" element={<UpdateSubSubCategoryPage />} />

            <Route path="/color/list" element={<ColorListPage />} />
            <Route path="/color/add" element={<AddColorPage />} />
            <Route path="/color/update/:id" element={<UpdateColorPage />} />

            <Route path="/size/list" element={<SizeListPage />} />
            <Route path="/size/add" element={<AddSizePage />} />
            <Route path="/size/update/:id" element={<UpdateSizePage />} />

            <Route path="/brand/list" element={<BrandListPage />} />
            <Route path="/brand/add" element={<AddBrandPage />} />
            <Route path="/brand/update/:id" element={<UpdateBrandPage />} />

            <Route path="/product/list" element={<ProductListPage />} />
            <Route path="/product/add" element={<AddProductPage />} />
            <Route path="/product/update/:id" element={<UpdateProductPage />} />

            <Route path="/carousel/list" element={<CarouselListPage />} />
            <Route path="/carousel/add" element={<CarouselFormPage />} />
            <Route path="/carousel/update/:id" element={<CarouselFormPage />} />

            <Route path="/youtube-video/list" element={<YouTubeVideoListPage />} />
            <Route path="/youtube-video/add" element={<YouTubeVideoFormPage />} />
            <Route path="/youtube-video/update/:id" element={<YouTubeVideoFormPage />} />

            <Route path="/testimonial/list" element={<TestimonialListPage />} />
            <Route path="/testimonial/add" element={<TestimonialFormPage />} />
            <Route path="/testimonial/update/:id" element={<TestimonialFormPage />} />

            <Route path="/client/list" element={<ClientListPage />} />
            <Route path="/client/add" element={<ClientFormPage />} />
            <Route path="/client/update/:id" element={<ClientFormPage />} />

            <Route path="/promotion/list" element={<PromotionListPage />} />
            <Route path="/promotion/add" element={<PromotionFormPage />} />
            <Route path="/promotion/update/:id" element={<PromotionFormPage />} />

            <Route path="/blog-category/list" element={<BlogCategoryListPage />} />
            <Route path="/blog-category/add" element={<BlogCategoryFormPage />} />
            <Route path="/blog-category/update/:id" element={<BlogCategoryFormPage />} />

            <Route path="/blog/list" element={<BlogListPage />} />
            <Route path="/blog/add" element={<BlogFormPage />} />
            <Route path="/blog/update/:id" element={<BlogFormPage />} />

            <Route path="/order/list" element={<OrderListPage />} />

            <Route path="/privacy-policy/add" element={<PrivacyPolicyFormPage />} />
            <Route path="/billing-shipping-policy/add" element={<BillingShippingFormPage />} />
            <Route path="/cookie-policy/add" element={<CookiePolicyFormPage />} />
            <Route path="/disclaimer/add" element={<DisclaimerFormPage />} />
            <Route path="/return-refund-policy/add" element={<ReturnRefundPolicyFormPage />} />
            <Route path="/term-condition/add" element={<TermConditionFormPage />} />

            <Route path="/aboutus/add" element={<AboutUsFormPage />} />
            <Route path="/contactus/add" element={<ContactusFormPage />} />

            <Route path="/contact-enquiry/list" element={<ContactEnquiryListPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/test" element={<Test />} />
        </>
      )}
    </Routes>
  );
};

export default App;
