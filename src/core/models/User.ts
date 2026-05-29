export interface User {
  id: string;
  name: string;
  last_name?: string | null;
  email: string;
  email_verified_at: string | null;
  cliente_id?: string;
  dni?: string | null;
  active?: boolean;
  remember_token?: string | null;
}

export interface LoginUserResponse {
  id?: string;
  _id?: string;
  name: string;
  last_name?: string | null;
  email: string;
  active: boolean;
  cliente_id?: string;
  dni?: string | null;
  email_verified_at?: string | null;
}

export interface LoginResponse {
  token: string;
  user: LoginUserResponse;
}
