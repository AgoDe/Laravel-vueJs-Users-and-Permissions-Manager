<template>
    <v-card title="User Registrations Trends" elevation="10" :loading="usersStore.usersRegistrationsTrend.loading">

        <template #text>
            <Bar :data="chartData" :options="chartOptions"></Bar>
        </template>
    </v-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { Chart } from 'chart.js';
import { Bar } from 'vue-chartjs';
import dayjs from 'dayjs';

const usersStore = useUsersStore();

const props = defineProps({
    forceFetch: {
        type: Boolean,
        default: true
    }
});
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
};
const chartData = computed(() => {

    if(!usersStore.usersRegistrationsTrend || usersStore.usersRegistrationsTrend.data?.length === 0) {
        return {
            labels: [],
            datasets: []
        };
    }

    const colors =  ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    const labels = usersStore.usersRegistrationsTrend.data?.map(item => dayjs(item.month).format('MMMM YYYY'));
    const data = usersStore.usersRegistrationsTrend.data?.map(item => item.count);
    const backgrounds = colors.slice(0, data?.length);
    
    return {
        labels,
        datasets: [
            {
                backgroundColor: backgrounds,
                data,
            }
        ]
    
    };
})

onMounted( async () => {
    if(props.forceFetch) {
        await usersStore.fetchUsersRegistrationsTrend();
    }
})
</script>