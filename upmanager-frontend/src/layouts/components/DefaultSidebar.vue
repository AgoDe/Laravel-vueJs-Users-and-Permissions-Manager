<template>
  <v-navigation-drawer
    class="p-2"
    left
    elevation="5"
    rail-width="80"
    mobile-breakpoint="lg"
    app
    expand-on-hover
  >
    <v-list dense nav>
      <v-list-item
        link
        :to="{ name: 'dashboard' }"
        title="Dashboard"
      >
        <template #prepend>
          <v-icon>mdi-view-dashboard</v-icon>
        </template>
      </v-list-item>
      <v-list-item
        link
        :to="{ name: 'users-index' }"
        title="Users"
      >
        <template #prepend>
          <v-icon>mdi-account-multiple</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
      <v-divider class="mb-3"></v-divider>
      <v-btn
       :color="getThemeColor"
       :icon="getThemeIcon"
       class="ma-4"
       @click="toggleTheme"
       ></v-btn>
    </template>  
    
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useTheme } from 'vuetify'
import { computed } from 'vue';

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
</script>
