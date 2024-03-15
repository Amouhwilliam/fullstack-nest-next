export declare type CompanyDataInterface = {
    id?: number;
    name: string;
    content?: string;
    type: Type_Enum;
    parentId?: number;
    parent?: CompanyDataInterface;
    children?: [CompanyDataInterface | undefined];
};
export type UpsertCompanyDataInterface = {
    id?: number;
    name?: string;
    owner_name?: string;
    type?: string;
    parentId?: number;
};
export type ResponseTypeDto<DataType> = {
    statusCode: number;
    message: string;
    error?: any;
    data?: DataType;
};
export type PaginatedResponseType = {
    data: CompanyDataInterface[];
    meta: any;
};
export declare enum Type_Enum {
    FILE = "FILE",
    FOLDER = "FOLDER"
}
export declare enum HTTP_RESPONSE_STATUS {
    OK = 200
}
