<template>
  <navbar></navbar>
  <main>
    <slot />
  </main>
</template>
<style scoped lang="scss">
main {
  padding: 3rem;
}

main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 3rem;
}

main > *:first-child {
  grid-column: span 2;
}
</style>
<script setup lang="ts"></script>
