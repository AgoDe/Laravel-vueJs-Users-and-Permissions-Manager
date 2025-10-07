<template>
    <UsersFilters></UsersFilters>

    <v-skeleton-loader
    v-if="usersStore.loading"
    :loading="usersStore.loading"
    type="table" 
    class="mb-3"
    />

    
    <v-row class="align-center px-3" v-else>
        <v-col cols="12">
            <UsersList></UsersList>
        </v-col>
        
        <v-col cols="3">
            <UsersBulkActions v-if="usersStore.selectedUsersIds.length > 0" :selectedUsersIds="usersStore.selectedUsersIds"></UsersBulkActions>
        </v-col>
        <v-col cols="6" class="" >
            <v-pagination
                v-if="!loading && usersStore.users.length > 0"
                v-model="usersStore.filters.page"
                :length="usersStore.pagination.last_page"
                class="my-4"
                color="primary"
                size="large"
            ></v-pagination>
        </v-col>

        <v-col cols="3" class="d-flex justify-end">
            {{ usersStore.pagination.total }} users found
        </v-col>   
    </v-row>
    
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
        usersStore.selectedUsersIds = [];
        await usersStore.fetchUsers();
    },
    { deep: true, immediate: true }
);
</script>