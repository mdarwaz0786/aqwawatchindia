const ServiceBookingSection = () => {
  return (
    <>
      <section className="threeboxes">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="thrbx">
                <h3>Service/Repair</h3>
                <p>Professional maintenance and cleaning for optimal water purification/others</p>
                <a className="view_all_btn" href="contact_us.php"> Book Now</a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="thrbx">
                <h3>Installation</h3>
                <p>Complete installation service with proper setup and quality testing.</p>
                <a className="view_all_btn" href="contact_us.php"> Book Now</a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="thrbx">
                <h3>AMC Plans</h3>
                <p>Annual maintenance contracts </p>
                <a className="view_all_btn" href="contact_us.php"> Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceBookingSection;