import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const BillingShippingFormPage = () => (
  <SingleDocumentForm
    title="Billing and Shipping Policy"
    api={{
      get: apis.billingShippingPolicy.get,
      create: apis.billingShippingPolicy.create
    }}
  />
);

export default BillingShippingFormPage;
