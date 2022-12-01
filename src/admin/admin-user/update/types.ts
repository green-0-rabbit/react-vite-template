/* eslint-disable import/no-cycle */
import { adminAPIService } from "../services";
// eslint-disable-next-line import/no-named-as-default
import AdminUpdateUserStore from "./admin-update-user.store";

export interface IAdminUpdateUserServices {
  admin: typeof adminAPIService;
  userStore: AdminUpdateUserStore;
}
