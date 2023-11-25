import PocketBase from "pocketbase";
import { UsersResponse } from "~/pocketbase-types";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
export default defineEventHandler(async (event) => {
  return await pb.collection<UsersResponse>("users").getFullList();
});
