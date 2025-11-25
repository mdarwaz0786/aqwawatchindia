const TestimonialSection = () => {
  return (
    <>
      <section className="testimonial secpd" style={{ background: 'url(assets/images/grocery_testimonial_bg.jpg)' }}>
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-xl-12">
              <div className="section_heading">
                <h3>What Our Customer Say</h3>
              </div>
            </div>
          </div>
          <div className="row testi_slider">
            <div className="col-xl-4">
              <div className="testimonial_item wow fadeInUp">
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span>5.0</span>
                </p>
                <p className="review_text">I purchased my water purifier through this app, and the entire experience was seamless. The product descriptions were clear, the comparison tool helped me choose the perfect model for my family, and the delivery was incredibly fast. I could immediately taste the difference in water quality—clean, fresh, and safe. I highly recommend this platform to anyone looking for a reliable purifier.</p>
                <div className="testimonial_footer">
                  <div className="img">
                    <img src="assets/images/avatar.png" alt="testimonial" className="img-fluid w-100" />
                  </div>
                  <div className="text">
                    <h3>Aman</h3>
                    <p>Customer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="testimonial_item wow fadeInUp">
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                  <span>4.5</span>
                </p>
                <p className="review_text">What impressed me most about this app was the exceptional customer support. I wasn’t sure which purifier suited my water source, but the expert guidance made my decision easy. The installation process was smooth, and the technician was very professional. It’s been months now, and the purifier is working flawlessly. This app truly made the entire buying journey stress-free.</p>
                <div className="testimonial_footer">
                  <div className="img">
                    <img src="assets/images/avatar.png" alt="testimonial" className="img-fluid w-100" />
                  </div>
                  <div className="text">
                    <h3>Abhishek</h3>
                    <p>Customer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="testimonial_item wow fadeInUp">
                <p className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                  <i className="far fa-star" />
                  <span>3.5</span>
                </p>
                <p className="review_text">I’ve used several online stores before, but this app stands out for its quality products and transparent service. From tracking my order to scheduling filter replacements, everything is handled effortlessly. The purifier I purchased not only improved the taste of my water but also gave me peace of mind knowing my family is drinking safe, purified water.</p>
                <div className="testimonial_footer">
                  <div className="img">
                    <img src="assets/images/avatar.png" alt="testimonial" className="img-fluid w-100" />
                  </div>
                  <div className="text">
                    <h3>Rahul</h3>
                    <p>Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;