/* eslint-disable import/no-named-default */
/* eslint-disable import/no-cycle */
import { adminAPIService } from "../services";
import AdminCreateUserStore from "./admin-create-user.store";

export interface IAdminCreateUserServices {
  admin: typeof adminAPIService;
  userStore: AdminCreateUserStore;
}
