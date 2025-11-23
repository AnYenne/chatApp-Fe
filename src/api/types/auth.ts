export interface LoginRequest {
  user: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
