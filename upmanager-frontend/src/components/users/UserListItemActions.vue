<template>
  <v-speed-dial location="left center" transition="fade-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        icon="mdi-dots-vertical"
        variant="text"
      ></v-btn>
    </template>

    <v-btn
      v-if="user.account_status === 'inactive' && authStore.isAdmin"
      key="1"
      icon="mdi-account-check"
      v-tooltip:bottom="'Set Active'"
      variant="elevated"
      color="success"
      elevation="16"
      @click="openDialog"
    ></v-btn>

    <v-btn
      v-if="user.account_status === 'active' && authStore.isAdmin"
      key="2"
      icon="mdi-account-off"
      v-tooltip:bottom="'Set Inactive'"
      color="warning"
      variant="elevated"
      elevation="16"
      @click="openDialog"
    ></v-btn>
    <v-btn
      v-if="authStore.isAdmin || authStore.isEditor"
      key="3"
      icon="mdi-account-edit"
      v-tooltip:bottom="'Edit'"
      variant="elevated"
      color="info"
      elevation="16"
      @click="openDialog"
    ></v-btn>
    <v-btn
      v-if="authStore.isAdmin"
      key="4"
      icon="mdi-delete-alert"
      v-tooltip:bottom="'Delete'"
      color="error"
      variant="elevated"
      elevation="16"
      @click="openDialog"
    ></v-btn>
  </v-speed-dial>

  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:default="{ isActive }">
      <v-card title="User Action">
        <v-card-text>This action is not implemented yet.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@/types/User";
import { ref } from "vue";

const props = defineProps<{
  user: User;
}>();

const authStore = useAuthStore();

const dialog = ref(false);
const openDialog = () => (dialog.value = true);
</script>
