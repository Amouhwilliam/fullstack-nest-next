export declare type DocumentInterface = {
    id?: number
    name: string
    content?: string
    type: Type_Enum
    parentId?: number
    parent?: DocumentInterface
    children?: [DocumentInterface|undefined]
}

export type UpsertDocumentInterface = {
    id?: number
    name?: string
    owner_name?: string
    type?: string
    parentId?: number
}

export type ResponseTypeDto<DataType> = {
    statusCode: number,
    message: string,
    error?: any,
    data?: DataType
}

export type PaginatedResponseType = {
    data: DocumentInterface[],
    meta: any
}

export enum Type_Enum {
    FILE = "FILE",
    FOLDER = "FOLDER"
}

export enum HTTP_RESPONSE_STATUS{
    OK=200
}