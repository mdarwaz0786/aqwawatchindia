const TestimonialSection = ({ testimonials = [] }) => {
  return (
    <>
      {
        testimonials?.length > 0 && (
          <section className="testimonial secpd" style={{ background: 'url(assets/images/grocery_testimonial_bg.jpg)' }}>
            <div className="container">
              <div className="row wow fadeInUp mb-3">
                <div className="col-xl-12">
                  <div className="section_heading">
                    <h3>What Our Customer Say</h3>
                  </div>
                </div>
              </div>
              <div className="row testi_slider">
                {testimonials?.map((d) => (
                  <div className="col-xl-4 mb-4">
                    <div className="testimonial_item wow fadeInUp">
                      <p className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`${i < Math.round(d?.rating || 0)
                              ? "fas fa-star"
                              : "far fa-star"
                              }`}
                          />
                        ))}
                        <span>{d?.rating}</span>
                      </p>
                      <p className="review_text">{d?.description}</p>
                      <div className="testimonial_footer">
                        <div className="img">
                          <img src="assets/images/avatar.png" alt="testimonial" className="img-fluid w-100" />
                        </div>
                        <div className="text">
                          <h3>{d?.userName}</h3>
                          <p>Customer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }
    </>
  );
};

export default TestimonialSection;