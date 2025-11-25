import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="spinner-border" style={{ color: "#df4738" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;
