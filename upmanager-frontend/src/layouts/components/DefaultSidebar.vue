<template>
  <v-navigation-drawer
    class=""
    v-model="drawerModel"
    elevation="5"
    mobile-breakpoint="lg"
    :temporary="mobile"
    app
    :rail="themeStore.sidebarRail && !mobile"
  >
    <v-list density="comfortable" nav>
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

    <template v-if="authStore.user && mobile">
      <v-divider></v-divider>
      <v-list>
        <v-list-item :title="authStore.user?.name" :subtitle="authStore.user?.role" class="mt-3 mx-2">
          <template #prepend>
            <v-avatar size="32" icon="mdi-account">
            </v-avatar>
          </template>
  
        </v-list-item>

        <v-list-item>
          <v-btn 
          prepend-icon="mdi-logout" 
          color="error" 
          variant="text" 
          class="mx-2"
          @click="authStore.logout()"
          >logout</v-btn>
        </v-list-item>
      </v-list>
    </template>



    <template #append v-if="!mobile">
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
import { useUIStore } from '@/stores/uiStore';
import { useTheme, useDisplay } from 'vuetify'
import { computed } from 'vue';
import { useThemeManager } from '@/composables/useThemeManager';

const theme = useTheme()
const themeStore = useUIStore();
const authStore = useAuthStore();
const { getThemeIcon, getThemeColor, toggleTheme } = useThemeManager();
const { mobile } = useDisplay();


const drawerModel = computed({
  get() {
    // Su mobile: usa sidebarAppMode
    // Su desktop: sempre true (ma controllato da rail)
    return mobile.value ? themeStore.sidebarAppMode : true;
  },
  set(value: boolean) {
    // Solo su mobile può essere chiuso/aperto
    if (mobile.value) {
      themeStore.setSidebarAppMode(value);
    }
  }
});

</script>
