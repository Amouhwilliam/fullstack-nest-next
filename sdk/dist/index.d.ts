import { Base } from "./base";
import { CompanyData } from "./companyData";
declare class ApiSDK extends Base {
}
interface ApiSDK extends CompanyData {
}
export default ApiSDK;
export * as types from "./companyData/types";
