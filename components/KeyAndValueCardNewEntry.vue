<template>
  <div>
    <h1 class="header">New Entry</h1>
    <Card v-if="entry">
      <EntryCardContent :entry="entry">
        <template v-slot:button-group>
          <CustomButton
            :label="'Cancel'"
            @click="navigateTo(`/keys-and-values`)"
          />
          <CustomButton
            filled
            :label="'Save'"
            @click="save"
            :disabled="entry.key.length == 0 || entry.texts.english.length == 0"
          />
        </template>
      </EntryCardContent>
    </Card>
  </div>
</template>
<script setup lang="ts">
import type { Entry } from "~/utils/globals";

const route = useRoute();
const entry = ref<Entry>({
  id: "",
  key: "",
  texts: {
    english: "",
    norwegian: "",
  },
  assignees: [],
});

async function save() {
  if (!entry.value.key || !entry.value.texts.english) return;
  $fetch<Entry>(`/api/keysAndValues/new`, {
    method: "post",
    body: entry.value,
  }).then((res) => {
    useState<Entry[]>("keysAndValues").value.push(res);
    navigateTo(`/keys-and-values/${res.id}`);
  });
}
</script>
<style scoped lang="scss">
@import "../assets/variables.scss";

.header {
  margin-bottom: 1rem;
}

.header-and-button-group {
  display: flex;
  justify-content: space-between;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
