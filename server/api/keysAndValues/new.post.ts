import PocketBase from "pocketbase";
import { UsersResponse } from "~/pocketbase-types";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.texts || !body.key) {
    setResponseStatus(event, 400);
    return { error: "texts and key are required" };
  }
  const data = {
    key: body.key,
    texts: body.texts,
    assignees:
      body.assignees.map((user: UsersResponse) => {
        return user.id;
      }) || [],
  };
  return pb
    .collection("keys_and_values")
    .create(data)
    .then((result) => {
      setResponseStatus(event, 201);
      return result;
    })
    .catch((error) => {
      setResponseStatus(event, 400);
      return { error: error };
    });
});
