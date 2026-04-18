export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  cliente_id?: string;
  active?: boolean;
  remember_token?: string | null;
}

export interface LoginUserResponse {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  active: boolean;
  cliente_id?: string;
  email_verified_at?: string | null;
}

export interface LoginResponse {
  token: string;
  user: LoginUserResponse;
}
