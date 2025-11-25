import apis from "../../api/apis";
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar";
import useFetchData from "../../hooks/useFetchData";
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

const HomePage = () => {
  const { data, refetch } = useFetchData(apis.home.getAll);
  const categories = data?.data?.category;
  const bestSellingProducts = data?.data?.bestSellingProduct;
  const newArrivalProducts = data?.data?.newArrivalProduct;

  return (
    <>
      <Navbar categories={categories} />
      <CategorySection categories={categories} />
      <CarouselSection />
      <BestSellerSection bestSellingProducts={bestSellingProducts} refetch={refetch} />
      <PromoBannerSection />
      <NewArrivalSection newArrivalProducts={newArrivalProducts} refetch={refetch} />
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