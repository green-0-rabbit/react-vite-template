import { Service, Inject } from "react-service-locator";
import { v4 as uuidv4 } from "uuid";
import { ApolloClientFactory } from "src/core/client";
import { getSdkApollo } from "../sdk";
import { UiStore } from "../stores";
import { NotificationService } from "./notification.service";

@Service()
export class TestService {
  @Inject(UiStore)
  private readonly _uiStore!: UiStore;

  @Inject(NotificationService)
  private readonly _notificationService!: NotificationService;

  private _client;

  constructor(
    // required in order to access this instance in constructor
    @Inject(ApolloClientFactory)
    private readonly _apolloFactory: ApolloClientFactory
  ) {
    const { client } = this._apolloFactory;
    this._client = getSdkApollo(client);
  }

  // Dependency injection is handled by Inversify internally
  instanceId = uuidv4();

  login = async () => {
    // this._notificationService.notify({}, "info");
    // console.log("loggerId", this._notificationService.instanceId);

    console.log("you are logged");
  };

  companies = async () => {
    try {
      const { loading } = this._uiStore;
      const { companies } = await loading(this._client.companies());
      console.log(companies);
    } catch (err) {
      const error = err as any;
      this._notificationService.show(error, "error");
    }
  };
}
