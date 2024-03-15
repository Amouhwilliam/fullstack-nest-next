import { Base } from "./base";
import { applyMixins } from "./utils";
import { CompanyData } from "./companyData";

class ApiSDK extends Base{}
interface ApiSDK extends CompanyData{}
applyMixins(ApiSDK, [CompanyData]);
export default ApiSDK;
export * as types from "./companyData/types"