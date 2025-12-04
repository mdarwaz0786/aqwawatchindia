import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar";
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import CategorySection from "./CategorySection";
import NewArrivalSection from "./NewArrivalSection";
import PromoBannerSection from "./PromoBannerSection";
import ServiceBookingSection from "./ServiceBookingSection";
import TestimonialSection from "./TestimonialSection";
import YoutubeVideoSection from "./YoutubeVideoSection";
import { useApp } from "../../context/app.context";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <Navbar categories={categories} />
      <CategorySection categories={categories} />
      <CarouselSection carousels={carousels} />
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

export default HomePage;