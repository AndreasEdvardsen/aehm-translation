<template>
  <TextField :label="'Key'" :required="true" v-model="entry.key" />
  <h2>Languages:</h2>
  <TextField
    v-for="(value, language) in entry.texts"
    :label="language"
    v-model="entry.texts[language]"
    :required="language === 'english'"
  />
  <div class="header-and-button-group">
    <h2>Assignees:</h2>
    <CustomButton :label="'Add Assignee +'" @click="addAssignee" />
  </div>
  <div
    v-for="(assignee, index) in entry.assignees"
    class="textfield-with-button"
  >
    <UserSearchField
      v-model="entry.assignees[index]"
      :label="'Assignee'"
      :users="users"
    ></UserSearchField>
    <CustomButton :label="'-'" @click="removeAssignee(index)" />
  </div>
  <div class="button-group">
    <slot name="button-group" />
  </div>
</template>

<script setup lang="ts">
import type { Entry } from "~/utils/globals";

const { data: users } = await useFetch("/api/users");

const props = defineProps({
  entry: {
    type: Object as () => Entry,
    required: true,
  },
});

function addAssignee() {
  if (props.entry && !props.entry.assignees) {
    props.entry.assignees = [];
  }
  props.entry.assignees.push({ name: "" });
}

function removeAssignee(index: number) {
  if (!props.entry) return;
  props.entry.assignees.splice(index, 1);
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.header-and-button-group {
  display: flex;
  justify-content: space-between;
}

.textfield-with-button {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  .button-group-right {
    display: flex;
    gap: 1rem;
  }
}
</style>
