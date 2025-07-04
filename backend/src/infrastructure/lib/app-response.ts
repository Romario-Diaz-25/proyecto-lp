import {
  DBData,
  IAppResponse,
} from "../../application/model/common/db-response.interface";
import { HttpCode, statusResponse } from "./http-status-codes";

const RESPONSE_STATUS: any = {
  POST: {
    httpCode: HttpCode.CREATED,
    message: statusResponse.CREATED,
  },
  GET: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  PUT: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  DELETE: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  PATCH: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
};

export class AppResponse<T> implements IAppResponse<T> {
  data?: DBData<T>;
  success: boolean;
  kindMessage?: string;
  httpCode?: number;

  constructor(method: string, data?: IAppResponse<T>) {
    const { httpCode, message } = RESPONSE_STATUS[method];
    this.success = data?.success ?? true;
    this.kindMessage = data?.kindMessage ?? "";
    this.data = data?.data;
    this.httpCode = httpCode;
  }
}
