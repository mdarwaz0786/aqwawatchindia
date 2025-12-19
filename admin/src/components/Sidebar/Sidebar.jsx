/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useMemo } from "react";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdChevronRight,
  MdClose,
  MdStorefront,
  MdCategory,
  MdLayers,
  MdStore,
  MdArticle,
  MdHome,
  MdContactMail,
  MdInfo,
} from "react-icons/md";
import logo from "../../assets/logo.jpeg";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = ({ mobileOpen, setMobileOpen, handleToggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const sidebarRef = useRef(null);

  const dropdownData = [
    {
      title: "Shipping Charge",
      icon: <MdStorefront />,
      items: [
        { label: "Shipping Charge List", link: "/shipping-charge/list" },
        { label: "Add Shipping Charge", link: "/shipping-charge/add" },
      ],
    },
    {
      title: "Product",
      icon: <MdStorefront />,
      items: [
        { label: "Product List", link: "/product/list" },
        { label: "Add Product", link: "/product/add" },
      ],
    },
    {
      title: "Category",
      icon: <MdCategory />,
      items: [
        { label: "Category List", link: "/category/list" },
        { label: "Add Category", link: "/category/add" },
      ],
    },
    {
      title: "Sub Category",
      icon: <MdLayers />,
      items: [
        { label: "Sub Category List", link: "/sub-category/list" },
        { label: "Add Sub Category", link: "/sub-category/add" },
      ],
    },
    {
      title: "Brand",
      icon: <MdStore />,
      items: [
        { label: "Brand List", link: "/brand/list" },
        { label: "Add Brand", link: "/brand/add" },
      ],
    },
    {
      title: "User",
      icon: <MdPeople />,
      items: [
        { label: "Customer", link: "/customer/list" },
      ],
    },
    {
      title: "Home Page",
      icon: <MdHome />,
      items: [
        { label: "Carousel", link: "/carousel/list" },
        { label: "Promotion", link: "/promotion/list" },
        { label: "YouTube Video", link: "/youtube-video/list" },
        { label: "Testimonial", link: "/testimonial/list" },
        { label: "Client", link: "/client/list" },
        { label: "Blog Category", link: "/blog-category/list" },
        { label: "Blog", link: "/blog/list" },
      ],
    },
    {
      title: "Company Policy",
      icon: <MdArticle />,
      items: [
        { label: "Privacy Policy", link: "/privacy-policy/add" },
        { label: "Billing & Shipping Policy", link: "/billing-shipping-policy/add" },
        { label: "Cookie Policy", link: "/cookie-policy/add" },
        { label: "Disclaimer", link: "/disclaimer/add" },
        { label: "Return & Refund Policy", link: "/return-refund-policy/add" },
        { label: "Terms & Conditions", link: "/term-condition/add" },
      ],
    },
    {
      title: "Company Detail",
      icon: <MdInfo />,
      items: [
        { label: "Contact Us", link: "/contactus/add" },
        { label: "About Us", link: "/aboutus/add" },
      ],
    },
    {
      title: "Contact Enquiry",
      icon: <MdContactMail />,
      items: [
        { label: "Dealer", link: "/contact-enquiry/list/dealer" },
        { label: "Service/Free Demo", link: "/contact-enquiry/list/service" },
        { label: "Contact Us", link: "/contact-enquiry/list/contact" },
      ],
    },
    {
      title: "Contact Enquiry Form",
      icon: <MdContactMail />,
      items: [
        { label: "Service", link: "/service/list" },
        { label: "Form", link: "/contact-enquiry-form" },
      ],
    },
  ];

  const staticLinks = [
    { label: "Dashboard", icon: <MdDashboard />, link: "/" },
    { label: "Orders", icon: <MdShoppingCart />, link: "/order/list" },
  ];

  const dropdownRefs = useMemo(() => dropdownData.map(() => ({ current: null })), []);

  const handleDropdownClick = (e, index) => {
    e.preventDefault();
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleLinkClick = (label) => {
    setActiveLink(label);
    if (window.innerWidth <= 768) setMobileOpen(false);
  };

  useEffect(() => {
    dropdownRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.style.maxHeight = openDropdown === idx ? `${ref.current.scrollHeight}px` : "0px";
      };
    });
  }, [openDropdown]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        window.innerWidth <= 768 &&
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      };
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileOpen, setMobileOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""}`}
    >
      <header className={styles.sidebarHeader}>
        <Link to="/" className={styles.headerLogo} onClick={handleToggleSidebar}>
          <img src={logo} alt="Logo" />
        </Link>
        <button className={styles.mobileCloseBtn} onClick={handleToggleSidebar}>
          <MdClose />
        </button>
      </header>

      <div className={styles.sidebarScrollArea}>
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {staticLinks.slice(0, 2).map((link) => (
              <li className={styles.navItem} key={link.label}>
                <Link
                  to={link.link}
                  className={`${styles.navLink} ${activeLink === link.label ? styles.active : ""}`}
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.icon}
                  <span className={styles.navLabel}>{link.label}</span>
                </Link>
              </li>
            ))}

            {dropdownData.map((dropdown, index) => (
              <li
                key={dropdown.title}
                className={`${styles.navItem} ${styles.dropdownContainer} ${openDropdown === index ? styles.open : ""}`}
              >
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.dropdownToggle}`}
                  onClick={(e) => handleDropdownClick(e, index)}
                >
                  {dropdown.icon}
                  <span className={styles.navLabel}>{dropdown.title}</span>
                  <MdChevronRight className={styles.dropdownIcon} />
                </Link>

                <ul
                  className={styles.dropdownMenu}
                  ref={(el) => (dropdownRefs[index].current = el)}
                >
                  {dropdown.items.map((item) => (
                    <li className={styles.navItem} key={item.label}>
                      <Link
                        to={item.link}
                        className={`${styles.navLink} ${styles.dropdownLink} ${activeLink === item.label ? styles.active : ""}`}
                        onClick={() => handleLinkClick(item.label)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {staticLinks.slice(2).map((link) => (
              <li className={styles.navItem} key={link.label}>
                <Link
                  to={link.link}
                  className={`${styles.navLink} ${activeLink === link.label ? styles.active : ""}`}
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.icon}
                  <span className={styles.navLabel}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
