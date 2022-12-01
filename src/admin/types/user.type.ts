export interface IUserTypeCamelCase {
  enabled: boolean;
  email: string;
  emailVerified: boolean;
  userCreateDate: Date;
  userLastModifiedDate: Date;
  userStatus: string;
  username: string;
}

export type AdminDeleteUser = {
  userId: string | undefined;
  username: string;
};
