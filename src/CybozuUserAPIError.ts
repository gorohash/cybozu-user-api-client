export type ErrorResponse = {
  message: string;
  id: string;
  code: string;
  errors?: unknown;
};

export class CybozuUserAPIError extends Error {
  id: string;
  code: string;
  errors?: unknown;

  constructor(data: ErrorResponse) {
    super(data.message);
    this.name = "CybozuUserAPIError";
    this.id = data.id;
    this.code = data.code;
    this.errors = data.errors;
  }
}
