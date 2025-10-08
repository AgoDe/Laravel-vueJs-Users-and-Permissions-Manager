<template>
    <v-card title="Users Statuses" elevation="10">

        <template #text>
            <Doughnut :data="chartData"></Doughnut>
        </template>
    </v-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { Doughnut, Pie } from 'vue-chartjs';

const usersStore = useUsersStore();

const chartData = computed(() => ({
    labels: ["Active", "Inactive"],
    datasets: [{
        data: usersStore.usersStatistics ? [
            usersStore.usersStatistics.active_users || 0,
            usersStore.usersStatistics.inactive_users || 0
        ] : [0, 0],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderWidth: 2,
        borderColor: '#fff'
    }]
}));

onMounted( async () => {


})
</script>