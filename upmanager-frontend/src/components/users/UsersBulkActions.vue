<template>

    <v-speed-dial
    location="right center"
    transition="fade-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-fab
            v-tooltip:bottom="'bulk actions'"
            top
            right
            color="primary"
            v-bind="activatorProps"
            size="large"
            icon
            >
                {{ componentProps.selectedUsersIds.length }} 
                <v-icon>mdi-account-multiple</v-icon>
            </v-fab>
        </template>

        <v-btn key="1" icon="mdi-account-check" v-tooltip:bottom="'Set Active'" color="success" variant="elevated" elevation="16" @click="openDialog"></v-btn>
        <v-btn key="2" icon="mdi-account-off" v-tooltip:bottom="'Set Inactive'" color="warning" variant="elevated" elevation="16" @click="openDialog"></v-btn>
        <v-btn key="3" icon="mdi-delete-alert" v-tooltip:bottom="'Delete'" color="error" variant="elevated" elevation="16" @click="openDialog"></v-btn>
    </v-speed-dial>

    <v-dialog v-model="dialog" max-width="300px">
        <template v-slot:default="{ isActive }">
            <v-card title="Bulk Action">
            <v-card-text>
                This action is not implemented yet.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUsersStore } from "@/stores/usersStore";
import { Tooltip } from "vuetify/directives";
const usersStore = useUsersStore();

const componentProps = defineProps<{
    selectedUsersIds: number[];
}>();

const dialog = ref(false);
const openDialog =  () => dialog.value = true;


</script>