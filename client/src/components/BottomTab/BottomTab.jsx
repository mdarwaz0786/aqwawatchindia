import { NavLink } from "react-router-dom";
import { FaHome, FaStore, FaShoppingCart, FaUser } from "react-icons/fa";
import "./BottomTab.css";

const BottomTab = () => {
  return (
    <div className="mobile-bottom-tab">
      <NavLink to="/" className="tab-item">
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/products" className="tab-item">
        <FaStore />
        <span>Shop</span>
      </NavLink>

      <NavLink to="/cart" className="tab-item">
        <FaShoppingCart />
        <span>Cart</span>
      </NavLink>

      <NavLink to="/profile" className="tab-item">
        <FaUser />
        <span>Account</span>
      </NavLink>
    </div>
  );
};

export default BottomTab;
