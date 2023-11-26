<template>
  <div class="avatar">
    <img :src="getImageUrl(user)" alt="user avatar" />
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function getImageUrl(user: any) {
  return `https://pocketbase.aehm.cloud/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
}
</script>

<style scoped lang="scss">
.avatar {
  width: 100%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
