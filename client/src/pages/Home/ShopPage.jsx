import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
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
  return (
    <>
      <Header />
      <CarouselSection />
      <BestSellerSection />
      <PromoBannerSection />
      <NewArrivalSection />
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