import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Select from "react-select";
import { selectStyles } from "../../components/Constants/style";
import axios from "axios";
import apis from "../../api/apis";
import { toast } from "react-toastify";

const BecomeVendorPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    zip: "",
    address: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function loadCountries() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
      const data = await res.json();

      const list = data?.data?.map((c) => ({
        label: c?.name,
        value: c?.name,
      }));

      setCountries(list);
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    async function loadStates() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry?.value }),
      });

      const data = await res?.json();

      const list = data?.data?.states?.map((s) => ({
        label: s?.name,
        value: s?.name,
      }));

      setStates(list);
      setCities([]);
      setSelectedState(null);
      setSelectedCity(null);
    };

    loadStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState || !selectedCountry) return;

    async function loadCities() {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry?.value,
          state: selectedState?.value,
        }),
      });

      const data = await res.json();

      const list = data?.data?.map((c) => ({
        label: c,
        value: c,
      }));

      setCities(list);
      setSelectedCity(null);
    };

    loadCities();
  }, [selectedState, selectedCountry]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      country: selectedCountry?.value || "",
      state: selectedState?.value || "",
      city: selectedCity?.value || "",
      zip: form.zip,
      address: form.address,
      from: "Dealer",
    };

    try {
      await axios.post(apis.contactEnquiry.create, payload);
      toast.success("Submitted successfully");
      setForm({
        name: "",
        mobile: "",
        email: "",
        zip: "",
        address: "",
      });
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      setStates([]);
      setCities([]);
    } catch (err) {
      console.log(err)
      toast.success("Failed to submit")
    };
  };

  return (
    <>
      <Header />
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

      <section className="beacome_vendor mt_30 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="become_vendor_form">
                  <h3>sign up As dealer</h3>
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <input
                          type="text"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="Enter Mobile"
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <Select
                          options={countries}
                          value={selectedCountry}
                          onChange={setSelectedCountry}
                          placeholder="Select Country"
                          styles={selectStyles}
                          isClearable
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <Select
                          options={states}
                          value={selectedState}
                          onChange={setSelectedState}
                          styles={selectStyles}
                          placeholder="Select State"
                          isDisabled={!selectedCountry}
                          isClearable
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <Select
                          options={cities}
                          value={selectedCity}
                          onChange={setSelectedCity}
                          placeholder="Select City"
                          styles={selectStyles}
                          isDisabled={!selectedState}
                          isClearable
                        />
                      </div>

                      <div className="col-lg-12 col-xl-6 col-md-6 mb-3">
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          placeholder="Enter Zip"
                        />
                      </div>

                      <div className="col-lg-12 col-xl-12 col-md-12 mb-3">
                        <textarea
                          rows={5}
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Write your address.."
                        />
                      </div>

                      <div className="col-lg-12 col-xl-12 col-md-12 mb-3">
                        <div className="become_vendor_form_chek">
                          <button type="submit" className="common_btn">
                            Submit <i className="fas fa-long-arrow-right" />
                          </button>
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
      <Footer />
    </>
  );
};

export default BecomeVendorPage;
