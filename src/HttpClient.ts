import queryString from "query-string";

import { CybozuUserAPIError, ErrorResponse } from "./CybozuUserAPIError.js";

type ParamsPrimitiveValue = string | number | undefined;
type Params = Record<
  string,
  ParamsPrimitiveValue | readonly ParamsPrimitiveValue[]
>;

export class HttpClient {
  private baseUrl: string;
  private username: string;
  private password: string;

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;
  }

  public async get<T extends object>(path: string, params: Params): Promise<T> {
    const url = queryString.stringifyUrl(
      { url: `${this.baseUrl}${path}`, query: params },
      { arrayFormat: "index" },
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Cybozu-Authorization": Buffer.from(
          `${this.username}:${this.password}`,
        ).toString("base64"),
      },
    });
    return HttpClient.handleResponse(response);
  }

  private static async handleResponse<T>(response: Response) {
    const data = await response.json();

    if (response.ok) {
      return data as T;
    }

    throw new CybozuUserAPIError(data as ErrorResponse);
  }
}
