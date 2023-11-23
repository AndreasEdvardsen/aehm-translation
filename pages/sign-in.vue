<template>
  <Card>
    <h1>Sign In</h1>
    <form @submit.prevent class="sign-in-form">
      <TextField
        :required="true"
        label="Username or Email"
        v-model="usernameOrEmail"
      />
      <TextField
        :required="true"
        label="Password"
        v-model="password"
        type="password"
      />
      <CustomButton
        :disabled="usernameOrEmail.length == 0 || password.length == 0"
        label="Sign In"
        @click="signIn"
      />
    </form>
  </Card>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import type { AuthModel } from "pocketbase";

const usernameOrEmail = ref("");
const password = ref("");
const pb = new PocketBase("https://pocketbase.aehm.cloud");
const user = useState<AuthModel>("user", () => ref<AuthModel>());

async function signIn() {
  const authData = await pb
    .collection("users")
    .authWithPassword(usernameOrEmail.value, password.value)
    .then((authData) => {
      user.value = pb.authStore.model;
      navigateTo("/keys-and-values");
    })
    .catch((err) => {
      console.log("Login Failed!", err);
    });
}
</script>

<style scoped lang="scss">
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
