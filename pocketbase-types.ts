/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Icons = "icons",
  KeysAndValues = "keys_and_values",
  Projects = "projects",
  RuntimeVariables = "runtime_variables",
  TestWidgetPositions = "test_widget_positions",
  TestWidgets = "test_widgets",
  Tools = "tools",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type IconsRecord = {
  image?: string;
  name?: string;
  path?: string;
  prefix?: string;
};

export type KeysAndValuesRecord<Ttexts = unknown> = {
  assignees?: RecordIdString[];
  key?: string;
  texts?: null | Ttexts;
};

export type ProjectsRecord = {
  description?: string;
  image?: string;
  name?: string;
  page?: string;
  url?: string;
};

export type RuntimeVariablesRecord = {
  key?: string;
  value?: string;
};

export type TestWidgetPositionsRecord = {
  position?: number;
  widget?: RecordIdString;
};

export type TestWidgetsRecord = {
  data?: number;
  label?: string;
  type?: string;
};

export type ToolsRecord = {
  description?: string;
  image?: string;
  name?: string;
  url?: string;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type IconsResponse<Texpand = unknown> = Required<IconsRecord> &
  BaseSystemFields<Texpand>;
export type KeysAndValuesResponse<
  Ttexts = unknown,
  Texpand = unknown,
> = Required<KeysAndValuesRecord<Ttexts>> & BaseSystemFields<Texpand>;
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> &
  BaseSystemFields<Texpand>;
export type RuntimeVariablesResponse<Texpand = unknown> =
  Required<RuntimeVariablesRecord> & BaseSystemFields<Texpand>;
export type TestWidgetPositionsResponse<Texpand = unknown> =
  Required<TestWidgetPositionsRecord> & BaseSystemFields<Texpand>;
export type TestWidgetsResponse<Texpand = unknown> =
  Required<TestWidgetsRecord> & BaseSystemFields<Texpand>;
export type ToolsResponse<Texpand = unknown> = Required<ToolsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  icons: IconsRecord;
  keys_and_values: KeysAndValuesRecord;
  projects: ProjectsRecord;
  runtime_variables: RuntimeVariablesRecord;
  test_widget_positions: TestWidgetPositionsRecord;
  test_widgets: TestWidgetsRecord;
  tools: ToolsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  icons: IconsResponse;
  keys_and_values: KeysAndValuesResponse;
  projects: ProjectsResponse;
  runtime_variables: RuntimeVariablesResponse;
  test_widget_positions: TestWidgetPositionsResponse;
  test_widgets: TestWidgetsResponse;
  tools: ToolsResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "icons"): RecordService<IconsResponse>;
  collection(idOrName: "keys_and_values"): RecordService<KeysAndValuesResponse>;
  collection(idOrName: "projects"): RecordService<ProjectsResponse>;
  collection(
    idOrName: "runtime_variables",
  ): RecordService<RuntimeVariablesResponse>;
  collection(
    idOrName: "test_widget_positions",
  ): RecordService<TestWidgetPositionsResponse>;
  collection(idOrName: "test_widgets"): RecordService<TestWidgetsResponse>;
  collection(idOrName: "tools"): RecordService<ToolsResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
