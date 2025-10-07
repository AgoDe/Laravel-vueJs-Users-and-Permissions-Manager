<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-text-field
            variant="solo"
            v-model="searchInput"
            label="Search"
            append-inner-icon="mdi-magnify"
            clearable
            />
        </v-col>

        <v-col cols="6" md="4">
            <v-select
            label="Role" 
            variant="solo"
            v-model="usersStore.filters.role"
            :items="roleOptions"
            >
            </v-select>
        </v-col>

        <v-col cols="6" md="4">
            <v-select 
            label="Status"
            variant="solo" 
            v-model="usersStore.filters.status"
            :items="statusOptions"
            >
            </v-select>
        </v-col>
    </v-row>
        
</template>
<script lang="ts" setup>
import { useUsersStore } from '@/stores/usersStore';
import { computed } from 'vue';
import throttle from 'lodash.throttle'
const usersStore = useUsersStore();


const throttleSearch = throttle((newValue: string) => {
    usersStore.filters.search = newValue;
}, 500);

const searchInput = computed({
    get: () => usersStore.filters.search,
    set: (value: string) => {
        if(value === '') {
            usersStore.filters.search = null;
            return;
        }
        throttleSearch(value);
    }
});

const roleOptions = [
    { title: 'All', value: null },
    { title: 'Admin', value: 'admin' },
    { title: 'Editor', value: 'editor' },
    { title: 'Viewer', value: 'viewer' },
];

const statusOptions = [
    { title: 'All', value: null },
    { title: 'Active', value: 'active' },
    { title: 'Inactive', value: 'inactive' },
];
</script>