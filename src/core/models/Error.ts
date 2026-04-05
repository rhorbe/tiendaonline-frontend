export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      error?: string;
      [key: string]: unknown;
    };
    status?: number;
  };
}
