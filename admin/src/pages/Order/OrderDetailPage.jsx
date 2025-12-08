import { useParams, useNavigate } from "react-router-dom";
import apis, { API_BASE_URL } from "../../apis/apis";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../context/auth.context";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();
  const { data } = useFetchData(validToken ? `${apis.order.getSingle}/${id}` : null, validToken);

  if (!data || !data.data) {
    return <div className="text-center my-5">Loading...</div>;
  };

  const {
    _id,
    paymentMethod,
    paymentStatus,
    orderStatus,
    subtotal,
    shippingCharge,
    discount,
    totalAmount,
    createdAt,
    items,
    address,
  } = data.data;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <div className="container my-4">
        <div className="row align-items-center mb-4">
          <div className="col-4">
            <h3 className="fw-bold mb-0">Order Details</h3>
          </div>
          <div className="col-4 text-center">
            <span className="badge bg-primary px-4 py-3" style={{ fontSize: "1rem" }}>
              Order ID: {_id}
            </span>
          </div>
          <div className="col-4 text-end">
            <button
              className="btn btn-dark"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Order Information</h5>
              </div>
              <div className="card-body">
                <p><strong>Payment Method: </strong> {paymentMethod}</p>
                <p>
                  <strong>Payment Status: </strong>
                  <span>
                    {paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Order Status: </strong>
                  <span>
                    {orderStatus}
                  </span>
                </p>
                <p><strong>Order Date:</strong> {formatDate(createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Shipping Address</h5>
              </div>
              <div className="card-body">
                <p><strong>Address Type:</strong> {address?.label}</p>
                <p><strong>Name:</strong> {address?.name}</p>
                <p><strong>Email:</strong> {address?.email}</p>
                <p><strong>Mobile:</strong> {address?.mobile}</p>
                <p><strong>City/State:</strong> {address?.city}, {address?.state}</p>
                <p><strong>Zip:</strong> {address?.zip}</p>
                <p><strong>Address:</strong> {address?.address}</p>
                <p><strong>Instruction:</strong> {address?.instruction}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Items */}
        <div className="card shadow-sm my-4">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Ordered Items</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th width="120">Price</th>
                  <th width="100">Qty</th>
                  <th width="140">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={`${API_BASE_URL}/${item.image}`}
                          width="60"
                          height="60"
                          className="rounded border"
                          alt={item?.name}
                        />
                        <span>{item?.name}</span>
                      </div>
                    </td>
                    <td>₹{item?.price?.toLocaleString()}</td>
                    <td>{item?.quantity}</td>
                    <td>₹{(item?.price * item?.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals Section */}
        <div className="row justify-content-end">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Price Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>₹{subtotal.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <strong>₹{shippingCharge}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount:</span>
                  <strong className="text-success">-₹{discount.toLocaleString()}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5">
                  <strong>Total:</strong>
                  <strong>₹{totalAmount?.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;
