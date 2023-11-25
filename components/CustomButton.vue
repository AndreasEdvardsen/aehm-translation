<template>
  <button
    :class="[{ filled: filled }, { disabled: disabled }]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  filled: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

Button {
  background-color: transparent;
  color: $primary-color;
  //prevent text wrap
  white-space: nowrap;

  &.filled {
    background-color: $primary-color;
    color: $background-color;
  }

  border-radius: 4px;
  border: 2px solid $primary-color;
  padding: 0.5rem;
  cursor: pointer;

  &.disabled {
    background-color: $disabled-color;
    cursor: not-allowed;
    border-color: $disabled-color;
  }
}

Button:hover {
  background-color: $primary-color;
  color: $background-color;

  &.disabled {
    background-color: $disabled-color;
    cursor: not-allowed;
    border-color: $disabled-color;
  }
}
</style>
