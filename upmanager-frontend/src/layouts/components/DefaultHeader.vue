<template>
    <v-app-bar height="80" elevation="5">
        <!-- <v-btn
        class="hidden-md-and-down text-secondary"
        color="lightsecondary"
        icon
        rounded="sm"
        variant="flat"
        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"

        >
            <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-btn
        class="hidden-lg-and-up text-secondary ms-3"
        color="lightsecondary"
        icon
        rounded="sm"
        variant="flat"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
        ><v-icon>mdi-menu</v-icon></v-btn> -->



        
        <v-list-item title="UPManager" class="px-4">
            <template #prepend>
                <v-avatar size="32">
                    <v-img src="@/assets/logo.png" />
                </v-avatar>
            </template>
        </v-list-item>
        <v-btn icon="mdi-magnify"></v-btn>
            
        <router-view name="header"></router-view>
        <v-spacer></v-spacer>
        <v-list-item :title="authStore.user?.name" :subtitle="authStore.user?.role" class="me-2"></v-list-item>
        <v-btn prepend-icon="mdi-logout" color="error"> logout</v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();


</script>