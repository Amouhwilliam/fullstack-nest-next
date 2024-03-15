import { AxiosRequestConfig } from "axios";
type Config = {
    baseUrl?: string;
    accessToken?: string;
};
export declare enum ContentType {
    JSON = "application/json",
    FORM = "application/x-www-form-urlencoded",
    MULTIPART_FORM_DATA = "multipart/form-data",
    XML = "application/xml",
    TEXT = "text/plain",
    HTML = "text/html"
}
export type ResponseTypeDto<T> = {
    status: number;
    message: string;
    error?: any;
    data?: T;
};
export declare abstract class Base {
    private readonly baseUrl?;
    private readonly accessToken?;
    constructor(config: Config);
    protected invoke<T>(endpoint: string, options?: AxiosRequestConfig, contentType?: ContentType): Promise<ResponseTypeDto<T>>;
}
export {};
