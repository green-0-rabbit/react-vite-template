import { FieldValues, UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { userServices } from "../services";
import { NotificationService } from "src/core/services/notification.service";
import { AuthService } from "src/auth/auth.service";

export interface IUserStoreServices<T extends FieldValues> {
  user: typeof userServices;
  auth: AuthService;
  logger: NotificationService;
  navigate: NavigateFunction;
  methods: Omit<UseFormReturn<T, any>, "handleSubmit">;
}
