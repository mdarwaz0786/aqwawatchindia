import React, { useEffect, useState, useRef } from "react";

const Video = ({
  label,
  padding = "16px",
  placeholder = "video",
  name,
  value,
  onChange,
  required = false,
  error,
  width,
  maxPreviewHeight = "180px",
}) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    if (value && typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  const handleVideoChange = (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleVideoChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleVideoChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeVideo = () => {
    setPreview(null);
    onChange(null, true);
  };

  return (
    <div className={`${width} mb-4`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded text-center ${isDragging ? "bg-light border-primary" : ""}`}
        style={{
          cursor: "pointer",
          border: `1px solid ${isDragging ? "#0d6efd" : "#ced4da"}`,
          transition: "border-color 0.2s ease",
          padding,
        }}
        onClick={() => dropRef.current.querySelector("input")?.click()}
      >
        {preview ? (
          <video
            src={preview}
            controls
            className="w-100 rounded mb-2"
            style={{ maxHeight: maxPreviewHeight }}
          />
        ) : (
          <p className="text-muted mb-0">
            {isDragging
              ? `Drop the ${placeholder} here...`
              : `Drag & drop a ${placeholder} or click to browse`}
          </p>
        )}

        <input
          type="file"
          id={name}
          name={name}
          accept="video/*"
          className="d-none"
          onChange={handleFileInputChange}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}

      {preview && (
        <div className="mt-2 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={removeVideo}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Video);
