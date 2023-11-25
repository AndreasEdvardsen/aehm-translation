<template>
  <Card v-if="!user">
    <h1>Making Translations Easy!</h1>
    <p>
      This is a tool to help you manage translations for your app. You can
      create keys and values, assign them to users, and track their progress.
    </p>
  </Card>
  <Card v-if="!user">
    <h1>Features</h1>
    <ul class="feature-list">
      <li>Easy to use</li>
      <li>Easy to manage</li>
      <li>Easy to track</li>
    </ul>
  </Card>
  <div v-if="user">
    <h1>Entries Assigned To You</h1>
    <EntryTable :entries="entries" />
  </div>
</template>

<script setup lang="ts">
import type { AuthModel } from "pocketbase";
import type { Entry } from "~/utils/globals";
import type { Ref } from "vue";

let entries: Ref<Entry[]> = ref([]);
const user = useState<AuthModel>("user");
if (user.value) {
  entries.value = await getEntriesAssignedToUser(user.value.id);
}

watch(
  () => user.value,
  async (newValue) => {
    if (newValue) {
      entries.value = await getEntriesAssignedToUser(newValue.id);
    }
  },
);

async function getEntriesAssignedToUser(id: string) {
  return await useFetch<Entry[]>("/api/keysAndValues?userid=" + id, {
    server: false,
    lazy: true,
    method: "GET",
  }).then((res) => res.data.value as Entry[]);
}
</script>

<style scoped lang="scss">
.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.assigned-entries {
  display: flex;
  gap: 1rem;

  .searchbar {
    width: 100%;
  }
}
</style>
