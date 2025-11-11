import React, { useState } from "react";
import RichTextEditor from "./components/Input/RichTextEditor";

const Test = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("✅ Product Data Submitted:");
    console.log(formData);

    // send to backend:
    // await axios.post("/api/products", formData)
  };

  return (
    <div className="container mt-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Rich Text Editor for Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <RichTextEditor
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default Test;
