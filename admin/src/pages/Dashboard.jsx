import {
  FaShoppingCart,
  FaTags,
  FaBoxOpen,
  FaThLarge,
  FaUsers,
  FaListAlt,
  FaGift,
  FaStar,
  FaVideo,
  FaImage,
} from "react-icons/fa";
import DashboardCard from "../components/Card/DashboardCard";
import apis from "../apis/apis";
import useFetchData from "../hooks/useFetchData";
import { useAuth } from "../context/auth.context";

const Dashboard = () => {
  const { validToken } = useAuth();
  const { data } = useFetchData(apis.dashboard.getAll, validToken);

  const stats = data?.data;

  const dashboardItems = [
    {
      label: "Products",
      value: stats?.totalProducts,
      icon: <FaBoxOpen size={20} />,
      color: "text-primary",
      to: "/product/list",
    },
    {
      label: "Orders",
      value: stats?.totalOrders,
      icon: <FaShoppingCart size={20} />,
      color: "text-success",
      to: "/order/list",
    },
    {
      label: "Categories",
      value: stats?.totalCategories,
      icon: <FaThLarge size={20} />,
      color: "text-warning",
      to: "/category/list",
    },
    {
      label: "Subcategories",
      value: stats?.totalSubCategories,
      icon: <FaListAlt size={20} />,
      color: "text-info",
      to: "/sub-category/list",
    },
    {
      label: "Brands",
      value: stats?.totalBrands,
      icon: <FaTags size={20} />,
      color: "text-danger",
      to: "/brand/list",
    },
    {
      label: "Customers",
      value: stats?.totalUsers,
      icon: <FaUsers size={20} />,
      color: "text-primary",
      to: "/customer/list",
    },
    {
      label: "Carousels",
      value: stats?.totalCarousels,
      icon: <FaImage size={20} />,
      color: "text-warning",
      to: "/carousel/list",
    },
    {
      label: "Testimonials",
      value: stats?.totalTestimonials,
      icon: <FaStar size={20} />,
      color: "text-success",
      to: "/testimonial/list",
    },
    {
      label: "Promotions",
      value: stats?.totalPromotions,
      icon: <FaGift size={20} />,
      color: "text-danger",
      to: "/promotion/list",
    },
    {
      label: "Blogs",
      value: stats?.totalBlogs,
      icon: <FaGift size={20} />,
      color: "text-primary",
      to: "/blog/list",
    },
    {
      label: "Blog Categories",
      value: stats?.totalBlogCategories,
      icon: <FaListAlt size={20} />,
      color: "text-secondary",
      to: "/blog-category/list",
    },
    {
      label: "YouTube Videos",
      value: stats?.totalYouTubeVideos,
      icon: <FaVideo size={20} />,
      color: "text-danger",
      to: "/youtube-video/list",
    },
  ];

  return (
    <div className="container">
      <h5 className="mb-4">Dashboard</h5>

      <div className="row g-4">
        {dashboardItems.map((item, idx) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
            <DashboardCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
