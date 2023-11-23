<template>
  <div class="table-section">
    <div class="header">
      <h1>Entries</h1>
      <TextField class="searchbar" :placeholder="'search'" v-model="search" />
      <CustomButton
        label="Create New +"
        @click="navigateTo(`/keys-and-values/new`)"
      />
    </div>
    <KeysAndValuesTable :search-string="search" />
  </div>
  <NuxtPage />
</template>
<script setup lang="ts">
const search = ref("");

const route = useRoute();
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  .searchbar {
    width: 100%;
  }
}
</style>
