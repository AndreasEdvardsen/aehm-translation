<template>
  <Card>
    <h1>Making Translations Easy!</h1>
    <p>
      This is a tool to help you manage translations for your app. You can
      create keys and values, assign them to users, and track their progress.
    </p>
  </Card>
  <Card>
    <h1>Features</h1>
    <ul class="feature-list">
      <li>Easy to use</li>
      <li>Easy to manage</li>
      <li>Easy to track</li>
    </ul>
  </Card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
