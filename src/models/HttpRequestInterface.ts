import { RequestHeadersInterface } from "./RequestHeadersInterface";

export interface HttpRequestInterface {
    method: string,
    headers: RequestHeadersInterface,
    body?: any,
}