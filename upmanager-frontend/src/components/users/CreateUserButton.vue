<template>
  <v-btn
    v-if="mobile && authStore.isAdmin"
    color="primary"
    icon="mdi-account-plus"
    rounded="lg"
    @click="openCreateUserDialog"
  >
  </v-btn>
  <v-btn
    v-else-if="authStore.isAdmin"
    color="primary"
    class="ma-2"
    dark
    prepend-icon="mdi-account-plus"
    @click="openCreateUserDialog"
  >
    Create User
  </v-btn>
</template>

<script setup lang="ts">
import { useDialogStore } from "@/stores/dialogStore";
import { useDisplay } from "vuetify";
import UserForm from "./UserForm.vue";
import { useAuthStore } from "@/stores/authStore";

const { mobile } = useDisplay();
const authStore = useAuthStore();
const dialog = useDialogStore();
function openCreateUserDialog() {
  dialog.openDialog(UserForm, {}, { title: "Create New User", persistent: true });
}
</script>
