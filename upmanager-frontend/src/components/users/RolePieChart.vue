<template>
    <v-card title="User Roles Distribution" elevation="10" :loading="usersStore.usersStatistics.loading">
        <template #text>
            <Pie :data="chartData"></Pie>
        </template>
    </v-card>
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { Pie } from 'vue-chartjs';

const usersStore = useUsersStore();

const props = defineProps({
    forceFetch: {
        type: Boolean,
        default: true
    }
});

const chartData = computed(() => ({
    labels: ["Admins", "Editors", "Viewers"],
    datasets: [{
        data: usersStore.usersStatistics ? [
            usersStore.usersStatistics?.data?.admins || 0,
            usersStore.usersStatistics?.data?.editors || 0,
            usersStore.usersStatistics?.data?.viewers || 0
        ] : [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 2,
        borderColor: '#fff'
    }]
}));

onMounted( async () => {
    if(props.forceFetch) {
        await usersStore.fetchUsersStatistics();
    }
})
</script>