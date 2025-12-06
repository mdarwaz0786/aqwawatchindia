import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const CookiePolicyFormPage = () => (
  <SingleDocumentForm
    title="Cookie Policy"
    api={{
      get: apis.cookiePolicy.get,
      create: apis.cookiePolicy.create
    }}
  />
);

export default CookiePolicyFormPage;
