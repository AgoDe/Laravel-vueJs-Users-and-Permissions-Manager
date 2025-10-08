<template>
    <v-card title="User Roles Distribution" elevation="10">

        <template #text>
            <Pie :data="chartData"></Pie>
        </template>
    </v-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { Chart } from 'chart.js';
import { Pie } from 'vue-chartjs';

const usersStore = useUsersStore();

const chartData = computed(() => ({
    labels: ["Admins", "Editors", "Viewers"],
    datasets: [{
        data: usersStore.usersStatistics ? [
            usersStore.usersStatistics.admins || 0,
            usersStore.usersStatistics.editors || 0,
            usersStore.usersStatistics.viewers || 0
        ] : [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 2,
        borderColor: '#fff'
    }]
}));

onMounted( async () => {


})
</script>