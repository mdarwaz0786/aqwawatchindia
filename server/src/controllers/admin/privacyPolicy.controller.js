import PrivacyPolicyModel from "../../models/privacyPolicy.model.js";
import { singleDocumentController } from "./singleDocument.controller.js";

export const {
  createOrUpdate: createOrUpdatePrivacyPolicy,
  get: getPrivacyPolicy,
  delete: deletePrivacyPolicy,
} = singleDocumentController(PrivacyPolicyModel);
