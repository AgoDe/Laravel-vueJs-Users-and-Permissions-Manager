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
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usersStore.users" :key="user.id">
                        <td>
                            <v-checkbox :value="user.id" hide-details />
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
                        <td></td>
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

const date = useDate();
const usersStore = useUsersStore();

</script>