export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      [key: string]: unknown; 
    };
    status?: number;
  };
}
