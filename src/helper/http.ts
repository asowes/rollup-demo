import BaseModel from "../models/BaseModel";

const isDebugHttp = true;
const DEFAULT_DOMAIN = "http://localhost:8181";

type HttpMethod = {
  GET: "GET";
  POST: "POST";
  PUT: "PUT";
  PATCH: "PATCH";
  DELETE: "DELETE";
};

export class http {
  private static server_domain: string = DEFAULT_DOMAIN;

  // 覆盖请求域名
  public static changeDomain = (domain: string) => {
    this.server_domain = domain;
  };

  private static tapLog = (json: any) => {
    if (isDebugHttp) {
      if (Array.isArray(json)) {
        console.log("tapLog array=", json.length);
      } else {
        console.log("tapLog object=", typeof json);
      }
    }
    return json;
  };

  // BaseModel是用于对DB进行CRUD的Model，非DB操作请用GET_ANY
  static async GET<T extends BaseModel>(
    url: string,
    headers?: HeadersInit
  ): Promise<T> {
    return this.sendModifyRequest("GET", url, null, headers);
  }

  static async GET_ANY<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.sendModifyRequest("GET", url, null, headers);
  }

  // BaseModel是用于对DB进行CRUD的Model，非DB操作请用GET_ANYS
  static async GET_MANY<T extends BaseModel>(
    url: string,
    headers?: HeadersInit
  ): Promise<T[]> {
    return this.sendModifyRequest("GET", url, null, headers);
  }

  static async GET_ANYS<T>(url: string, headers?: HeadersInit): Promise<T[]> {
    return this.sendModifyRequest("GET", url, null, headers);
  }

  static async GET_ByPage<T extends BaseModel>(
    url: string,
    headers?: HeadersInit
  ): Promise<T[]> {
    return this.sendModifyRequest("GET", url, null, headers);
  }

  static async DELETE<T extends BaseModel>(
    url: string,
    headers?: HeadersInit
  ): Promise<T> {
    return this.sendModifyRequest("DELETE", url, null, headers);
  }

  static async DELETE_ANY<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.sendModifyRequest("DELETE", url, null, headers);
  }

  // BaseModel是用于对DB进行CRUD的Model，非DB操作的POST命令(如login功能)请用POST_ANY
  static POST<T extends BaseModel>(
    url: string,
    data: T,
    headers?: HeadersInit
  ): Promise<T> {
    return http.sendModifyRequest("POST", url, data, headers);
  }

  static POST_ANY<T>(
    url: string,
    data: any,
    headers?: HeadersInit
  ): Promise<T> {
    return http.sendModifyRequest("POST", url, data, headers);
  }

  static PUT<T extends BaseModel>(
    url: string,
    data: T,
    headers?: HeadersInit
  ): Promise<T> {
    return http.sendModifyRequest("PUT", url, data, headers);
  }

  static PUT_ANY<T>(url: string, data: any, headers?: HeadersInit): Promise<T> {
    return http.sendModifyRequest("PUT", url, data, headers);
  }

  static PATCH<T extends BaseModel>(
    url: string,
    data: T,
    headers?: HeadersInit
  ): Promise<T> {
    return http.sendModifyRequest("PATCH", url, data, headers);
  }

  private static async sendModifyRequest<T extends BaseModel>(
    httpMethod: keyof HttpMethod,
    url: string,
    data: T,
    headers?: HeadersInit
  ): Promise<T> {
    const requestOption: RequestInit = {
      method: httpMethod,
      body: data ? JSON.stringify(data) : null,
    };

    // 设置默认请求头部信息
    const customizedHeaders = headers ? new Headers(headers) : new Headers();
    this.setHeaderIfNotGiven(
      customizedHeaders,
      "Content-Type",
      "application/json"
    );
    this.setHeaderIfNotGiven(customizedHeaders, "Authorization", "123");
    requestOption.headers = customizedHeaders;

    return this.fetchJson(this.server_domain + url, requestOption);
  }

  private static setHeaderIfNotGiven(
    headers: Headers,
    name: string,
    value: string
  ) {
    if (!headers?.get(name)) {
      headers?.set(name, value);
    }
  }

  private static async fetchJson(url: string, requestOption: RequestInit) {
    console.log("URL to fetch:" + url, requestOption);
    // FIXME 401/403 .json error
    return (await fetch(url, requestOption)).json().then(http.tapLog);
  }
}
