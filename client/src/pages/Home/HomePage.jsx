import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar";
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import CategorySection from "./CategorySection";
import NewArrivalSection from "./NewArrivalSection";
import PromoBannerSection from "./PromobannerSection";
import ServiceBookingSection from "./ServiceBookingSection";
import TestimonialSection from "./TestimonialSection";
import YoutubeVideoSection from "./YoutubeVideoSection";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <CategorySection />
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

export default HomePage;