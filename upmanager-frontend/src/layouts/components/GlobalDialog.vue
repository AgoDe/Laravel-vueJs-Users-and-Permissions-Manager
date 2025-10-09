<!-- src/components/common/GlobalDialog.vue -->
<template>
  <v-dialog
    v-model="dialogStore.isOpen"
    :max-width="dialogStore.maxWidth"
    :persistent="dialogStore.persistent"
    @update:modelValue="handleDialogClose"
  >
    <v-card >
      <v-card-title v-if="dialogStore.title">
        {{ dialogStore.title }}
      </v-card-title>
      <v-card-text>
        <component
          v-if="dialogStore.component"
          :is="dialogStore.component"
          v-bind="dialogStore.props"
          @close-dialog="dialogStore.closeDialog()"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();

const handleDialogClose = (value: boolean) => {
  if (!value) {
    dialogStore.closeDialog();
  }
};
</script>

