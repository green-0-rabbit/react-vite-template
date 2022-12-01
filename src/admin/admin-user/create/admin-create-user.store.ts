import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FormState } from "react-hook-form";
import { customMerging, isResolved, flattenObj, wait } from "src/common/utils";
import { IStoreServices } from "../types";
import {
  AdminCreateUserPayloadType,
  adminCreateUserPayload as defaultData
} from "./payloads";

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */

type User = AdminCreateUserPayloadType;

type UpdataUserStoreServices = IStoreServices<User>;
class AdminCreateUserStore {
  public id = "f";

  private _service?: UpdataUserStoreServices = undefined;

  private _data?: User = defaultData;

  isLoading = false;

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
    const { admin, logger, navigate } = this._services;
    runInAction(() => {
      this.isLoading = true;
    });
    const res = await admin.createUserService(submittedData);
    if (!isResolved(res)) {
      const { error } = res;
      logger.notify(error, "error");
      return;
    }
    logger.notify({}, "success");
    const { data } = res;
    const { id } = data;
    runInAction(() => {
      this._data = submittedData;
      this.isLoading = false;
    });
    navigate(`../${id}`);
  };

  loadData = async () => {
    const {
      methods: { reset }
    } = this._services;
    if (this._data) {
      reset(this._data);
    }
  };
}

export default AdminCreateUserStore;
