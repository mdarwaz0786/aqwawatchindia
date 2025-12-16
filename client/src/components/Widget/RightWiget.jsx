import { FaWhatsapp } from "react-icons/fa";
import { BiPhoneCall, } from "react-icons/bi";
import "./RightWidget.css";
import { useApp } from "../../context/app.context";

const RightWidget = () => {
  const { contactus } = useApp();

  const message = "Hi";
  const encodedMsg = encodeURIComponent(message);
  const mobile = contactus?.primaryMobile;

  return (
    <>
      <div className="right-widget" style={{ zIndex: 999 }}>
        <div className="demo-btn" onClick={() => window.openVisitPopup()}>
          <span>BOOK FREE DEMO</span>
        </div>
        <a
          href={`https://wa.me/${mobile}?text=${encodedMsg}`}
          className="circle-btn whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={20} color="#fff" />
        </a>
        <a href={`tel:${mobile}`} className="circle-btn chat">
          <BiPhoneCall size={20} color="#fff" />
        </a>
      </div>
    </>
  );
};

export default RightWidget;
