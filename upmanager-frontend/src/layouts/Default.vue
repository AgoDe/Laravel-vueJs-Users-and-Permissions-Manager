<template>

<v-app>
    <!-- Menu -->
    <!-- Navbar -->
        <DefaultHeader />
        <DefaultSidebar />
        
        
        <v-main class="v-main">
            <v-container fluid class="page-wrapper">
                <DefaultBreadcrumb />
                <RouterView />
            </v-container>
        </v-main>
</v-app>

</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import DefaultHeader from './components/DefaultHeader.vue';
import DefaultSidebar from './components/DefaultSidebar.vue';
import DefaultBreadcrumb from './components/DefaultBreadcrumb.vue';
import { useAuthStore } from '@/stores/authStore';
import { useThemeManager } from '@/composables/useThemeManager';
const authStore = useAuthStore();
const { setTheme } = useThemeManager();

onMounted(() => {
  if(authStore.user?.theme){
    setTheme(authStore.user.theme);
  }
});
</script>