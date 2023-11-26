<template>
  <div v-if="user">
    <h1>{{ entries.length }} Entries Assigned To You</h1>
    <EntryTable :entries="entries" />
  </div>
  <div v-if="user">
    <h1>Profile</h1>
    <Card>
      <div class="profile">
        <div class="profile__avatar">
          <Avatar :user="user" />
        </div>
        <div class="profile__info">
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { AuthModel } from "pocketbase";
import type { Entry } from "~/utils/globals";
import type { Ref } from "vue";
import type { UsersResponse } from "~/pocketbase-types";

let entries: Ref<Entry[]> = ref([]);
const user = useState<UsersResponse>("user");
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

.profile {
  display: flex;
  gap: 1rem;

  &__avatar {
    width: 100px;
    height: 100px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
