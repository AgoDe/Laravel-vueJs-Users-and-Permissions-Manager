import type { User, UsersFilters } from "@/types/User";
import { defineStore } from "pinia";
import apiClient from "@/utils/apiClient";
import type { ApiResponse, PaginatedApiResponse as PaginatedApiResponse } from "@/types/ApiResponse";
import { UsersService } from "@/services/usersService";

interface UsersState {
    users: User[],
    pagination: {
        current_page: number,
        per_page: number,
        total: number,
        last_page: number,
    },
    filters: UsersFilters,
    loading: boolean,

}
export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        pagination: {
            current_page: 1,
            per_page: 10,
            total: 0,
            last_page: 0,
        },
        filters : {
            search: null as string | null,
            page: 1,
            per_page: 10,
            role: null,
            status: null,
            sort_by: 'created_at',
            sort_order: 'desc'
        },
        loading: false,
    }),
    actions: {
        async fetchUsers() {
            this.loading = true;
            try {
                const response : PaginatedApiResponse<User> = await UsersService.fetchUsers(this.filters);
                this.users = response.data;
                this.pagination = {
                    current_page: response.current_page,
                    per_page: response.per_page,
                    total: response.total,
                    last_page: response.last_page
                };

            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
    }
});