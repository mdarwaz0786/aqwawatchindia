import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const PrivacyPolicyFormPage = () => (
  <SingleDocumentForm
    title="Privacy and Policy"
    api={{
      get: apis.privacyPolicy.get,
      create: apis.privacyPolicy.create
    }}
  />
);

export default PrivacyPolicyFormPage;
