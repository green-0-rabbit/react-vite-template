/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */

import to from "await-to-js";
import { Inject, Service } from "react-service-locator";
import { API_URL } from "src/common/config";
import { hmAuthSDK } from "src/core/sdk";
import { NotificationService } from "src/core/services/notification.service";
import { isResolved, response } from "../common/utils";
import { IForgotPassword, ISignInInput, IUserAttributes } from "./types";

@Service()
export class AuthService {
  @Inject(NotificationService)
  private readonly _loggerService!: NotificationService;

  private _authSDK = hmAuthSDK({ url: API_URL });

  /**
   * it represent an user email
   */
  private _tempUsername = "";

  isTokenRefreshing = false;

  get tempUsername() {
    return this._tempUsername;
  }

  set tempUsername(name: string) {
    this._tempUsername = name;
  }

  get uid() {
    return window.localStorage.getItem("uid");
  }

  signIn = async (signInParams: ISignInInput) => {
    const { username, password } = signInParams;
    let challengeName = "";
    let session = "";

    const [err, res] = await to(
      this._authSDK.signIn({
        username,
        password
      })
    );

    if (err) {
      throw err;
    }

    if (res && res.challengeName && res.session) {
      challengeName = res.challengeName;
      session = res.session;
    }
    const isLogged = !session;
    if (challengeName) {
      switch (challengeName) {
        case "NEW_PASSWORD_REQUIRED":
          this.tempUsername = username;
          return "/auth/new-password";

        default:
          // this._loggerService.show({}, "error");
          return "";
      }
    }
    if (isLogged) {
      return "/";
    }
  };

  signOut = async () => {
    try {
      await this._authSDK.signOut(); // return undefined
      return "/auth";
    } catch (error) {
      // this._loggerService.notify(<any>error, "error");
      return "/auth";
    }
  };

  getUserInfo = async () => {
    const roles: string[] = this._authSDK.groups;
    const { email, sub } = this._authSDK;
    const data = { attributes: { email, sub } as IUserAttributes, roles };
    return response(data);
  };

  get accessToken() {
    const accessToken = this._authSDK.accessToken;
    return accessToken;
  }

  refreshToken = async () => {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      const res = await this._authSDK.refreshToken();
      this.isTokenRefreshing = false;
      if (!isResolved(res)) {
        const { error } = res;
        // this._loggerService.notify(<any>error, "error");
      }
    }
  };

  set accessToken(value: string) {
    this._authSDK.accessToken = value;
  }

  newPasswordRequired = async (newPassword: string) => {
    try {
      await this._authSDK.newPasswordRequired({
        username: this.tempUsername,
        newPassword
      });
      return "/auth";
    } catch (error) {
      // this._loggerService.notify(<any>error, "error");
      return "";
    }
  };

  forgotPassword = async (username: string) => {
    try {
      const res = await this._authSDK.forgotPassword(username);
      if (!res || !res.destination) {
        return "";
      }
      this.tempUsername = username;
      return "/verification-code";
    } catch (error) {
      // this._loggerService.notify(<any>error, "error");
      return "";
    }
  };

  forgotPasswordSubmit = async (forgotParams: IForgotPassword) => {
    const { confirmationCode, newPassword } = forgotParams;
    try {
      await this._authSDK.confirmForgotPassword({
        username: this.tempUsername,
        confirmationCode: String(confirmationCode),
        newPassword
      });

      return "/auth";
    } catch (error) {
      // this._loggerService.notify(<any>error, "error");
      return "";
    }
  };
}
