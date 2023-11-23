<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.card {
  background-color: $background-color;
  padding: $spacing;
  border: $border;
  border-radius: $border-radius;

  display: flex;
  flex-direction: column;
  gap: $spacing;
}
</style>
