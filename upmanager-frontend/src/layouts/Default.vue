<template>

<v-app>
    <!-- Menu -->
    <!-- Navbar -->
        <DefaultHeader />
        <DefaultSidebar />
        
        
        <v-main class="v-main">
            <v-container fluid class="page-wrapper">
                <RouterView />
            </v-container>
        </v-main>
</v-app>

</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import DefaultHeader from './components/DefaultHeader.vue';
import DefaultSidebar from './components/DefaultSidebar.vue';
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/authStore';
const theme = useTheme()

const authStore = useAuthStore();


function toggleTheme() {
  theme.change(theme.global.name.value === 'light' ? 'dark' : 'light')
}

const getThemeIcon = computed(() => {
  return theme.global.name.value === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
});

const getThemeColor = computed(() => {
  return theme.global.name.value === 'light' ? 'blue darken-2' : 'yellow lighten-2'
});

watch(
    () => authStore.user?.theme,
    (newTheme) => {
        if (newTheme) {
            theme.change(newTheme || 'light');
        }
    },
    { immediate: true }
)
</script>