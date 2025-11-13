import { Link } from "react-router-dom";
import Swiper from "../../components/Swiper/Swiper";
import { API_BASE_URL } from "../../api/apis";

const CategorySection = ({ categories = [] }) => {
  return (
    <section className="category category_2">
      <div className="container">
        <Swiper
          spaceBetween={0}
          items={categories}
          renderSlide={(d) => (
            <div className="catsli wow fadeInUp">
              <Link to="/products" className="category_item">
                <div className="img">
                  <img
                    src={`${API_BASE_URL}/${d?.image}`}
                    alt={d?.name}
                    className="img-fluid w-100"
                  />
                </div>
                <h3>{d?.name}</h3>
              </Link>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default CategorySection;
