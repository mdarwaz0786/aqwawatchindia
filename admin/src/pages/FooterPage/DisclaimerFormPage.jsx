import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const DisclaimerFormPage = () => (
  <SingleDocumentForm
    title="Diaclaimer"
    api={{
      get: apis.disclaimer.get,
      create: apis.disclaimer.create
    }}
  />
);

export default DisclaimerFormPage;
