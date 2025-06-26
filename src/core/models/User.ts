export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  remember_token: string | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}
