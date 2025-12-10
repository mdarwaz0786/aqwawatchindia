const YoutubeVideoSection = ({ youTubeVideos = [] }) => {
  const truncate = (text, limit = 150) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <>
      {
        youTubeVideos?.length > 0 && (
          <section className="farming secpd">
            <div className="container">
              {
                youTubeVideos?.map((d) => (
                  <div className="row">
                    <div className="col-lg-5 col-md-10">
                      <div className="farming_text wow fadeInLeft" style={{ visibility: 'visible', animationName: 'fadeInLeft' }}>
                        <div className="section_heading">
                          <h3 className="mb-2">{d?.title}</h3>
                          <h5>{d?.subTitle}</h5>
                        </div>
                        <p className="review_text">
                          {truncate(d?.description, 1200)}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink1} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink2} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink3} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink4} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink5} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-3">
                          <iframe width="100%" height={286} src={d?.youTubeVideoLink6} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        )
      }
    </>
  );
};

export default YoutubeVideoSection;