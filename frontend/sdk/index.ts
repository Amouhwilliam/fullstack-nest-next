import { Base } from "./base";
import { applyMixins } from "./utils";
import { Document } from "./documents";

class ApiSDK extends Base{}
interface ApiSDK extends Document{}
applyMixins(ApiSDK, [Document]);
export default ApiSDK;
export * as types from "./documents/types"