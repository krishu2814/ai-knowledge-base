export interface JwtPayload {
  userId: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
