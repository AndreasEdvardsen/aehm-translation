import PocketBase, { ListResult, RecordModel } from "pocketbase";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
export default defineEventHandler(async (event) => {
  const userid = getQuery(event).userid;
  let resultList: RecordModel[] | null = null;
  if (userid) {
    resultList = await pb.collection("keys_and_values").getFullList(50, {
      filter: `assignees ~ "${userid}"`,
    });
  } else {
    resultList = await pb.collection("keys_and_values").getFullList();
  }
  return resultList;
});
