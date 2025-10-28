const OfferBannerSection = ({ src }) => {
  return (
    <>
      <section className="offerbanner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <img src={src} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferBannerSection;