import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header";

const BillingShippingPolicyPage = () => {
  return (
    <>
      <Header />
      {/*PAGE BANNER START*/}
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <h1>Billing and Shipping Policy</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Billing and Shipping Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      <section className="terms_condition mt_55 mb_100">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-12">
              <div className="privacy_policy_text">
                <h3>Who we are</h3>
                <p>When visitors leave comments on the site we collect the data shown in the comments form, and
                  also the visitor’s IP address and browser user agent string to help spam
                  detection. An anonymized string created from your email address (also called a hash) may be
                  provided to the Gravatar service to see if you are using it. The Gravatar service
                  privacy policy is available here. created from your email address (also called a hash) may.
                </p>
                <h3>Comments</h3>
                <p>When visitors leave comments on the site we collect the data shown in the comments form, and
                  also the visitor’s IP address and browser user agent string to help spam detection. An
                  anonymized string created from your email address (also called a hash) may be provided to
                  the Gravatar service to see if you are using it.
                </p>
                <ul>
                  <li>Isitors to the website can download and extract any location data</li>
                  <li>Gravatar service privacy policy is available here. created from your email address</li>
                  <li>These are for your convenience so that you do not have to fill in
                    your details again</li>
                </ul>
                <h3>Media</h3>
                <p>If you leave a comment on our site you may opt-in to saving your name, email address and
                  website in cookies. These are for your convenience so that you do not have to fill in your
                  details again when you leave another comment. These cookies will last for one year. If you
                  visit our login page, we will set a temporary cookie to determine if your brow ser accepts
                  cookies. This cookie contains no personal data and is discarded when you close your browser.
                  When you log in, we will also set up several cookies to save your login information and your
                  screen display choices. Login cookies last for two days, and screen options cookies last for
                  a year</p>
                <ul>
                  <li>You should avoid uploading images with embedded location</li>
                  <li>Isitors to the website can download and extract any location data</li>
                  <li>Gravatar service privacy policy is available here. created from your email address</li>
                  <li>When visitors leave comments on the site we collect the data shown in the comments</li>
                  <li>These are for your convenience so that you do not have to fill in
                    your details again</li>
                </ul>
                <p>When visitors leave comments on the site we collect the data shown in the comments form, and
                  also the visitor’s IP address and browser user agent string to help spam detection. An
                  anonymized string created from your email address (also called a hash) may be provided to
                  the Gravatar service to see if you are using it.
                </p>
                <h3>Cookies</h3>
                <p>If you leave a comment on our site you may opt-in to saving your name, email address and
                  website in cookies. These are for your convenience so that you do not have to fill in your
                  details again when you leave another comment. These cookies will last for one year. If you
                  visit our login page, we will set a temporary cookie to determine if your brow ser accepts
                  cookies. This cookie contains no personal data and is discarded when you close your browser.
                  When you log in, we will also set up several cookies to save your login information and your
                  screen display choices. Login cookies last for two days, and screen options cookies last for
                  a year.</p>
                <h3>Embedded content from other websites</h3>
                <p>When visitors leave comments on the site we collect the data shown in the comments form, and
                  also the visitor’s IP address and browser user agent string to help spam dete
                  ction. Suggested text: Articles on this site may include embedded content (e.g. videos,
                  images, articles, etc.). Embedded content from other websites behaves in the exact
                  same way as if the visitor has visited the other website. These websites may collect data
                  about you, use cookies, embed additional third-party tracking, and monitor your in
                  teraction with that embedded content, including tracking your interaction with the embedded
                  content if you have an account and are logged in to that website.</p>
                <h3>How long we retain your data</h3>
                <p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we
                  can recognize and approve any follow-up comments automatically instead
                  of holding them in a moderation queue. For users that register on our website (if any), we
                  also store the personal information they provide in their user profile. All users can
                  see, edit, or delete their personal information at any time (except they cannot change their
                  username). Website administrators can also see and edit that information.</p>
                <ul>
                  <li>You should avoid uploading images with embedded location</li>
                  <li>Isitors to the website can download and extract any location data</li>
                  <li>Gravatar service privacy policy is available here. created from your email address</li>
                </ul>
                <h3>What rights you have over your data</h3>
                <p>If you have an account on this site, or have left comments, you can request to receive an
                  exported file of the personal data we hold about you, including any data you have provided
                  to us. You can also request that we erase any personal data we hold about you. This does not
                  include any data we are obliged to keep for administrative.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BillingShippingPolicyPage;