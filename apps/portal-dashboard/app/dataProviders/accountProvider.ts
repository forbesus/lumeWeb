// @ts-nocheck

import type {
  CustomParams,
  CustomResponse,
  DataProvider,
  HttpError,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";
import { Sdk } from "@lumeweb/portal-sdk";

type AccountParams = {
  email?: string;
  password?: string;
};

type AccountData = AccountParams;

export enum SubscriptionPlanPeriod {
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export enum SubscriptionPlanStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[];
}

export interface SubscriptionResponse {
  plan: SubscriptionPlan;
  billing_info: SubscriptionBillingInfo;
  payment_info: {
    payment_id: string;
    payment_expires: string;
    client_secret: string;
    publishable_key: string;
  };
}

export interface SubscriptionPlan {
  name: string;
  identifier: string;
  status: SubscriptionPlanStatus;
  price: number;
  period: SubscriptionPlanPeriod;
  storage: number;
  upload: number;
  download: number;
}

export interface SubscriptionBillingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const createAccountProvider = (
  sdk: Sdk,
  restProvider: DataProvider,
): DataProvider => {
  return {
    getList: () => {
      console.log("Not implemented");
      return Promise.resolve({
        data: [],
        total: 0,
      });
    },
    getOne: () => {
      console.log("Not implemented");
      return Promise.resolve({
        data: {},
      });
    },
    update: async <TVariables extends AccountParams = AccountParams>(
      params: UpdateParams<TVariables>,
    ): Promise<UpdateResponse<AccountData>> => {
      if (params.variables.email && params.variables.password) {
        const ret = await sdk
          ?.account()
          .updateEmail(params.variables.email, params.variables.password);

        if (ret instanceof Error) {
          return Promise.reject(ret as HttpError);
        }

        return {
          data: {
            email: params.variables.email,
          },
        };
      }

      return {
        data: {} as AccountData,
      };
    },
    create: () => {
      console.log("Not implemented");
      return Promise.resolve({
        data: {},
      });
    },
    deleteOne: () => {
      console.log("Not implemented");
      return Promise.resolve({
        data: {},
      });
    },
    getApiUrl: () => sdk.account().apiUrl,

    custom: async <TData extends Record<string, any> = Record<string, any>>(
      params: CustomParams,
    ): Promise<CustomResponse<TData>> => {
      const { url, method, payload, headers } = params;

      if (url.includes("/subscription")) {
        // Handle subscription operations using restProvider
        return restProvider.custom({
          url,
          method,
          payload,
          headers: {
            Authorization: `Bearer ${sdk.account().jwtToken}`,
            ...headers,
          },
        });
      }

      // Handle other custom operations or throw an error for unsupported operations
      throw new Error("Unsupported custom operation");
    },
  };
};
