import { useTheme } from "vuetify";
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";

export function useThemeManager() {
    const theme = useTheme();
    const authStore = useAuthStore();


    const currentTheme = theme.global.name.value as 'light' | 'dark';
    
    async function toggleTheme() {
  
        const newTheme = theme.global.name.value === 'light' ? 'dark' : 'light';
        theme.change(newTheme);
       
        if (authStore.isAuthenticated) {
            await authStore.updateTheme(newTheme);

        }
    }

    async function setTheme(themeName: 'light' | 'dark') {
        theme.change(themeName);    
    }

    const getThemeIcon = computed(() => {
        return theme.global.name.value === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
    })

    const getThemeColor = computed(() => {
        return theme.global.name.value === 'light' ? 'blue darken-2' : 'yellow lighten-2'
    })

    return {
        currentTheme,
        toggleTheme,
        setTheme,
        getThemeIcon,
        getThemeColor
    }

}