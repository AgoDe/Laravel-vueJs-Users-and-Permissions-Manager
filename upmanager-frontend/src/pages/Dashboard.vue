<template>

<v-row class="mb-4">
    <v-col cols="12" class="text-h4">
        Hi! {{ authStore.user?.name }}
    </v-col>
</v-row>

<v-row>

    <v-col >
        <v-card :title="'Total Users'" elevation="10" class="pa-4 text-center">
            <div class="text-h2 font-weight-bold">
                {{ usersStore.usersStatistics ? usersStore.usersStatistics.total_users : 0 }}
            </div>
            <div class="text-subtitle-1">
                Total registered users
            </div>
        </v-card>
    </v-col>
</v-row>
<v-row class="">

    <v-col >
        <UserTrendRegistrationBarChart v-if="!usersStore.loading && usersStore.usersStatistics" />
    </v-col>

    <v-col>
        <RolePieChart v-if="!usersStore.loading && usersStore.usersStatistics" />
    </v-col>

    <v-col >
        <UserActiveDoughnutChart v-if="!usersStore.loading && usersStore.usersStatistics" />
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
       usersStore.fetchUserStatistics(),
       usersStore.fetchUsersRegistrationsTrend(),
    ]);
});
</script>