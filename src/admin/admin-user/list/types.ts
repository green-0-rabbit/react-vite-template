/* eslint-disable import/no-cycle */
import { adminAPIService } from "../services";
import AdminListUserStore from "./admin-list-user.store";

export interface IAdminListUserServices {
  admin: typeof adminAPIService;
  listUserStore: AdminListUserStore;
}
