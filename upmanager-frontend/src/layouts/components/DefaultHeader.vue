<template>
    <v-app-bar height="80" elevation="0">
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



        <router-view name="header"></router-view>
        
    </v-app-bar>
</template>

<script setup lang="ts">



</script>