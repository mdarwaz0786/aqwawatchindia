import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import CategorySection from "./CategorySection";
import NewArrivalSection from "./NewArrivalSection";
import OfferBannerSection from "./OfferBannerSection";
import PopularCategorySection from "./PopularCategorySection";
import SpecialProductSection from "./SpecialProductSection";
import TestimonialSection from "./TestimonialSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <CategorySection />
      <CarouselSection />
      <PopularCategorySection />
      <BestSellerSection />
      <OfferBannerSection src="assets/maingraphics/offerbanner.jpg" />
      <NewArrivalSection />
      <OfferBannerSection src="assets/maingraphics/offerbanner2.jpg" />
      <SpecialProductSection />
      <TestimonialSection />
      <BrandSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default HomePage;