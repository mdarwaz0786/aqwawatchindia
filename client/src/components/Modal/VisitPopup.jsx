import { useEffect, useState } from "react";
import Select from "react-select";
import "./VisitPopup.css";

const VisitPopup = ({ open, setOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    message: "",
  });

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("visitPopupShown");

    if (!alreadyShown) {
      setTimeout(() => {
        setOpen(true);
      }, 1000);

      sessionStorage.setItem("visitPopupShown", "true");
    }
  }, [setOpen]);

  useEffect(() => {
    async function loadCities() {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India" }),
          }
        );

        const data = await response.json();
        const cityList = data.data || [];

        const formatted = cityList.map((city) => ({
          label: city,
          value: city,
        }));

        setCities(formatted);
      } catch (error) {
        console.error("Failed to load cities", error);
      } finally {
        setLoadingCities(false);
      }
    }

    loadCities();
  }, []);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCityChange = (option) => {
    setForm({ ...form, city: option.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you soon.");
    onClose();
  };

  return (
    <div className="visit-popup-overlay">
      <div className="visit-popup">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h3 className="popup-title">Request a Callback</h3>

        <form className="popup-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} />

          <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" />

          <div className="mb-3">
            <Select
              options={cities}
              isSearchable
              isLoading={loadingCities}
              placeholder="Select City"
              onChange={handleCityChange}
            />
          </div>

          <select name="service" required value={form.service} onChange={handleChange}>
            <option value="">Select Service Type</option>
            <option>New Product</option>
            <option>Repair Service</option>
            <option>AMC</option>
            <option>Become a Dealer</option>
            <option>Other</option>
          </select>

          <textarea name="message" placeholder="Your Message" rows="3" required value={form.message} onChange={handleChange}></textarea>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VisitPopup;
