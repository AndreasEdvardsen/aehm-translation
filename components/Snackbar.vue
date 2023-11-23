<template>
  <div class="snackbar" :class="[position, {'show': showSnackbar}]">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { Corner } from "~/utils/globals";
  const showSnackbar = ref(false);
  defineProps({
    position: {
      type: String as () => Corner,
      required: false,
      default: Corner.BottomRight,
    },
    fadeOut: {
      type: Boolean,
      required: false,
      default: true,
    }
  });
  defineExpose({
    show,
  });
  function show(timeout = 3000) {
    showSnackbar.value = true;
    setTimeout(() => {
      showSnackbar.value = false;
    }, timeout);
  }
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";
.snackbar {
  visibility: hidden;
  position: fixed;
  z-index: 1000;
  padding: 1rem;
  border-radius: 4px;
  background-color: $primary-color;
  color: $background-color;
  &.top-left {
    top: 1rem;
    left: 1rem;
  }
  &.top-right {
    top: 1rem;
    right: 1rem;
  }
  &.bottom-left {
    bottom: 1rem;
    left: 1rem;
  }
  &.bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
  &.show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 1rem; opacity: 1;}
  }
  @keyframes fadeout {
    from {bottom: 1rem; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
}
</style>