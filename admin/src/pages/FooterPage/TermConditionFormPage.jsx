import apis from "../../apis/apis";
import SingleDocumentForm from "./SingleDocumentFom";

const TermConditionFormPage = () => (
  <SingleDocumentForm
    title="Term and Condition"
    api={{
      get: apis.termCondition.get,
      create: apis.termCondition.create
    }}
  />
);

export default TermConditionFormPage;
