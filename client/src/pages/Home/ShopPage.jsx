import { useEffect } from "react";
import apis from "../../api/apis";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useAuth } from "../../context/auth.context";
import useFetchData from "../../hooks/useFetchData";
import BestSellerSection from "./BestSellerSection";
import BlogSection from "./BlogSection";
import BrandSection from "./BrandSection";
import CarouselSection from "./CarouselSection";
import NewArrivalSection from "./NewArrivalSection";
import PromoBannerSection from "./PromoBannerSection";
import ServiceBookingSection from "./ServiceBookingSection";
import TestimonialSection from "./TestimonialSection";
import YoutubeVideoSection from "./YoutubeVideoSection";

const ShopPage = () => {
  const { userId } = useAuth();

  const { data, refetch, setParams } = useFetchData(
    apis.home.getAll,
    "",
    {}
  );

  useEffect(() => {
    if (userId) {
      setParams({ userId });
    };
  }, [userId, setParams]);

  const categories = data?.data?.category;
  const bestSellingProducts = data?.data?.bestSellingProduct;
  const newArrivalProducts = data?.data?.newArrivalProduct;
  const carousels = data?.data?.carousel;
  const promotions = data?.data?.promotion;
  const youTubeVideos = data?.data?.youTubeVideo;
  const testimonials = data?.data?.testimonial;
  const clients = data?.data?.client;
  const blogs = data?.data?.blog;

  return (
    <>
      <Header categories={categories} />
      <CarouselSection carousels={carousels} />
      <BestSellerSection bestSellingProducts={bestSellingProducts} refetch={refetch} />
      <PromoBannerSection promotions={promotions} />
      <NewArrivalSection newArrivalProducts={newArrivalProducts} refetch={refetch} />
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