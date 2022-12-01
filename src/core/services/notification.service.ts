import { ApolloError } from "@apollo/client/errors";
import { DefaultMantineColor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Service } from "react-service-locator";
import { HMAuthSDKError } from "../sdk/hm-auth-sdk";
import { wait } from "../../common/utils";


type VariantType = "default" | "error" | "success" | "warning" | "info";

@Service()
export class NotificationService {

  show = async (
    error: Record<string, any>,
    type: VariantType | undefined
  ) => {
    const errors = this._errorInterceptor(error);

    const color = this._getColorByType(type);
    errors.forEach(async ({ message, title }) => {
      showNotification({ title, message, color });
      await wait(300);
    });
  };

  private _errorInterceptor = (
    error: Record<string, any> | Record<string, any>[]
  ) => {
    console.log(error);

    if (
      error instanceof ApolloError &&
      error.networkError instanceof HMAuthSDKError
    ) {
      return [
        {
          title: error.networkError.name,
          message: error.networkError.message
        }
      ];
    } else if (error instanceof HMAuthSDKError) {
      return [{ title: error.name, message: error.message }];
    } else {
      return [
        { title: "Error", message: "something went wrong, please try again" }
      ];
    }
  };

  private _getColorByType = (
    type: VariantType = "default"
  ): DefaultMantineColor => {
    switch (type) {
      case "error":
        return "red";

      case "warning":
        return "yellow";

      case "info":
        return "blue";

      case "success":
        return "green";

      default:
        return "blue";
    }
  };
}
