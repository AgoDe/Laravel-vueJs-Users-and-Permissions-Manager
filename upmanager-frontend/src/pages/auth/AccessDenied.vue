<template>
  <v-container class="d-flex align-center justify-center" style="min-height:60vh">
    <v-card class="pa-6" elevation="2">
      <h3>Access Denied</h3>
      <p>You do not have permission to access this page.</p>
      <v-btn color="primary" @click="$router.push({ name: 'dashboard' })">Go to Dashboard</v-btn>
    </v-card>
  </v-container>
</template>