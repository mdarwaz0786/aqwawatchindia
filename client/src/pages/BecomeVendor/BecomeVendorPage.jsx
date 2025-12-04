import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useApp } from "../../context/app.context";
import { useEffect, useState } from "react";
import Select from "react-select";

const BecomeVendorPage = () => {
  const { categories } = useApp();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    async function loadCountries() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
      const data = await res.json();

      const list = data.data.map((c) => ({
        label: c.name,
        value: c.name,
      }));

      setCountries(list);
    }

    loadCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    async function loadStates() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry.value }),
      });

      const data = await res.json();

      const list = data.data.states.map((s) => ({
        label: s.name,
        value: s.name,
      }));

      setStates(list);
      setCities([]);
      setSelectedState(null);
      setSelectedCity(null);
    }

    loadStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState || !selectedCountry) return;

    async function loadCities() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry.value,
          state: selectedState.value,
        }),
      });

      const data = await res.json();

      const list = data.data.map((c) => ({
        label: c,
        value: c,
      }));

      setCities(list);
      setSelectedCity(null);
    }

    loadCities();
  }, [selectedState, selectedCountry]);

  function handleSubmit(e) {
    e.preventDefault();

    alert("Submitted successfully!");
  }

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
                  <h1>Become A Dealer</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Become A Dealer</Link></li>
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
            <div className="col-md-12  wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="become_vendor_form">
                  <h3>sign up As dealer</h3>
                  <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>First name</label>
                        <input type="text" placeholder="Jhon" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>last name</label>
                        <input type="text" placeholder="Deo" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>Your phone</label>
                        <input type="text" placeholder="+91-1234567890" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>Your Email</label>
                        <input type="email" placeholder="example@xyz.com" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>Country</label>
                        <Select
                          options={countries}
                          value={selectedCountry}
                          onChange={setSelectedCountry}
                          placeholder="Select Country"
                          isClearable
                        />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>State</label>
                        <Select
                          options={states}
                          value={selectedState}
                          onChange={setSelectedState}
                          placeholder="Select State"
                          isDisabled={!selectedCountry}
                          isClearable
                        />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>City</label>
                        <Select
                          options={cities}
                          value={selectedCity}
                          onChange={setSelectedCity}
                          placeholder="Select City"
                          isDisabled={!selectedState}
                          isClearable
                        />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>zip</label>
                        <input type="text" placeholder="123456" />
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12 mb-3">
                        <label>Address</label>
                        <textarea rows={5} placeholder="Write your address" />
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12 mb-3">
                        <label>Attachment</label>
                        <input type="file" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>Password</label>
                        <input type="password" placeholder="******" />
                      </div>
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="******" />
                      </div>
                      <div className="col-lg-12 col-xl-12 col-md-12 mb-3">
                        <div className="become_vendor_form_chek">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              I agree that I have read and accepted the <Link to="/terms-conditions">Terms and
                                Condition</Link> and <Link to="/privacy-policy">Privacy
                                  Policy</Link>
                            </label>
                          </div>
                          <button type="submit" className="common_btn">Submit <i className="fas fa-long-arrow-right" /></button>
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