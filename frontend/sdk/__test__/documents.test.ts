import ApiSDK from '../index'
import dotEnv from 'dotenv'
import {
    DocumentInterface,
    HTTP_RESPONSE_STATUS,
    PaginatedResponseType,
    ResponseTypeDto,
    Type_Enum
} from '../documents/types'

dotEnv.config()

describe('Test Advice API', () => {

    const baseUrl: string = `${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`

    /* Create test client */
    const client = new ApiSDK({baseUrl})

    let companyData: DocumentInterface = {
        name: "New Folder",
        content: "John Doe",
        type: Type_Enum.FOLDER,
        //parentId: null
    };

    const companyDataUpdateDto: DocumentInterface = {
        name: "Updated Document",
        content: "John Le Roux",
        type: Type_Enum.FILE,
       // parentId: 1
    }
    let id = 0

    it('create documents', async () => {
        const res : ResponseTypeDto<DocumentInterface> =  await client.createDocument(companyData)
        //documents = res.data
        id = res.data.id
        expect(res.data).toMatchObject(companyData)
    },30000)


    it('Get all documents', async () => {
        const res : ResponseTypeDto<PaginatedResponseType> =  await client.getDocument({search: ""})
        expect(res.data).toBeDefined()
    },30000)


    it('Get documents', async () => {
        const res : ResponseTypeDto<DocumentInterface> =  await client.getDocumentById(id)
        expect(res.data).toMatchObject(companyData)
    },30000)


    it('Update documents', async () => {
        const res : ResponseTypeDto<DocumentInterface> =  await client.updateDocument(id, companyDataUpdateDto)
        expect(res.data).toMatchObject(companyDataUpdateDto)
    },30000)


    it('Delete documents', async () => {
        const res : ResponseTypeDto<DocumentInterface> = await client.deleteDocument(id)
        console.log(res)
        expect(res.statusCode).toEqual(HTTP_RESPONSE_STATUS.OK)
        expect(res.data.id).toEqual(id)
    },30000)
})
