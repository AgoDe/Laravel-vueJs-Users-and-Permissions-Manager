<template>

<v-app>
   <!-- Menu -->
        <DefaultSidebar />
        <!-- Navbar -->
        <DefaultHeader />


        <v-main class="v-main">
            <v-container fluid class="page-wrapper">
                <div>
                    <v-btn @click="toggleTheme">
                      Cambia tema
                    </v-btn>
                    <RouterView />
                </div>
            </v-container>
            
            <v-container fluid class="py-1">
                
            </v-container>
        </v-main> 
</v-app>

</template>
<script setup lang="ts">
import { watch } from 'vue';
import DefaultHeader from './components/DefaultHeader.vue';
import DefaultSidebar from './components/DefaultSidebar.vue';
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/AuthStore';
const theme = useTheme()

const authStore = useAuthStore();


function toggleTheme() {
  theme.change(theme.global.name.value === 'light' ? 'dark' : 'light')
}

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