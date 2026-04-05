export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  active?: boolean;
  remember_token?: string | null;
}

export interface LoginUserResponse {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  email_verified_at: string | null;
}

export interface LoginResponse {
  token: string;
  user: LoginUserResponse;
}
