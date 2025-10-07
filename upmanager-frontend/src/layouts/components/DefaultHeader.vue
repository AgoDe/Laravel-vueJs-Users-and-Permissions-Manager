<template>
    <v-app-bar height="80" elevation="5" class="px-2">
        
        
        
        
        <v-list-item title="UPManager" class="">
            <template #prepend>
                <v-avatar size="32">
                    <v-img src="@/assets/logo.png" />
                </v-avatar>
            </template>
        </v-list-item>

        <v-btn
        v-if="!mobile"
        :icon="uiStore.sidebarRail ? 'mdi-menu-close' : 'mdi-menu-open'"
        class="hidden-md-and-down text-secondary"
        color="lightsecondary"
        rounded="sm"
        variant="flat"
        @click.stop="uiStore.toggleSidebarRail"
        >
        </v-btn>
    
        <template v-if="mobile">

            <v-spacer></v-spacer>
            <v-btn
            :color="getThemeColor"
            :icon="getThemeIcon"
            class="ma-4"
            @click="toggleTheme"
            ></v-btn>
            <v-btn
            icon="mdi-menu"
            class="hidden-lg-and-up text-secondary ms-3"
            color="lightsecondary"
            rounded="sm"
            variant="flat"
            @click.stop="uiStore.toggleSidebarAppMode"
            size="small"
            ></v-btn>
        </template>

        <template v-if="!mobile">
            <router-view name="header"></router-view>
            <v-spacer></v-spacer>
            <v-list-item :title="authStore.user?.name" :subtitle="authStore.user?.role" class="me-2"></v-list-item>
            <v-btn 
            @click="authStore.logout()"
            prepend-icon="mdi-logout" 
            color="error"> logout</v-btn>
        </template>

    </v-app-bar>
</template>

<script setup lang="ts">
import { useThemeManager } from '@/composables/useThemeManager';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay();

const { getThemeIcon, getThemeColor, toggleTheme } = useThemeManager();

const authStore = useAuthStore();
const uiStore = useUIStore();

</script>