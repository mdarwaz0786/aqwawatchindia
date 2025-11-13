import apis from "../../api/apis";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import useFetch from "../../hooks/useFetch";
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import NewArrivalSection from "./NewArrivalSection";
import PromoBannerSection from "./PromobannerSection";
import ServiceBookingSection from "./ServiceBookingSection";
import TestimonialSection from "./TestimonialSection";
import YoutubeVideoSection from "./YoutubeVideoSection";

const ShopPage = () => {
  const { data } = useFetch(apis.home.getAll);
  const categories = data?.data?.category;
  const bestSellingProducts = data?.data?.bestSellingProduct;
  const newArrivalProducts = data?.data?.newArrivalProduct;

  return (
    <>
      <Header categories={categories} />
      <CarouselSection />
      <BestSellerSection bestSellingProducts={bestSellingProducts} />
      <PromoBannerSection />
      <NewArrivalSection newArrivalProducts={newArrivalProducts} />
      <YoutubeVideoSection />
      <TestimonialSection />
      <BrandSection />
      <ServiceBookingSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default ShopPage;