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
      key="3"
      icon="mdi-account-edit"
      v-tooltip:bottom="'Edit'"
      variant="elevated"
      color="info"
      elevation="16"
      @click="openEditDialog"
    ></v-btn>
    <v-btn
      v-if="authStore.isAdmin"
      key="4"
      icon="mdi-delete-alert"
      v-tooltip:bottom="'Delete'"
      color="error"
      variant="elevated"
      elevation="16"
      @click="showDeleteDialog = true"
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

  <v-dialog v-model="showDeleteDialog" max-width="500">
    <v-card title="Confirm Delete">
      <v-card-text>
        Are you sure you want to delete this user?
        <div>
          <strong>{{ user.name }}</strong> ({{ user.email }})
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey lighten-1"
          text
          @click="showDeleteDialog = false"
          :disabled="loading"
        >
          Cancel
        </v-btn>
        <v-btn color="red" text @click="deleteUser(user)" :loading="loading">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useDialogStore } from "@/stores/dialogStore";
import type { User } from "@/types/User";
import { ref } from "vue";
import UserForm from "./UserForm.vue";
import { UsersService } from "@/services/usersService";
import alertHelper from "@/utils/alertHelper";
import type { AxiosError } from "axios";
import { useUsersStore } from "@/stores/usersStore";
const loading = ref(false);

const props = defineProps<{
  user: User;
}>();

const usersStore = useUsersStore();
const dialogStore = useDialogStore();
const authStore = useAuthStore();
const dialog = ref(false);

const openDialog = () => (dialog.value = true);

const openEditDialog = () => {
  dialogStore.openDialog(
    UserForm,
    { initialData: props.user },
    { title: "Edit User", persistent: true }
  );
};

const showDeleteDialog = ref(false);
const deleteUser = async (user: User) => {
  loading.value = true;
  try {
    await UsersService.DeleteUser(user.id);
    alertHelper.toast("success", "User deleted successfully");
    await usersStore.fetchUsers(true);
  } catch (error: AxiosError | any) {
    console.error("Error deleting user:", error);
    alertHelper.toast(
      "error",
      error.response?.data?.message || "Failed to delete user"
    );
  } finally {
    loading.value = false;
  }
};
</script>
