import React, { useEffect, useState } from "react";
import "./VisitPopup.css";

const VisitPopup = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("visitPopupShown");
    if (!alreadyShown) {
      setTimeout(() => setOpen(true), 500);
      sessionStorage.setItem("visitPopupShown", "true");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you soon.");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="visit-popup-overlay">
      <div className="visit-popup">
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <h3 className="popup-title">Request a Callback</h3>

        <form className="popup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
          />

          <select
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select City</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Pune</option>
            <option>Jaipur</option>
            <option>Lucknow</option>
            <option>Other</option>
          </select>

          <select
            name="service"
            required
            value={form.service}
            onChange={handleChange}
          >
            <option value="">Select Service Type</option>
            <option>New Product</option>
            <option>Repair Service</option>
            <option>AMC</option>
            <option>Become a Dealer</option>
            <option>Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="3"
            required
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VisitPopup;
