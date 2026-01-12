/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import useCreate from "../../hooks/useCreate";
import apis from "../../api/apis";
import "./VisitPopup.css";
import { selectStyles } from "../Constants/style";
import useFetchData from "../../hooks/useFetchData";

const VisitPopup = ({ open, setOpen, onClose }) => {
  const { data: services } = useFetchData(apis.service.get);
  const { data: contactEnquiry } = useFetchData(apis.contactEnquiryForm.get);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    subject: "",
    service: "",
    address: "",
    message: "",
    from: "Service",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({
    label: "India",
    value: "India",
  });
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const { postData, response, postError } = useCreate(
    apis.contactEnquiry.create
  );

  useEffect(() => {
    const shown = sessionStorage.getItem("visitPopupShown");
    if (!shown) {
      setTimeout(() => setOpen(true), 1000);
      sessionStorage.setItem("visitPopupShown", "true");
    }
  }, [setOpen]);

  useEffect(() => {
    async function loadCountries() {
      setLoadingCountries(true);
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/positions"
        );
        const data = await res.json();

        const list = data?.data?.map((c) => ({
          label: c?.name,
          value: c?.name,
        })) || [];

        setCountries(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCountries(false);
      }
    }

    loadCountries();
  }, []);

  useEffect(() => {
    async function loadStates() {
      setLoadingStates(true);

      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedCountry.value }),
          }
        );

        const data = await res.json();

        const list =
          data?.data?.states?.map((s) => ({
            label: s?.name,
            value: s?.name,
          })) || [];

        setStates(list);
        setCities([]);
        setSelectedState(null);
        setSelectedCity(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStates(false);
      }
    }

    loadStates();
  }, [selectedCountry]);

  useEffect(() => {
    async function loadCities() {
      setLoadingCities(true);

      try {
        if (!selectedState) {
          if (!states.length) {
            setCities([]);
            return;
          }

          const cityPromises = states.map((st) =>
            fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                country: selectedCountry.value,
                state: st.value,
              }),
            }).then((res) => res.json())
          );

          const responses = await Promise.all(cityPromises);

          const allCities = responses.flatMap((res) =>
            res?.data?.map((city) => ({
              label: city,
              value: city,
            })) || []
          );

          const uniqueCities = Array.from(
            new Map(allCities.map((c) => [c.value, c])).values()
          );

          setCities(uniqueCities);
          setSelectedCity(null);
          return;
        }

        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              country: selectedCountry.value,
              state: selectedState.value,
            }),
          }
        );

        const data = await res.json();

        const list =
          data?.data?.map((c) => ({
            label: c,
            value: c,
          })) || [];

        setCities(list);
        setSelectedCity(null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCities(false);
      }
    }

    loadCities();
  }, [selectedState, selectedCountry, states]);

  useEffect(() => {
    if (response?.success) {
      toast.success("Submitted Successfully ✔");
      onClose();
    }
    if (postError) toast.error(postError);
  }, [response, postError]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.mobile
    ) {
      toast.error("Name and Mobile are required");
      return;
    };

    const payload = {
      ...form,
      country: selectedCountry.value,
      state: selectedState.value,
      city: selectedCity.value,
    };

    await postData(payload);
  };

  return (
    <div className="visit-popup-overlay">
      <div className="visit-popup">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 className="popup-title">{contactEnquiry?.data?.title}</h3>

        <form className="popup-form" onSubmit={handleSubmit}>
          {
            contactEnquiry?.data?.name === 1 && (
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.email === 1 && (
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.mobile === 1 && (
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile"
                required
                value={form.mobile}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.country === 1 && (
              <div className="mb-3">
                <Select
                  options={countries}
                  placeholder="Select Country"
                  styles={selectStyles}
                  isLoading={loadingCountries}
                  value={selectedCountry}
                  onChange={(opt) => {
                    setSelectedCountry(opt);
                    setForm({ ...form, country: opt.value });
                  }}
                />
              </div>
            )
          }
          {
            contactEnquiry?.data?.state === 1 && (
              <div className="mb-3">
                <Select
                  options={states}
                  placeholder="Select State"
                  isLoading={loadingStates}
                  styles={selectStyles}
                  value={selectedState}
                  onChange={(opt) => {
                    setSelectedState(opt);
                    setForm({ ...form, state: opt.value });
                  }}
                />
              </div>
            )
          }

          {
            contactEnquiry?.data?.city === 1 && (
              <div className="mb-3">
                <Select
                  options={cities}
                  placeholder="Select City"
                  styles={selectStyles}
                  isLoading={loadingCities}
                  value={selectedCity}
                  onChange={(opt) => {
                    setSelectedCity(opt);
                    setForm({ ...form, city: opt.value });
                  }}
                />
              </div>
            )
          }

          {
            contactEnquiry?.data?.zip === 1 && (
              <input
                type="text"
                name="zip"
                placeholder="Enter ZIP Code"
                value={form.zip}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.subject === 1 && (
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={form.subject}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.service === 1 && (
              <select
                className="form-select"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select Service</option>
                {services?.data?.map((service) => (
                  <option
                    key={service?._id}
                    value={service?._id}
                  >
                    {service?.name}
                  </option>
                ))}
              </select>
            )
          }

          {
            contactEnquiry?.data?.address === 1 && (
              <textarea
                name="address"
                placeholder="Enter Address"
                rows="4"
                value={form.address}
                onChange={handleChange}
              />
            )
          }

          {
            contactEnquiry?.data?.message === 1 && (
              <textarea
                name="message"
                placeholder="Your Message"
                rows="3"
                value={form.message}
                onChange={handleChange}
              />
            )
          }

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitPopup;
