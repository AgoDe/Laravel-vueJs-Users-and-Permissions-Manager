<template>
    <UsersFilters></UsersFilters>

    <v-skeleton-loader
    v-if="loading"
    :loading="loading"
    type="table" 
    class="mb-3"
    />
    <UsersList v-else></UsersList>
    <v-pagination
        v-if="!loading && usersStore.users.length > 0"
        v-model="usersStore.filters.page"
        :length="usersStore.pagination.last_page"
        class="my-4"
        color="primary"
        size="large"
    ></v-pagination>
    
</template>

<script setup lang="ts">
import UsersFilters from '@/components/users/UsersFilters.vue';
import UsersList from '@/components/users/UsersList.vue';
import { useUsersStore } from '@/stores/usersStore';
import { ref, watch } from 'vue';

const usersStore = useUsersStore();
const loading = ref<boolean>(false);

watch(
    () => usersStore.filters,
    async () => {
        loading.value = true;
        await usersStore.fetchUsers();
        loading.value = false;
    },
    { deep: true, immediate: true }
);
</script>