import { HttpClient } from "../HttpClient.js";
import { User } from "../types/index.js";

export class UserClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getUsers(
    params: {
      ids?: string[];
      codes?: string[];
      offset?: number;
      size?: number;
    } = {},
  ): Promise<{ users: User[] }> {
    return this.client.get("/v1/users.json", params);
  }
}
