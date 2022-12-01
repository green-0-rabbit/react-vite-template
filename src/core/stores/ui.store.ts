/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
import to from "await-to-js";
import { makeAutoObservable } from "mobx";
// import { makeAutoObservable, observable } from "mobx";
import { Service } from "react-service-locator";

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */
@Service()
export class UiStore {
  language = "en_US";

  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
  get isLoading() {
    return this._isLoading;
  }

  // set isLoading(value: boolean) {
  //   this._isLoading = value;
  // }

  private _updateLoading = (value:boolean)=> this._isLoading = value;

  loading = async <T, U = Error>(afn: Promise<T>) => {
    this._updateLoading(true)
    const [err, data] = await to(afn);
    this._updateLoading(false)

    if (err) {
      throw err;
    }

    return data;
  };
}
