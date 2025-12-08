import React from "react";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  width,
  rows = 4,
  error,
  placeholder = "Write...",
}) => {
  return (
    <div className={`${width} mb-4`}>
      <label className="col-form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default React.memo(TextArea);
