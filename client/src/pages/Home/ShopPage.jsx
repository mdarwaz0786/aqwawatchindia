import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import NewArrivalSection from "./NewArrivalSection";
import OfferBannerSection from "./OfferBannerSection";
import TestimonialSection from "./TestimonialSection";

const ShopPage = () => {
  return (
    <>
      <Header />
      <CarouselSection />
      <BestSellerSection />
      <OfferBannerSection src="assets/maingraphics/offerbanner.jpg" />
      <NewArrivalSection />
      <OfferBannerSection src="assets/maingraphics/offerbanner2.jpg" />
      <TestimonialSection />
      <BrandSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default ShopPage;