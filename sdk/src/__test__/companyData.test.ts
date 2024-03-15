import ApiSDK from '..'
import dotEnv from 'dotenv'
import {
    CompanyDataInterface,
    HTTP_RESPONSE_STATUS,
    PaginatedResponseType,
    ResponseTypeDto,
    Type_Enum
} from '../companyData/types'

dotEnv.config()

describe('Test Advice API', () => {

    /* Create test client */
    const client = new ApiSDK({baseUrl: process.env.API_URL})

    let companyData: CompanyDataInterface = {
        name: "New Folder",
        content: "John Doe",
        type: Type_Enum.FOLDER,
        //parentId: null
    };

    const companyDataUpdateDto: CompanyDataInterface = {
        name: "Updated CompanyData",
        content: "John Le Roux",
        type: Type_Enum.FILE,
       // parentId: 1
    }
    let id = 0

    it('create companyData', async () => {
        const res : ResponseTypeDto<CompanyDataInterface> =  await client.createCompanyData(companyData)
        //companyData = res.data
        id = res.data.id
        expect(res.data).toMatchObject(companyData)
    },30000)


    it('Get all companyData', async () => {
        const res : ResponseTypeDto<PaginatedResponseType> =  await client.getCompanyData({search: ""})
        expect(res.data).toBeDefined()
    },30000)


    it('Get companyData', async () => {
        const res : ResponseTypeDto<CompanyDataInterface> =  await client.getCompanyDataById(id)
        expect(res.data).toMatchObject(companyData)
    },30000)


    it('Update companyData', async () => {
        const res : ResponseTypeDto<CompanyDataInterface> =  await client.updateCompanyData(id, companyDataUpdateDto)
        expect(res.data).toMatchObject(companyDataUpdateDto)
    },30000)


    it('Delete companyData', async () => {
        const res : ResponseTypeDto<CompanyDataInterface> = await client.deleteCompanyData(id)
        console.log(res)
        expect(res.statusCode).toEqual(HTTP_RESPONSE_STATUS.OK)
        expect(res.data.id).toEqual(id)
    },30000)
})
