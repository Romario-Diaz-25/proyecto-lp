/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequestData {
  method: IHttpMethods;
  url: string;
  headers?: any;
  params?: any;
  data?: any;
  auth?: any;
}

type IHttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
