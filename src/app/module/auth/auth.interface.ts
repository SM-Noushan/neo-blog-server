export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = TLoginUser & { name: string };
