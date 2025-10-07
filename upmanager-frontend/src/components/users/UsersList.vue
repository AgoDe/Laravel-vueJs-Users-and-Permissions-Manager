<template>
    <v-list>
        <template v-if="usersStore.users.length === 0">
            <v-list-item>
                <v-list-item-title>Nessun utente trovato.</v-list-item-title>
            </v-list-item>
        </template>
        <template v-else>
            <v-table>
                <thead>
                    <tr>
                        <th v-if="authStore.isAdmin">
                            <v-checkbox 
                            hide-details
                            :indeterminate="usersStore.selectedUsersIds.length > 0 && usersStore.selectedUsersIds.length < usersStore.users.length"
                            @update:model-value="toggleSelectAll"
                            />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th v-if="!authStore.isViewer">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usersStore.users" :key="user.id">
                        <td v-if="authStore.isAdmin">
                            <v-checkbox :value="user.id" hide-details v-model="usersStore.selectedUsersIds" />
                        </td>
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <v-chip :color="user.account_status === 'active' ? 'green' : 'red'" dark>
                                {{ user.account_status }}
                            </v-chip>
                        </td>
                        <td>{{ date.format(user.created_at, "fullDate") }}</td>
                        <td v-if="!authStore.isViewer">
                            <UserListItemActions :user="user"></UserListItemActions>
                        </td>
                    </tr>

                </tbody>
            </v-table>
        </template>
    </v-list>

</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { useDate } from 'vuetify';
import { useAuthStore } from '@/stores/authStore';
import UserListItemActions from './UserListItemActions.vue';

const authStore = useAuthStore();
const date = useDate(); 
const usersStore = useUsersStore();

const toggleSelectAll = (value: boolean) => {
    console.log(value);
    if (value) {
        usersStore.selectedUsersIds = usersStore.users.map(user => user.id);
    } else {
        usersStore.selectedUsersIds = [];
    }
};


</script>