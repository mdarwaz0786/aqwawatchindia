import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./OrderSuccessPage.module.css";

const OrderSuccessPage = () => {
  return (
    <>
      <Header />
      <section className={styles.orderSuccessSection}>
        <div className="container d-flex justify-content-center">
          <div className={`${styles.successCard} shadow-sm p-4 rounded-4`}>
            <div className={styles.successIcon}>
              <div className={styles.checkmark}></div>
            </div>
            <h2 className="text-center fw-bold mb-2 text-success">
              Order Placed Successfully!
            </h2>
            <p className="text-center text-muted">Thank you for your order.</p>
            <div className="mt-4 d-flex gap-3">
              <Link to="/products" className="btn btn-dark w-50 py-2">
                Continue Shopping
              </Link>
              <Link to="/dashboard" className="btn btn-outline-dark w-50 py-2">
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
