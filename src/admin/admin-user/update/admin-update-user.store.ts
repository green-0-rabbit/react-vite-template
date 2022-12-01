import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FormState } from "react-hook-form";
import { customMerging, isResolved, flattenObj, wait } from "src/common/utils";
import { IStoreServices } from "../types";
import {
  AdminUpdateUserPayloadType,
  adminUpdateUserPayload as defaultData
} from "./models";

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */

type User = AdminUpdateUserPayloadType;

type UpdataUserStoreServices = IStoreServices<User>;
export class AdminUpdateUserStore {
  userId = "";

  isLoading = false;

  private _service?: UpdataUserStoreServices = undefined;

  private _data?: User = undefined;

  private _dirtyFields: FormState<User>["dirtyFields"] = {};

  constructor() {
    makeAutoObservable(this);
  }

  servicesRegister = (service: UpdataUserStoreServices) => {
    this._service = service;
  };

  set dirtyFields(params: typeof this._dirtyFields) {
    this._dirtyFields = params;
  }

  get isDirty() {
    return Object.keys(this._dirtyFields).length > 0;
  }

  get dataJSON() {
    return toJS(this._data);
  }

  private get _services() {
    if (!this._service) {
      throw new Error("servicesFactory was not call");
    }
    return this._service;
  }

  onSubmit = async (submittedData: User) => {
    const { admin, logger } = this._services;
    runInAction(() => {
      this.isLoading = true;
    });
    const { actions, ...restData } = submittedData;
    const updateData = {
      ...restData,
      username: restData.authData.username,
      actions
      // id: userId!
    };
    actions.tempPassword = "";
    const res = await admin.updateUserService(updateData);
    if (!isResolved(res)) {
      const { error } = res;
      runInAction(() => {
        this.isLoading = false;
      });
      logger.notify(error, "error");
      return;
    }
    const {
      data: { owner, ...resData }
    } = res;
    // logger.notify("The account was successfully updated", "success");
    logger.notify({}, "success");

    const mergedData = customMerging(
      resData as Record<string, never>,
      defaultData
    );

    runInAction(() => {
      this._data = mergedData;
      this.isLoading = false;
    });
  };

  loadData = async (userId: string) => {
    const {
      admin,
      logger,
      methods: { reset }
    } = this._services;
    const res = await admin.getUserService(userId);
    if (!isResolved(res)) {
      const { error } = res;
      logger.notify(error, "error");
      return;
    }
    const {
      data: { owner, ...resData }
    } = res;
    const mergedData = customMerging(
      resData as Record<string, never>,
      defaultData
    );
    if (mergedData) {
      reset(mergedData);
      runInAction(() => {
        this._data = mergedData;
        this.userId = userId;
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  deleteUser = async (onCloseModal: () => void) => {
    runInAction(() => {
      this.isLoading = true;
    });
    const { admin, logger, methods, navigate } = this._services;
    const username = methods.getValues("authData.username");
    const res = await admin.deleteUserService({ id: this.userId, username });
    if (!isResolved(res)) {
      const { error } = res;
      logger.notify(error, "error");
      runInAction(() => {
        this.isLoading = false;
      });
      return;
    }
    // logger.notify("The user was successfully deleted", "success");
    logger.notify({}, "success");

    runInAction(() => {
      this.isLoading = false;
    });
    onCloseModal();
    navigate("../");
  };
}
export default AdminUpdateUserStore;
