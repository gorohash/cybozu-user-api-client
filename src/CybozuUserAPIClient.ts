import { HttpClient } from "./HttpClient.js";
import { UserClient } from "./client/UserClient.js";

type Options = {
  baseUrl: string;
  auth: {
    username: string;
    password: string;
  };
};

export class CybozuUserAPIClient {
  user: UserClient;

  constructor({ baseUrl, auth: { username, password } }: Options) {
    const httpClient = new HttpClient(baseUrl, username, password);

    this.user = new UserClient(httpClient);
  }
}
