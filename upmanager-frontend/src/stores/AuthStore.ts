// src/stores/auth.ts
import { defineStore } from 'pinia';
import apiClient from '@/infrastructure/apiClient';
import router from '@/router/index'; 
import type { User } from '@/types/User';
import alertHelper from '@/helpers/alertHelper';
import { consoleError } from 'vuetify/lib/util/console.mjs';
import { useTheme } from 'vuetify';


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
                router.push({ name: 'dashboard' });
            } catch (error: any) {
                this.isAuthenticated = false;
                this.user = null;
                this.token = null;
            }
        },

        async logout() {
            try {
                await apiClient.post('/logout');
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

        async fetchUserInfo() {
            try {
                const response = await apiClient.get('/auth/user');
                this.user = response.data;
                return true;
            } catch (error: any) {
                this.token = null;
                this.isAuthenticated = false;
                this.user = null;
                console.error("Errore recupero info utente:", error);
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
