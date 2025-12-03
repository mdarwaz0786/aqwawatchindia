import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/apis";

const BrandSection = ({ clients = [] }) => {
  return (
    <>
      {
        clients?.length > 0 && (
          <section className="brand_2 secpd">
            <div className="container">
              <div className="row mb-3">
                <div className="col-xl-6 col-sm-9">
                  <div className="section_heading_2 section_heading">
                    <h3>Our <span>Clients</span></h3>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-12">
                  <ul>
                    {
                      clients?.map((d) => (
                        <li className="wow fadeInUp">
                          <Link to="#">
                            <img src={`${API_BASE_URL}/${d?.logo}`} alt="client" className="img-fluid" />
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  );
};

export default BrandSection;