// src/stores/auth.ts
import { defineStore } from 'pinia';
import apiClient from '@/utils/apiClient';
import router from '@/router/index'; 
import type { User } from '@/types/User';
import alertHelper from '@/utils/alertHelper';
import { consoleError } from 'vuetify/lib/util/console.mjs';
import { useTheme } from 'vuetify';
import type { ApiResponse } from '@/types/ApiResponse';


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        user: null,
        token: null,
    }),
    persist: true,
    actions: {
        async login(credentials: { email: string; password: string; }) {
            try {
                const response : any = await apiClient.post('/login', credentials);
                alertHelper.toast('success', 'Login successful!');
                this.isAuthenticated = true;
                this.user = response.user;
                this.token = response.access_token;
                const route = router.currentRoute.value.query.redirect as string || '/';
                router.push(route);
            } catch (error: any) {
                this.isAuthenticated = false;
                this.user = null;
                this.token = null;
            }
        },

        async logout() {
            try {
                const response : ApiResponse= await apiClient.post('/logout');
                alertHelper.toast('success', response.message || 'Logout successful!');
            } catch (error: any) {
                console.error("Errore durante il logout:", error);
            } finally {
                // Pulisci sempre lo stato locale
                this.isAuthenticated = false;
                this.user = null;
                this.token = null;
                router.push('/login');
            }
        },

        handleUnauthorized() {
            this.token = null;
            this.isAuthenticated = false;
            this.user = null;     
        },

        async updateTheme(theme: 'light' | 'dark') {
           
            const response = await apiClient.put('/auth/user/theme', { theme });
            if (this.user) {
                this.user.theme = theme;
            }

            return response.status === 200 ? true : false;
        },

        async checkAuthStatus(): Promise<boolean> {
            try {
                const data: any = await apiClient.get('/auth/user');
                this.isAuthenticated = true;
                this.user = data?.user ?? data;
                return true;
            } catch (error: unknown) {
                this.isAuthenticated = false;
                this.user = null;
                this.token = null;
                return false;
            }
        },
    },
    getters: {
        isUserLoggedIn: (state) => state.isAuthenticated,
        getUserEmail: (state) => state.user?.email,
        getUserName: (state) => state.user?.name,
        getUserRole: (state) => state.user?.role,
        getUserTheme: (state) => state.user?.theme || 'light',
        isAdmin: (state) => state.user?.role === 'admin',
        isEditor: (state) => state.user?.role === 'editor',
        isViewer: (state) => state.user?.role === 'viewer',
    }
});
