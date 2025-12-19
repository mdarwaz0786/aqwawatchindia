import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import formatDate from "../../utils/FormatDate";

const ContactEnquiryDetailPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useFetchData(
    `${apis.contactEnquiry.getSingle}/${id}`,
    validToken
  );

  const enquiry = data?.data;
  if (!enquiry) return null;

  const hasPersonalInfo =
    enquiry?.name || enquiry?.email || enquiry?.mobile;

  const hasServiceInfo =
    enquiry?.service?.name || enquiry?.from;

  const hasLocation =
    enquiry?.country ||
    enquiry?.state ||
    enquiry?.city ||
    enquiry?.zip ||
    enquiry?.address;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Header */}
          <div className="card shadow-sm mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">Contact Enquiry Details</h4>
                <small className="text-muted">
                  Enquiry ID: {enquiry?._id}
                </small>
              </div>

              {typeof enquiry?.status === "boolean" && (
                <span
                  className={`badge px-3 py-2 ${enquiry.status ? "bg-success" : "bg-danger"}`}
                >
                  {enquiry?.status ? "Active" : "Inactive"}
                </span>
              )}
            </div>
          </div>

          {/* Personal Information */}
          {hasPersonalInfo && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light fw-semibold">
                Personal Information
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {enquiry?.name && (
                    <div className="col-md-4">
                      <label className="text-muted small">Name</label>
                      <div className="fw-semibold">{enquiry?.name}</div>
                    </div>
                  )}

                  {enquiry?.email && (
                    <div className="col-md-4">
                      <label className="text-muted small">Email</label>
                      <div className="fw-semibold">{enquiry?.email}</div>
                    </div>
                  )}

                  {enquiry?.mobile && (
                    <div className="col-md-4">
                      <label className="text-muted small">Mobile</label>
                      <div className="fw-semibold">{enquiry?.mobile}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Service Information */}
          {hasServiceInfo && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light fw-semibold">
                Service Information
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {enquiry?.service?.name && (
                    <div className="col-md-6">
                      <label className="text-muted small">Service</label>
                      <div className="fw-semibold">
                        {enquiry.service.name}
                      </div>
                    </div>
                  )}

                  {enquiry?.from && (
                    <div className="col-md-6">
                      <label className="text-muted small">Enquiry From</label>
                      <div className="fw-semibold">{enquiry?.from}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Location Details */}
          {hasLocation && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light fw-semibold">
                Location Details
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {enquiry?.country && (
                    <div className="col-md-3">
                      <label className="text-muted small">Country</label>
                      <div className="fw-semibold">{enquiry?.country}</div>
                    </div>
                  )}

                  {enquiry?.state && (
                    <div className="col-md-3">
                      <label className="text-muted small">State</label>
                      <div className="fw-semibold">{enquiry?.state}</div>
                    </div>
                  )}

                  {enquiry?.city && (
                    <div className="col-md-3">
                      <label className="text-muted small">City</label>
                      <div className="fw-semibold">{enquiry?.city}</div>
                    </div>
                  )}

                  {enquiry?.zip && (
                    <div className="col-md-3">
                      <label className="text-muted small">ZIP</label>
                      <div className="fw-semibold">{enquiry?.zip}</div>
                    </div>
                  )}
                </div>

                {enquiry?.address && (
                  <div className="mt-3">
                    <label className="text-muted small">Address</label>
                    <div className="fw-semibold" style={{ whiteSpace: "pre-line" }}>
                      {enquiry?.address}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {(enquiry?.subject || enquiry?.message) && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light fw-semibold">
                Message
              </div>

              <div className="card-body">
                {enquiry?.subject && (
                  <h6 className="fw-semibold mb-2">
                    {enquiry?.subject}
                  </h6>
                )}

                {enquiry?.message && (
                  <p className="mb-0 text-muted">
                    {enquiry?.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center">
            {enquiry.createdAt && (
              <small className="text-muted">
                Submitted on:{" "}
                {formatDate(enquiry?.createdAt)}
              </small>
            )}
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEnquiryDetailPage;
