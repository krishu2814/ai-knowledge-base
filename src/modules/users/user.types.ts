export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUser {
  // will not allow to update email
  name?: string;
  password?: string;
}
