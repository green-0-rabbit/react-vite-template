import { FieldValues, UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { NotificationService } from "src/core/services/notification.service";
// import { LoggerContextType } from "src/common/contexts";
import { adminAPIService } from "../services";

export interface IStoreServices<T extends FieldValues> {
  admin: typeof adminAPIService;
  logger: NotificationService;
  navigate: NavigateFunction;
  methods: Omit<UseFormReturn<T, any>, "handleSubmit">;
}
