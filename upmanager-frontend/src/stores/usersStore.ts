import type { User, UsersFilters, UsersRegistrationsTrend, UsersStatistics } from "@/types/User";
import { defineStore } from "pinia";
import apiClient from "@/utils/apiClient";
import type { ApiResponse, PaginatedApiResponse as PaginatedApiResponse } from "@/types/ApiResponse";
import { UsersService } from "@/services/usersService";

const CACHE_DURATION = parseInt(import.meta.env.VITE_APP_API_CACHE_DURATION) || 5; // in minutes

interface UsersState {
    users: User[],
    lastFetch: Date | null,
    pagination: {
        current_page: number,
        per_page: number,
        total: number,
        last_page: number,
    },
    filters: UsersFilters,
    loading: boolean,
    selectedUsersIds: number[],
    usersStatistics: UsersStatistics | null,
    usersRegistrationsTrend: UsersRegistrationsTrend[] | null

}
export const useUsersStore = defineStore('users', {
    state: () => ({
        users: {
            data: [] as User[],
            lastFetch: null as number | null,
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
        },
        usersStatistics: {
            data: null as UsersStatistics | null,
            lastFetch: null as number | null,
            loading: false,
        },
        usersRegistrationsTrend: {
            data: null as UsersRegistrationsTrend[] | null,
            lastFetch: null as number | null,
            loading: false,
        },
        selectedUsersIds: [] as number[],
    }),
    actions: {
        async fetchUsers(forceRefresh = false) {

            // Use cache if available and not expired
            console.log("Checking cache:", { lastFetch: this.users.lastFetch, isCacheExpired: this.isUsersCacheExpired(), forceRefresh });
            if (this.users.data.length && !forceRefresh && !this.isUsersCacheExpired()) return
            
            this.users.loading = true;

            try {
                const response : PaginatedApiResponse<User> = await UsersService.getUsers(this.users.filters);
                this.users.data = response.data;
                this.users.pagination = {
                    current_page: response.current_page,
                    per_page: response.per_page,
                    total: response.total,
                    last_page: response.last_page
                };
                this.users.lastFetch = Date.now();

            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.users.loading = false;
            }
        },

        async fetchUsersStatistics(forceRefresh = false) : Promise<void> {
            if (!forceRefresh && !this.isUsersStatisticsCacheExpired()) return;
            this.usersStatistics.loading = true;
            try {
                const response : UsersStatistics = await UsersService.getUsersStatistics();
                this.usersStatistics.data = response;
                this.usersStatistics.lastFetch = Date.now();
            } catch (error) {
                console.error('Error fetching users statistics:', error);
            } finally {
                this.usersStatistics.loading = false;
            }
        },

        async fetchUsersRegistrationsTrend(forceRefresh = false) : Promise<void> {
            if (!forceRefresh && !this.isUsersRegistrationsTrendCacheExpired()) return;

            this.usersRegistrationsTrend.loading = true;
            try {
                const response : UsersRegistrationsTrend[] = await UsersService.getUsersRegistrationsTrend();
                this.usersRegistrationsTrend.data = response;
                this.usersRegistrationsTrend.lastFetch = Date.now();
            } catch (error) {
                console.error('Error fetching users registrations trend:', error);
            } finally {
                this.usersRegistrationsTrend.loading = false;
            }
        },

        isUsersCacheExpired() : boolean {
            return !this.users.lastFetch || (Date.now() - this.users.lastFetch > CACHE_DURATION * 60 * 1000);
        },
        isUsersStatisticsCacheExpired() : boolean {
            return !this.usersStatistics.lastFetch || (Date.now() - this.usersStatistics.lastFetch > CACHE_DURATION * 60 * 1000);
        },
        isUsersRegistrationsTrendCacheExpired() : boolean {
            return !this.usersRegistrationsTrend.lastFetch || (Date.now() - this.usersRegistrationsTrend.lastFetch > CACHE_DURATION * 60 * 1000);
        }
    },
    getters: {
    }
});