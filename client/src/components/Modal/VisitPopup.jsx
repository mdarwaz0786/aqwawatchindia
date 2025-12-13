/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import useCreate from "../../hooks/useCreate";
import apis from "../../api/apis";
import "./VisitPopup.css";
import { selectStyles } from "../Constants/style";

const VisitPopup = ({ open, setOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    state: "",
    city: "",
    service: "",
    message: "",
    from: "Service",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry] = useState({ label: "India", value: "India" });
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
            label: s.name,
            value: s.name,
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
    if (!selectedState) return;

    async function loadCities() {
      setLoadingCities(true);

      try {
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
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    if (response?.success) {
      toast.success("Submitted Successfully ✔");

      setForm({
        name: "",
        mobile: "",
        state: "",
        city: "",
        service: "",
        message: "",
      });

      setSelectedState(null);
      setSelectedCity(null);

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

    if (!form.name || !form.mobile || !selectedState || !selectedCity) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      ...form,
      state: selectedState.value,
      city: selectedCity.value,
    };

    await postData(payload, "", false);
  };

  return (
    <div className="visit-popup-overlay">
      <div className="visit-popup">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 className="popup-title">Request a Callback</h3>

        <form className="popup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile"
            required
            value={form.mobile}
            onChange={handleChange}
          />

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

          <select
            className="form-select"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option>New Product</option>
            <option>Service/Repair</option>
            <option>Installation</option>
            <option>AMC Plans</option>
            <option>Become a Dealer</option>
            <option>Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="3"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitPopup;
