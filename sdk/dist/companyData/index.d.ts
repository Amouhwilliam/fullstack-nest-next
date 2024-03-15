import { Base, ResponseTypeDto } from "../base";
import { CompanyDataInterface, UpsertCompanyDataInterface } from "./types";
export declare class CompanyData extends Base {
    createCompanyData(companyData: UpsertCompanyDataInterface): Promise<ResponseTypeDto<CompanyDataInterface>>;
    getCompanyDataById(companyDataId: number): Promise<ResponseTypeDto<CompanyDataInterface>>;
    getCompanyData({ search, parentId }: {
        search: string;
        parentId?: number;
    }): Promise<ResponseTypeDto<CompanyDataInterface[]>>;
    updateCompanyData(companyDataId: number, companyDataData: Partial<UpsertCompanyDataInterface>): Promise<ResponseTypeDto<CompanyDataInterface>>;
    deleteCompanyData(companyDataId: number): Promise<ResponseTypeDto<CompanyDataInterface>>;
}
