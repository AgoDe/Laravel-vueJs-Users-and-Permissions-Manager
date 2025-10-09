<template>
<v-row class="fill-height" align="center" justify="center">
    <v-col cols="12" class="text-center">
        <div class="text-h1 font-weight-bold mb-4">404</div>
        <div class="text-h5 mb-4">Oops! The page you're looking for doesn't exist.</div>
        <v-btn v-if="authStore.isAuthenticated" color="primary" :to="{ name: 'dashboard' }">Go to Dashboard</v-btn>
        <v-btn v-else color="primary" :to="{ name: 'login' }">Go to Login</v-btn>
    </v-col>
</v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();


</script>