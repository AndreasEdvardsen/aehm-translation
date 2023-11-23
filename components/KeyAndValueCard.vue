<template xmlns:template="http://www.w3.org/1999/html">
  <div>
    <h1 class="header">Edit Entry</h1>
    <Card v-if="entry">
      <EntryCardContent :entry="entry">
        <template v-slot:button-group>
          <CustomButton :label="'Delete'" @click="remove" />
          <div class="button-group-right">
            <CustomButton
              :label="'Cancel'"
              @click="navigateTo(`/keys-and-values`)"
            />
            <CustomButton
              filled
              :label="'Save ✓'"
              @click="save"
              :disabled="!entry.key || entry.texts.english.length == 0"
            />
          </div>
        </template>
      </EntryCardContent>
    </Card>
  </div>
  <Snackbar :position="Corner.BottomRight" ref="snackbar">
    <span>Changes saved ✓</span>
  </Snackbar>
</template>
<script setup lang="ts">
import { Corner } from "~/utils/globals";
import type { Entry } from "~/utils/globals";
import Snackbar from "~/components/Snackbar.vue";
import type { Ref } from "vue";

const route = useRoute();
const snackbar = ref<typeof Snackbar>();
const {
  data: entry,
  error,
  pending,
} = await useFetch<Entry>(`/api/keysAndValues/${route.params.id}`, {
  method: "get",
});

async function remove() {
  $fetch(`/api/keysAndValues/${route.params.id}`, {
    method: "delete",
    server: false,
  }).then((res) => {
    const ref = useState<Entry[]>("keysAndValues").value.find(
      (k) => k.id === route.params.id,
    );
    if (!ref) return;
    useState<Entry[]>("keysAndValues").value.splice(
      useState<Entry[]>("keysAndValues").value.indexOf(ref),
      1,
    );
    navigateTo(`/keys-and-values`);
  });
}

async function save() {
  if (!entry.value?.key || !entry.value.texts.english) return;
  $fetch<Entry>(`/api/keysAndValues/${route.params.id}`, {
    method: "put",
    body: entry.value,
  })
    .then((res) => {
      const keyAndValues = useState<Entry[]>("keysAndValues").value.find(
        (k) => k.id === route.params.id,
      );
      if (!keyAndValues) return;
      keyAndValues.key = res.key;
      keyAndValues.texts = res.texts;
      keyAndValues.assignees = res.assignees;
      navigateTo(`/keys-and-values/${route.params.id}`);
      if (snackbar.value) snackbar.value.show();
    })
    .catch((err) => {
      console.log(err);
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

.textfield-with-button {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: $spacing / 2;
}

.button-group-right {
  display: flex;
  gap: 1rem;
}
</style>
