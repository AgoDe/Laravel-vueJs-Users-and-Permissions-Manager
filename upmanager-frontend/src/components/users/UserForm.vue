<template>
  <v-form @submit.prevent="onSubmit" ref="userForm" :disabled="isSubmitting">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Full Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="role"
            :disabled="!authStore.isAdmin"
            :items="roleOptions"
            label="Role"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="account_status"
            :disabled="!authStore.isAdmin"
            :items="accountStatusOptions"
            label="Account Status"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-if="!props.initialData && authStore.isAdmin"
            v-model="password"
            :rules="passwordRules"
            autocomplete="new-password"
            label="Password"
            type="password"
            :required="!props.initialData"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-if="!props.initialData && authStore.isAdmin"
            v-model="passwordConfirmation"
            :rules="passwordConfirmationRules"
            label="Confirm Password"
            type="password"
            :required="!props.initialData"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn type="submit" color="primary" class="mr-2" :loading="isSubmitting">Salva</v-btn>
          <v-btn color="grey" @click="onCancel">Annulla</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup lang="ts">
import type {
  CreateUserRequest,
  UpdateUserAsAdminRequest,
  UpdateUserAsEditorRequest,
  User,
} from "@/types/User";
import { computed, onMounted, ref, shallowRef } from "vue";
import { useUsersStore } from "@/stores/usersStore";
import { useAuthStore } from "@/stores/authStore";
import alertHelper from "@/utils/alertHelper";
import { UsersService } from "@/services/usersService";

const usersStore = useUsersStore();
const authStore = useAuthStore();
const props = defineProps<{
  initialData?: User;
}>();

const emit = defineEmits(["submit-success", "cancel", "close-dialog"]);

const userForm = shallowRef();

const isSubmitting = ref(false);

const name = ref(props.initialData?.name || "");
const email = ref(props.initialData?.email || "");
const password = ref("");
const passwordConfirmation = ref("");
const role = ref<"admin" | "editor" | "viewer">("viewer");
const account_status = ref<"active" | "inactive">("active");

const nameRules = [
  (v: string) => !!v || "Name is required",
  (v: string) => v.length <= 255 || "Name must be less than 255 characters",
];

const emailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
  (v: string) => v.length <= 255 || "Email must be less than 255 characters",
];

const passwordRules = computed(() => {
  if (!!props.initialData) return [];
  return [
    (v: string) => !!v || "Password is required",
    (v: string) =>
      authStore.isAdmin ? !!v || "Password confirmation is required" : true,
    (v: string) => v.length >= 8 || "Password must be at least 8 characters",
  ];
});

const passwordConfirmationRules = computed(() => {
  if (!!props.initialData) return [];
  return [
    (v: string) => !!v || "Password confirmation is required",
    (v: string) => v === password.value || "Passwords must match",
  ];
});

const roleOptions = [
  { title: "Viewer", value: "viewer" },
  { title: "Editor", value: "editor" },
  { title: "Admin", value: "admin" },
];

const accountStatusOptions = [
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" },
];
onMounted(() => {
  if (props.initialData) {
    name.value = props.initialData.name;
    email.value = props.initialData.email;
    role.value = props.initialData.role;
    account_status.value = props.initialData.account_status;
  }
});

const onSubmit = async () => {
  isSubmitting.value = true;

  try {
    const { valid } = await userForm.value.validate();

    if (!valid) {
      alertHelper.toast(
        "error",
        "Please correct the validation errors in the form."
      );
      return;
    }

    await submitUser();
    alertHelper.toast("success", "User saved successfully.");
    emit("submit-success");
    emit("close-dialog");
    usersStore.fetchUsers(true);
  } catch (error) {
    console.error("Submission error:", error);
    alertHelper.toast(
      "error",
      "An error occurred while saving the user. Please try again."
    );
  } finally {
    isSubmitting.value = false;
  }
};

const submitUser = async () => {
  console.log("Submitting user with data:", {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    role: role.value,
    account_status: account_status.value,
  });
  // const { valid } = userForm.value.validate();

  // if (!valid) {
  //     alertHelper.toast('error', 'Please correct the validation errors in the form.');
  //     isSubmitting.value = false;
  //     return;
  // }

  console.log("User form is valid. Submitting...");

  let response;
  if (!props.initialData && authStore.isAdmin) {
    response = await UsersService.CreateUser({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      role: role.value,
      account_status: account_status.value,
    });
  } else {
    if (authStore.isAdmin) {
      response = await UsersService.UpdateUserAsAdmin(
        (props.initialData as UpdateUserAsAdminRequest).id,
        {
          name: name.value,
          email: email.value,
          role: role.value,
          account_status: account_status.value,
        }
      );
    } else if (authStore.isEditor) {
      response = await UsersService.UpdateUserAsEditor(
        (props.initialData as UpdateUserAsEditorRequest).id,
        {
          name: name.value,
          email: email.value,
        }
      );
    } else {
      alertHelper.toast(
        "error",
        "You do not have permission to update this user."
      );
      isSubmitting.value = false;
      return;
    }
  }
};

const onCancel = () => {
  userForm.value.reset();
  props.initialData = undefined;  
  emit("cancel");
  emit("close-dialog");
};
</script>
