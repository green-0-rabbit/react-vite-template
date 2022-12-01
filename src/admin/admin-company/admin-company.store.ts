/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import to from "await-to-js";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS
} from "mobx";
import { UseFormReturn } from "react-hook-form";
import { Inject, Service } from "react-service-locator";
import { DataGrid } from "src/core/bases/data-grid.base";
import { ApolloClientFactory } from "src/core/client";
import { getSdkApollo } from "src/core/sdk";
import {
  CompaniesQuery,
  Company,
  CreateCompanyInput,
  UpdateCompanyInput
} from "src/core/sdk/gql-sdk/api-sdk";
import { NotificationService } from "src/core/services/notification.service";
import { RouterService } from "src/core/services/router.service";
import { UiStore } from "src/core/stores";

import omitDeep from "omit-deep";
import { inputFilter } from "../../common/utils/input-filter";
import { updateCompanyInput } from "./models";

type IRow = Pick<CompaniesQuery, "companies">["companies"][0];
interface IQueryParams {
  filter: object;
  limit: number;
  nextToken?: string;
}

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */

@Service()
export class AdminCompanyStore extends DataGrid<IRow> {
  @Inject(UiStore)
  private readonly _uiStore!: UiStore;

  @Inject(NotificationService)
  private readonly _notificationService!: NotificationService;

  private _client;

  @observable
  _companies: IRow[] = [];

  @computed
  get companies() {
    return toJS(this._companies);
  }

  constructor(
    // required in order to access this instance in constructor
    @Inject(ApolloClientFactory)
    private readonly _apolloFactory: ApolloClientFactory,
    @Inject(RouterService)
    routerService: RouterService,
    private _path = "admin/companies"
  ) {
    super(routerService, _path);
    const { client } = this._apolloFactory;
    this._client = getSdkApollo(client);
    makeObservable(this);
  }

  @action
  refreshData = async () => {
    await this.loadData();
  };

  @action
  loadData = async () => {
    const { loading } = this._uiStore;
    const [err, res] = await to(loading(this._client.companies()));

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }
    const { companies } = res;

    runInAction(() => {
      this._companies = companies;
    });
  };

  @action
  createCompany = async (input: CreateCompanyInput) => {
    const { loading } = this._uiStore;
    const [err, res] = await to(loading(this._client.createCompany({ input })));

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }

    this.routerService.navigate(this._path);
    // runInAction(() => {
    //   this._companies = companies;
    // });
  };

  @action
  updateCompany = async (input: UpdateCompanyInput) => {
    const { loading } = this._uiStore;
    const updateData = inputFilter({
      input,
      constructor: updateCompanyInput
    });

    const [err, res] = await to(
      loading(this._client.updateCompany({ input: updateData }))
    );

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }
    const { updateCompany } = res;

    this.routerService.navigate(this._path);

    // runInAction(() => {
    //   this._companies = companies;
    // });
  };

  @action
  deleteCompany = async (id: string) => {
    const { loading } = this._uiStore;
    const [err, res] = await to(loading(this._client.removeCompany({ id })));

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }

    this.routerService.navigate(this._path);
  };

  @action
  getById = async (
    id: string,
    methods: Omit<UseFormReturn<Company, any>, "handleSubmit">
  ) => {
    const { loading } = this._uiStore;
    const [err, res] = await to(loading(this._client.company({ id })));

    if (err) {
      this._notificationService.show(err, "error");
      throw err;
    }
    const { company } = res;

    methods.reset(company);
    return company;
  };

  // ########### grid methods #############
}
