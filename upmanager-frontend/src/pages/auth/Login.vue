
<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card width="400">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" ref="loginForm">
          <v-text-field 
            variant="solo"
            v-model="username" 
            :rules="emailRules"
            label="Email" 
            required 
          ></v-text-field>
          <v-text-field
            variant="solo"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit" :loading="isSubmitting">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import alertHelper from '@/utils/alertHelper';

const authStore = useAuthStore();

const isSubmitting = ref(false);
const username = ref('test@example.com');
const password = ref('password');

const loginForm = ref();

const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 14) || 'Password must be less than 14 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const submit = async () => {
    isSubmitting.value = true;
    const {valid} = await loginForm.value.validate();


    if (!valid) {
        alertHelper.toast('error', 'Please correct the validation errors in the form.');
        isSubmitting.value = false;
        return;
    }

    await authStore.login( { email: username.value, password: password.value } );
    isSubmitting.value = false;
};
</script>
