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
export type { Entry, texts, assignee };
