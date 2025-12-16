import { useParams, useNavigate } from "react-router-dom";
import apis, { API_BASE_URL } from "../../apis/apis";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../context/auth.context";
import downloadPDF from "../../utils/DownloadPDF";
import companyLogo from "../../assets/logo.jpeg";
import formatDate from "../../utils/FormatDate";

const OrderInvoicePage = () => {
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
    totalAmount,
    createdAt,
    items,
    address,
  } = data.data;

  return (
    <>
      <div className="row align-items-center mb-4">
        <div className="col-4">
          <h4 className="fw-bold mb-0">Order Invoice</h4>
        </div>
        <div className="col-4 text-center">
          <button
            className="btn btn-success"
            onClick={() => downloadPDF("invoice-pdf", `Invoice-${_id}.pdf`)}
          >
            Download
          </button>
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

      <div className="container">
        <div id="invoice-pdf">
          <div className="card shadow-sm border-0">
            <div className="card-body p-3">
              {/* Header */}
              <div className="row align-items-center mb-4">
                <div className="col-md-6 d-flex align-items-center gap-3">
                  <img
                    src={companyLogo}
                    alt="logo"
                    width="80"
                    height="100"
                    className="img-fluid"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">INVOICE</h4>
                    <p className="text-muted mb-0">Order ID: {_id}</p>
                    <p className="text-muted mb-0">Date: {formatDate(createdAt)}</p>
                  </div>
                </div>

                <div className="col-md-6 text-md-end mt-3 mt-md-0">
                  <p className="text-muted mb-0">Payment Status: {paymentStatus}</p>
                  <p className="text-muted mb-0">Order Status: {orderStatus}</p>
                </div>
              </div>

              <hr className="my-4" />

              {/* Billing / Shipping */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Bill To</h6>
                  <p className="mb-1">{address?.name}</p>
                  <p className="mb-1 text-muted">{address?.email}</p>
                  <p className="mb-1 text-muted">{address?.mobile}</p>
                </div>

                <div className="col-md-6 text-md-end">
                  <h6 className="fw-bold mb-2">Shipping Address</h6>
                  <p className="mb-1 text-muted">
                    {address?.address}, {address?.city}
                  </p>
                  <p className="mb-1 text-muted">
                    {address?.state} - {address?.zip}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th className="text-end">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">GST</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => (
                      <tr key={item?._id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={`${API_BASE_URL}/${item?.image}`}
                              width="50"
                              height="50"
                              alt={item?.name}
                            />
                            <span className="fw-medium">{item?.name}</span>
                          </div>
                        </td>
                        <td className="text-end">₹{item?.price?.toLocaleString()}</td>
                        <td className="text-center">{item?.quantity}</td>
                        <td className="text-end">{item?.gstPercent}%</td>
                        <td className="text-end fw-semibold">
                          ₹{item?.total?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="row justify-content-end">
                <div className="col-md-5">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Subtotal</span>
                      <strong>₹{subtotal?.toLocaleString()}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Shipping</span>
                      <strong>₹{shippingCharge?.toLocaleString()}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between fs-5">
                      <strong>Total</strong>
                      <strong>₹{totalAmount?.toLocaleString()}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="my-4" />

              {/* Footer */}
              <div className="text-center text-muted small">
                <p className="mb-1">
                  Payment Method: <strong>{paymentMethod}</strong>
                </p>
                <p className="mb-0">
                  Thank you for shopping with us ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInvoicePage;
