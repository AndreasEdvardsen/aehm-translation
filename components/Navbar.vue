<template>
  <div class="nav">
    <div class="left-header">
      <h1>AEhm Translation Tracker</h1>
      <div class="nav-links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink
          :class="{ disabled: !user }"
          :to="user ? '/keys-and-values' : ''"
          >Translations
        </NuxtLink>
      </div>
    </div>
    <client-only>
      <div class="account">
        <CustomButton
          v-if="!user"
          label="Sign In"
          @click="navigateTo('/sign-in')"
        />
        <p v-if="user">
          {{ user.username }}
        </p>
        <CustomButton v-if="user" label="Sign Out" @click="signOut" />
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import type { AuthModel } from "pocketbase";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
const user = useState<AuthModel>("user");

onMounted(async () => {
  if (pb.authStore.model && process.client) {
    user.value = pb.authStore.model;
  }
});

function signOut() {
  pb.authStore.clear();
  user.value = null;
  navigateTo("/");
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: $background-color-dark;
  color: $primary-color;

  .left-header {
    display: flex;
    align-items: center;
    gap: 3rem;

    .nav-links {
      display: flex;
      gap: 1rem;

      a {
        color: $primary-color;
        text-decoration: none;

        &:hover {
          color: $primary-color-light;
        }

        &.router-link-active {
          color: $primary-color-light;
          text-decoration: underline;
        }
      }

      .disabled {
        color: $disabled-color;
        cursor: not-allowed;
      }
    }
  }

  .account {
    display: flex;
    gap: 1rem;
    align-items: center;

    a {
      color: $primary-color;
      text-decoration: none;

      &:hover {
        color: $primary-color-light;
      }
    }
  }
}
</style>
