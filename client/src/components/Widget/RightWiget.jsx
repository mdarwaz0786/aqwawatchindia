import { FaWhatsapp } from "react-icons/fa";
import { BiPhoneCall, } from "react-icons/bi";
import "./RightWidget.css";

const RightWidget = () => {
  const message = "Hello, I want to book a free demo";
  const encodedMsg = encodeURIComponent(message);

  return (
    <div className="right-widget">
      <div className="demo-btn" onClick={() => window.openVisitPopup()}>
        <span>BOOK A FREE DEMO</span>
      </div>
      <a
        href={`https://wa.me/7011781706?text=${encodedMsg}`}
        className="circle-btn whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={20} color="#fff" />
      </a>
      <a href="tel:7011781706" className="circle-btn chat">
        <BiPhoneCall size={20} color="#fff" />
      </a>
    </div>
  );
};

export default RightWidget;
