<template>
  <select class="results-menu" v-model="username">
    <option
      class="option"
      v-for="user in users"
      :key="user.username"
      :value="user.username"
    >
      {{ user.username }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { UsersResponse } from "~/pocketbase-types";
import type { PropType, Ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<UsersResponse> | null,
    required: false,
    default: null,
  },
  users: {
    type: Array as PropType<UsersResponse[]>,
    required: false,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue) as Ref<UsersResponse | null>;
const username = ref(props.modelValue?.username || "");

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  },
);

watch(username, (newValue) => {
  if (newValue === "") {
    localValue.value = null;
  } else {
    localValue.value =
      props.users.find((user) => user.username === newValue) || null;
  }
});

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.results-menu {
  width: 100%;
  height: 100%;
  border: none;
  background-color: $primary-color;
  color: $background-color;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: $border-radius;
  outline: none;

  .option {
    background-color: $primary-color;
    color: $background-color;
  }
}
</style>
