import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FormState } from "react-hook-form";
import { customMerging, isResolved, flattenObj, wait } from "src/common/utils";
import { IUserStoreServices } from "../types";
import {
  UpdateUserPayloadType,
  updateUserPayload as defaultData
} from "./models";

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */

type User = UpdateUserPayloadType;

type UpdataUserStoreServices = IUserStoreServices<User>;
export class UpdateUserStore {
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
    const { user, logger } = this._services;
    runInAction(() => {
      this.isLoading = true;
    });

    const updateData = {
      ...submittedData
    };
    const res = await user.updateUserService(updateData);
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

  loadData = async () => {
    const {
      auth,
      user,
      logger,
      methods: { reset }
    } = this._services;
    const resAuth = await auth.getUserInfo();
    console.log(resAuth);
    if (!isResolved(resAuth)) {
      const { error } = resAuth;
      logger.notify(error, "error");
      return;
    }
    const {
      data: {
        attributes: { sub }
      }
    } = resAuth;

    const userId = sub;
    const res = await user.getUserService(userId);
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
}
export default UpdateUserStore;
