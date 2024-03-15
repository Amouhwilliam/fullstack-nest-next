import { Base, ResponseTypeDto } from "../base";
import {CompanyDataInterface, PaginatedResponseType, UpsertCompanyDataInterface} from "./types";

export class CompanyData extends Base {

    /**
     * Create a new companyData
     * @returns {Promise<ResponseTypeDto<CompanyDataInterface>>}
     * @memberOf CompanyData
     * @example companyData.createCompanyData({name: "LEATHER"})
     * @example companyData.createCompanyData({name: "LEATHER", description: "Leather companyData"})
     * @param companyData
     */
    public async createCompanyData(companyData: UpsertCompanyDataInterface): Promise<ResponseTypeDto<CompanyDataInterface>>
    {
        return await this.invoke<CompanyDataInterface>(`company-data`,
        {
            method: "POST",
            data: companyData
        })
    }

    /**
     * Get a companyData by specifying the id
     * @param {number} companyDataId The id of the companyData
     * @returns {Promise<ResponseTypeDto<CompanyDataInterface>>}
     * @memberOf CompanyData
     * @example companyData.getCompanyDataById(1)
     */
    public async getCompanyDataById(companyDataId: number): Promise<ResponseTypeDto<CompanyDataInterface>>
    {
        return await this.invoke<CompanyDataInterface>(`company-data/${companyDataId}`)
    }

    /**
     * Get all the companyData
     * @param search
     * @param parentId
     * @returns {Promise<ResponseTypeDto<PaginatedResponseType>>}
     * @memberOf CompanyData
     * @example companyData.getAllCompanyData()
     * @example companyData.getAllCompanyData(1, 10)
     * @example companyData.getAllCompanyData(2, 10)
     * @example companyData.getAllCompanyData(2, 20, "desc")
     */
    public async getCompanyData({search, parentId}: {search: string, parentId?: number}): Promise<ResponseTypeDto<CompanyDataInterface[]>>
    {
        return await this.invoke<CompanyDataInterface[]>(`company-data`,
        {
            params: {search, parentId },
        })
    }

    /**
     * Update a companyData by specifying the id and the fields to update
     * @param {number} companyDataId The id of the companyData
     * @param {Partial<UpsertCompanyDataInterface>} companyDataData The fields to update
     * @returns {Promise<ResponseTypeDto<CompanyDataInterface>>}
     * @memberOf CompanyData
     * @example companyData.updateCompanyData(1, { name: "File", type: "FILE" })
     * @example companyData.updateCompanyData(1, { name: "LTH<QWERTY>90" })
     */
    public async updateCompanyData(companyDataId: number, companyDataData: Partial<UpsertCompanyDataInterface>): Promise<ResponseTypeDto<CompanyDataInterface>>
    {
        return await this.invoke<CompanyDataInterface>(`company-data/${companyDataId}`,
        {
            method: "PATCH",
            data: companyDataData
        })
    }

    /**
     * Delete a companyData by specifying the id
     * @param {number} companyDataId The id of the companyData
     * @returns {Promise<ResponseTypeDto<CompanyDataInterface>>}
     * @memberOf CompanyData
     * @example companyData.deleteCompanyData(1)
     */
    public async deleteCompanyData(companyDataId: number): Promise<ResponseTypeDto<CompanyDataInterface>>
    {
        return await this.invoke<CompanyDataInterface>(`company-data/${companyDataId}`,
        {
            method: "DELETE"
        })
    }
}
