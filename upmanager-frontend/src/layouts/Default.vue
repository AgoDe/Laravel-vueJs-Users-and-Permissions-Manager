<template>
  <v-app>

    <DefaultHeader />
    <DefaultSidebar />

    <v-main class="v-main">
      <v-container fluid class="page-wrapper">
        <v-row>
          <v-col>
            <DefaultBreadcrumb />
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end" cols="auto">
            <RouterView name="actions"></RouterView>
          </v-col>
        </v-row>
        <RouterView />
      </v-container>
    </v-main>

    <GlobalDialog />
  </v-app>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import DefaultHeader from "./components/DefaultHeader.vue";
import DefaultSidebar from "./components/DefaultSidebar.vue";
import DefaultBreadcrumb from "./components/DefaultBreadcrumb.vue";
import { useAuthStore } from "@/stores/authStore";
import { useThemeManager } from "@/composables/useThemeManager";
import GlobalDialog from "./components/GlobalDialog.vue";
const authStore = useAuthStore();
const { setTheme } = useThemeManager();

onMounted(() => {
  if (authStore.user?.theme) {
    setTheme(authStore.user.theme);
  }
});
</script>
