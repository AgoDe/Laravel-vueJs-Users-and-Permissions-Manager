<template>

<v-row class="mb-4">
    <v-col cols="12" class="text-h4">
        Hi! {{ authStore.user?.name }}
    </v-col>
</v-row>

<v-row>

    <v-col >
        <v-card :title="'Total Users'" elevation="10" class="pa-4 text-center" :loading="usersStore.usersStatistics.loading">
            <div class="text-h2 font-weight-bold" v-if="!usersStore.usersStatistics.loading">
                {{ usersStore.usersStatistics ? usersStore.usersStatistics.data?.total_users : 0 }}
            </div>
            <v-progress-circular v-else indeterminate :size="50"></v-progress-circular>
            <div class="text-subtitle-1">
                Total registered users
            </div>
        </v-card>
    </v-col>
</v-row>
<v-row class="">

    <v-col >
        <UserTrendRegistrationBarChart :force-fetch="false" />
    </v-col>

    <v-col>
        <RolePieChart :force-fetch="false"/>
    </v-col>

    <v-col >
        <UserActiveDoughnutChart :force-fetch="false" />
    </v-col>
</v-row>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { Chart } from 'chart.js';
import { useAuthStore } from '@/stores/authStore';
import RolePieChart from '@/components/users/RolePieChart.vue';
import UserTrendRegistrationBarChart from '@/components/users/UserTrendRegistrationBarChart.vue';
const usersStore = useUsersStore();
const authStore = useAuthStore();

onMounted(async () => {
    await Promise.allSettled([
       usersStore.fetchUsersStatistics(),
       usersStore.fetchUsersRegistrationsTrend(),
    ]);
});
</script>