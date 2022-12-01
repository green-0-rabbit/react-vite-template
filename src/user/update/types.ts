/* eslint-disable import/no-cycle */
import { userServices } from "../services";
// eslint-disable-next-line import/no-named-as-default
import UpdateUserStore from "./updateUserStore";

export interface IUpdateUserServices {
  user: typeof userServices;
  userStore: UpdateUserStore;
}
