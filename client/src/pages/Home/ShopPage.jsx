import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import NewArrivalSection from "./NewArrivalSection";
import PromoBannerSection from "./PromoBannerSection";
import ServiceBookingSection from "./ServiceBookingSection";
import TestimonialSection from "./TestimonialSection";
import YoutubeVideoSection from "./YoutubeVideoSection";
import { useApp } from "../../context/app.context";

const ShopPage = () => {
  const {
    categories,
    bestSellingProducts,
    newArrivalProducts,
    carousels,
    promotions,
    youTubeVideos,
    testimonials,
    clients,
    blogs,
    refetchHomePageData,
  } = useApp();

  return (
    <>
      <Header categories={categories} />
      <div className="carousel-mobile">
        <CarouselSection carousels={carousels} />
      </div>
      <BestSellerSection bestSellingProducts={bestSellingProducts} refetch={refetchHomePageData} />
      <PromoBannerSection promotions={promotions} />
      <NewArrivalSection newArrivalProducts={newArrivalProducts} refetch={refetchHomePageData} />
      <YoutubeVideoSection youTubeVideos={youTubeVideos} />
      <TestimonialSection testimonials={testimonials} />
      <BrandSection clients={clients} />
      <ServiceBookingSection />
      <BlogSection blogs={blogs} />
      <Footer />
    </>
  );
};

export default ShopPage;