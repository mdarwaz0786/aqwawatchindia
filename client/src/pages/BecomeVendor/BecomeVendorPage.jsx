import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import apis from "../../api/apis";

const BecomeVendorPage = () => {
  const { data } = useFetch(apis.home.getAll);
  const categories = data?.data?.category;

  return (
    <>
      <Header categories={categories} />
      {/*PAGE BANNER START*/}
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <h1>Become a Vendor</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Become a Vendor</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER END*/}

      {/*BECOME A VENDOR START*/}
      <section className="beacome_vendor mt_100 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6  wow fadeInLeft">
              <div className="become_vendor_text">
                <h3>Vendor Eligibility</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam animi recusandae nihil vero
                  saepe sed neque. Incidunt, facilis quam? Alias, quam optio animi possimus impedit autem
                  nulla fugit earum deserunt odit eveniet. Laboriosam dolorum sapiente quis accusamus
                  exercitationem iusto mollitia.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam animi recusandae nihil vero
                  saepe sed neque. Incidunt, facilis quam? Alias, quam optio animi possimus impedit autem
                  nulla fugit earum.</p>
                <ul>
                  <li>Must be a registered business or individual with legal selling rights.</li>
                  <li>Must provide valid identification and business registration documents (if applicable).
                  </li>
                  <li>Must comply with local and international laws regarding e-commerce and online selling.
                  </li>
                </ul>
                <h3>2. Product Listing Guidelines</h3>
                <ul>
                  <li>Vendors can list only approved product categories as per platform policy.</li>
                  <li>Product descriptions must be accurate, detailed, and not misleading.</li>
                  <li>Images must be high quality, without watermarks, and match the actual product.</li>
                  <li>No counterfeit, prohibited, or illegal items are allowed.</li>
                  <li>Digital products must be original and free from copyright violations.</li>
                </ul>
                <h3>3. Pricing &amp; Commission</h3>
                <ul>
                  <li>Vendors must set competitive pricing while following the platform’s pricing policy.</li>
                  <li>The platform may charge a commission fee (e.g., 10-30%) on each sale.</li>
                  <li>Any discounts or promotions must be approved by the platform.</li>
                </ul>
                <h3>4. Order Processing &amp; Fulfillment</h3>
                <ul>
                  <li>Orders must be processed within the specified handling time.</li>
                  <li>Vendors must ensure timely shipping and provide tracking details.</li>
                  <li>Digital products must be available for immediate download after purchase.</li>
                </ul>
                <h3>5. Payment &amp; Payouts</h3>
                <ul>
                  <li>Payments are processed through secure gateways like PayPal, Stripe, or Bank Transfer.
                  </li>
                  <li>Payouts are released based on a predefined schedule (e.g., weekly/monthly).</li>
                  <li>The platform may hold payments for dispute resolution or fraud prevention.</li>
                </ul>
                <h3>6. Customer Service &amp; Disputes</h3>
                <ul>
                  <li>Vendors must provide prompt responses to customer inquiries (within 24-48 hours).</li>
                  <li>Returns and refunds must be handled as per the platform’s policy.</li>
                  <li>Disputes between buyers and sellers will be mediated by the platform.</li>
                </ul>
                <h3>7. Prohibited Activities</h3>
                <ul>
                  <li>No false advertising, fake reviews, or misleading product claims.</li>
                  <li>No unauthorized use of trademarks, logos, or copyrighted content.</li>
                  <li>No manipulation of sales, ratings, or reviews.</li>
                </ul>
                <h3>8. Account Suspension &amp; Termination</h3>
                <ul>
                  <li>Violations of rules may result in warnings, fines, or account suspension.</li>
                  <li>Repeated violations may lead to permanent account termination.</li>
                  <li>Fraudulent activities or illegal sales will result in immediate legal action.</li>
                </ul>
                <h3>9. Compliance &amp; Updates</h3>
                <ul>
                  <li>Vendors must comply with local and international laws on e-commerce and taxation.</li>
                  <li>The platform reserves the right to update rules and regulations at any time.</li>
                  <li>Vendors will be notified of policy changes via email or dashboard updates.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6  wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="become_vendor_form">
                  <h3>sign up As vendor</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>First name</label>
                          <input type="text" placeholder="Jhon" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>last name</label>
                          <input type="text" placeholder="Deo" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>Your phone</label>
                          <input type="text" placeholder={+96542145874844} />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>Your Email</label>
                          <input type="email" placeholder="example@Zenis.com" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>Country</label>
                          <select className="select_2">
                            <option value="#">Singapore</option>
                            <option value="#">Japan</option>
                            <option value="#">Korea</option>
                            <option value="#">Thailand</option>
                            <option value="#">Kanada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>City</label>
                          <select className="select_2">
                            <option value="#">Tokyo</option>
                            <option value="#">Japan</option>
                            <option value="#">Korea</option>
                            <option value="#">Thailand</option>
                            <option value="#">Kanada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>state</label>
                          <select className="select_2">
                            <option value="#">Korea</option>
                            <option value="#">Singapore</option>
                            <option value="#">Japan</option>
                            <option value="#">Thailand</option>
                            <option value="#">Kanada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>zip</label>
                          <input type="text" placeholder={1234} />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12">
                        <div className="single_input">
                          <label>Address</label>
                          <textarea rows={5} placeholder="Write your address" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12">
                        <div className="single_input">
                          <label>Attachment</label>
                          <input type="file" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>Password</label>
                          <input type="password" placeholder="******" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6">
                        <div className="single_input">
                          <label>Confirm Password</label>
                          <input type="password" placeholder="******" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12">
                        <div className="become_vendor_form_chek">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              I agree that I have read and accepted the <a href="#">Terms and
                                Condition</a> and <a href="#">Privacy
                                  Policy</a>.
                            </label>
                          </div>
                          <button className="common_btn">Sign Up <i className="fas fa-long-arrow-right" /></button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*BECOME A VENDOR END*/}
      <Footer />
    </>
  );
};

export default BecomeVendorPage;