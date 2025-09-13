/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_testStreamApiKey from "../functions/testStreamApiKey.js";
import type * as functions_testUpsertUser from "../functions/testUpsertUser.js";
import type * as functions_upsertStreamUser from "../functions/upsertStreamUser.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/testStreamApiKey": typeof functions_testStreamApiKey;
  "functions/testUpsertUser": typeof functions_testUpsertUser;
  "functions/upsertStreamUser": typeof functions_upsertStreamUser;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
