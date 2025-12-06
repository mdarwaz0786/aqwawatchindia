import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const ReturnRefundPolicyFormPage = () => (
  <SingleDocumentForm
    title="Return and Refund Policy"
    api={{
      get: apis.returnRefundPolicy.get,
      create: apis.returnRefundPolicy.create
    }}
  />
);

export default ReturnRefundPolicyFormPage;
