export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export type ValidateUserParams = {
  email: string;
  password: string;
};
