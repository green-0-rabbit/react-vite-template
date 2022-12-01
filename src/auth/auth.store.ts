/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */

import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import { Inject, Service } from "react-service-locator";
import { API_URL } from "src/common/config";
import { hmAuthSDK } from "src/core/sdk";
import { NotificationService } from "src/core/services/notification.service";
import { RouterService } from "src/core/services/router.service";
import { isResolved, response } from "../common/utils";
import { AuthService } from "./auth.service";
import {
  IForgotPassword,
  INewPasswordInput,
  IPasswordForget,
  ISignInInput,
  IUserAttributes,
  IVerificationCodeInput
} from "./types";

@Service()
export class AuthStore {
  @Inject(AuthService)
  private readonly _authService!: AuthService;

  @Inject(RouterService)
  private readonly _routerService!: RouterService;

  @Inject(NotificationService)
  private readonly _notificationService!: NotificationService;

  constructor() {
    makeAutoObservable(this);
  }

  get tempUsername() {
    return this._authService.tempUsername;
  }

  signIn = async (params: ISignInInput) => {
    const [err, path] = await to(this._authService.signIn(params));

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }

    if (path) {
      this._routerService.navigate(path);
    }
  };

  signOut = async () => {
    const [err, path] = await to(this._authService.signOut());

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }

    if (path) {
      this._routerService.navigate(path);
    }
  };

  newPasswordRequired = async (params: INewPasswordInput) => {
    const { password } = params;
    const [err, path] = await to(
      this._authService.newPasswordRequired(password)
    );
    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }
    if (path) {
      this._routerService.navigate(path);
    }
  };

  forgotPassword = async (params: IPasswordForget) => {
    const [err, path] = await to(
      this._authService.forgotPassword(params.userName)
    );

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }

    if (path) {
      this._routerService.navigate(`/auth${path}`, { state: params });
    }
  };

  forgotPasswordSubmit = async (params: IVerificationCodeInput) => {
    const [err, path] = await to(
      this._authService.forgotPasswordSubmit(params)
    );

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }
    if (path) {
      this._routerService.navigate(path);
    }
  };
}
