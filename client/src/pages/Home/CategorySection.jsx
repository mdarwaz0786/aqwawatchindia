import { Link, useNavigate } from "react-router-dom";
import Swiper from "../../components/Swiper/Swiper";
import { API_BASE_URL } from "../../api/apis";

const CategorySection = ({ categories = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="category category_2">
      <div className="container">
        <Swiper
          spaceBetween={0}
          items={categories.slice(0, 8)}
          renderSlide={(d) => (
            <div className="catsli wow fadeInUp">
              <div style={{ cursor: "pointer" }} className="category_item" onClick={() => navigate(`/products?category=${d?.slug}`)}>
                <div className="img">
                  <img
                    src={`${API_BASE_URL}/${d?.image}`}
                    alt={d?.name}
                    className="img-fluid w-100"
                  />
                </div>
                <h3>{d?.name}</h3>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default CategorySection;
