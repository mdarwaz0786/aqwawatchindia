import { FaWhatsapp } from "react-icons/fa";
import { BiPhoneCall, } from "react-icons/bi";
import "./RightWidget.css";

const RightWidget = () => {
  return (
    <div className="right-widget">
      <div className="demo-btn">
        <span>FREE DEMO</span>
      </div>
      <a
        href="https://wa.me/918888888888"
        className="circle-btn whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={20} color="#fff" />
      </a>
      <a href="tel:918888888888" className="circle-btn chat">
        <BiPhoneCall size={20} color="#fff" />
      </a>
    </div>
  );
};

export default RightWidget;
