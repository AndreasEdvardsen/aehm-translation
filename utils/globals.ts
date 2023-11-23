import { RecordModel } from "pocketbase";
import { RecordModel } from "pocketbase/dist/models/RecordModel";
import { RecordAuthResponse } from "pocketbase/dist/models/RecordAuthResponse";

type User = {
  id: string;
  email: string;
  username: string;
  name: string;
};

enum Corner {
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
}

type texts = {
  english: string;
  norwegian: string;
};

type assignee = {
  name: string;
};

type Entry = {
  id: string;
  key: string;
  texts: texts;
  assignees: assignee[];
};

export { Corner };
export type { Entry, texts, assignee, User };
