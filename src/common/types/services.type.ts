import { AuthService } from "src/auth/auth.service";
import { NotificationService } from "src/core/services/notification.service";

export interface IBaseService {
  auth: AuthService;
  logger: NotificationService;
}
