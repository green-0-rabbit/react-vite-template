export interface IAuthRes<T> {
  data: T | Record<string, never>;
  error:
    | {
        type: string;
        message: string;
      }
    | Record<string, never>;
}
export interface IUserAttributes {
  email: string;
  sub: string;
}
export interface ISignInInput {
  username: string;
  password: string;
}

export interface IPasswordForget {
  userName: string;
}

export interface IVerificationCodeInput {
  confirmationCode: string;
  newPassword: string;
}
export interface INewPasswordInput {
  password: string;
}
export interface INewPasswordOutput {
  isComplete: boolean;
}

export interface ISignInOutput {
  isLogged: boolean;
  challengeName?: "NEW_PASSWORD_REQUIRED" | "SMS_MFA";
  sub: string;
}

export interface ISignOutOutput {
  isLoggedOut: boolean;
}

export interface IForgotPasswordSubmitOutput {
  isOk: boolean;
}

export interface ICodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
}

export interface IForgotPassword {
  confirmationCode: string;
  newPassword: string;
}

export interface ISignUpParams {
  userName: string;
  password: string;
}

export interface IConfirmSignUp {
  userName: string;
  code: string;
}

export interface IError {
  type: string;
  message: string;
}
