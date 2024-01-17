import queryString from "query-string";

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
    const result = await response.json();

    if (response.ok) {
      return result as T;
    }

    // TODO: Implement error object
    throw new Error();
  }
}
