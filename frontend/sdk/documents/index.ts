import { Base, ResponseTypeDto } from "../base";
import {DocumentInterface, UpsertDocumentInterface} from "./types";

export class Document extends Base {

    /**
     * Create a new documents
     * @returns {Promise<ResponseTypeDto<DocumentInterface>>}
     * @memberOf Document
     * @example documents.createDocument({name: "LEATHER"})
     * @example documents.createDocument({name: "LEATHER", description: "Leather documents"})
     * @param document
     */
    public async createDocument(document: UpsertDocumentInterface): Promise<ResponseTypeDto<DocumentInterface>>
    {
        return await this.invoke<DocumentInterface>(`company-data`,
        {
            method: "POST",
            data: document
        })
    }

    /**
     * Get a documents by specifying the id
     * @param {number} documentId The id of the documents
     * @returns {Promise<ResponseTypeDto<DocumentInterface>>}
     * @memberOf Document
     * @example documents.getDocumentById(1)
     */
    public async getDocumentById(documentId: number): Promise<ResponseTypeDto<DocumentInterface>>
    {
        return await this.invoke<DocumentInterface>(`company-data/${documentId}`)
    }

    /**
     * Get all the documents
     * @param search
     * @param parentId
     * @returns {Promise<ResponseTypeDto<PaginatedResponseType>>}
     * @memberOf Document
     * @example documents.getAllDocument()
     * @example documents.getAllDocument(1, 10)
     * @example documents.getAllDocument(2, 10)
     * @example documents.getAllDocument(2, 20, "desc")
     */
    public async getDocument({search, parentId}: {search: string, parentId?: number}): Promise<ResponseTypeDto<DocumentInterface[]>>
    {
        return await this.invoke<DocumentInterface[]>(`company-data`,
        {
            params: {search, parentId },
        })
    }

    /**
     * Update a documents by specifying the id and the fields to update
     * @param {number} documentId The id of the documents
     * @param {Partial<UpsertDocumentInterface>} documentData The fields to update
     * @returns {Promise<ResponseTypeDto<DocumentInterface>>}
     * @memberOf Document
     * @example documents.updateDocument(1, { name: "File", type: "FILE" })
     * @example documents.updateDocument(1, { name: "LTH<QWERTY>90" })
     */
    public async updateDocument(documentId: number, documentData: Partial<UpsertDocumentInterface>): Promise<ResponseTypeDto<DocumentInterface>>
    {
        return await this.invoke<DocumentInterface>(`company-data/${documentId}`,
        {
            method: "PATCH",
            data: documentData
        })
    }

    /**
     * Delete a documents by specifying the id
     * @param {number} documentId The id of the documents
     * @returns {Promise<ResponseTypeDto<DocumentInterface>>}
     * @memberOf Document
     * @example documents.deleteDocument(1)
     */
    public async deleteDocument(documentId: number): Promise<ResponseTypeDto<DocumentInterface>>
    {
        return await this.invoke<DocumentInterface>(`company-data/${documentId}`,
        {
            method: "DELETE"
        })
    }
}
