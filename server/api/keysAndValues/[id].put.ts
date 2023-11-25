import PocketBase from "pocketbase";
import { UsersResponse } from "~/pocketbase-types";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.id || !body.key || !body.texts) {
    setResponseStatus(event, 400);
    return { error: "id, texts and key are required" };
  }
  const data = {
    key: body.key,
    texts: body.texts,
    assignees:
      body.assignees.map((user: UsersResponse) => {
        return user.id;
      }) || [],
  };
  console.log(data);
  return pb
    .collection("keys_and_values")
    .update(body.id, data)
    .then((result) => {
      setResponseStatus(event, 200);
      return result;
    })
    .catch((error) => {
      setResponseStatus(event, 400);
      return { error: error };
    });
});
