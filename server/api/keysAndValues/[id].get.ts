import PocketBase from "pocketbase";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
export default defineEventHandler(async (event) => {
  const result = await pb
    .collection("keys_and_values")
    .getFirstListItem(`id="${event.context.params?.id}"`, {
      expand: "assignees.username",
    });
  if (result && result.assignees.length > 0) {
    const users = [];
    for (const assignee of result.assignees) {
      const user = await pb
        .collection("users")
        .getFirstListItem(`id="${assignee}"`);
      users.push(user);
    }
    result.assignees = users;
  }
  return result;
});
