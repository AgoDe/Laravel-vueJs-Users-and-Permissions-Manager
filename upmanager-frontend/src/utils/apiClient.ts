import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from "axios";
import alertHelper from "@/utils/alertHelper";
import type { ApiResponse } from "@/types/ApiResponse";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

const baseURL = (import.meta as ImportMeta & { env: { VITE_API_URL: string } })
  .env.VITE_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor per aggiungere il token a ogni richiesta
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Interceptor per gestire errori comuni (401/403) ---
apiClient.interceptors.response.use(
  (response : AxiosResponse) => { 
    console.log("API response:", response);
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {

      if (error.response?.status === 401) {
        console.log("Errore 401 - Non autorizzato");
        if (router.currentRoute.value.path !== "/login") {
          const authStore = useAuthStore();
          authStore.handleUnauthorized();
          alertHelper.toast('error', (error.response?.data as any)?.message || "Sessione scaduta. Effettua nuovamente il login.");
          router.push("/login");
        } else {
          alertHelper.simpleAlert(
            'error', 
            (error.response?.data as any)?.message || "Login Failed", 
            (error.response?.data as any)?.error || "Invalid credentials. Please try again."
          );
        }
        
      } else if (error.response?.status === 403) {
        // Accesso negato (utente loggato ma senza permessi)
        console.error("Errore 403: Accesso negato.");
        alertHelper.simpleAlert(
            'error', 
            (error.response?.data as any)?.message || "Access Denied", 
            (error.response?.data as any)?.error || "You do not have permission to access this resource."
          );
      } else {
        console.error("Errore del server: ", error.response?.status);
        console.error("Dettagli errore: ", (error.response?.data as any)?.error);
        alertHelper.simpleAlert(
          'error', 
          (error.response?.data as any)?.message || "Internal server error.", 
          (error.response?.data as any)?.error || "An error occurred. Please try again later."
        );
      }

    }
    
    return Promise.reject(error); // Rigetta l'errore per gestirlo nel componente se necessario
  }
);

export default apiClient;

