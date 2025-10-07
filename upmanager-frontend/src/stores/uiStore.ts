import { defineStore } from "pinia";

interface UIState {
    sidebarRail: boolean,
    sidebarAppMode: boolean,
}

export const useUIStore = defineStore('UI', {
    state: () : UIState => ({
        sidebarRail : false,
        sidebarAppMode : false,
    }),
    actions: {
        

        toggleSidebarRail() {
            this.sidebarRail = !this.sidebarRail;
        },
        setSidebarRail(value: boolean) {
            this.sidebarRail = value;
        },
        toggleSidebarAppMode() {
            this.sidebarAppMode = !this.sidebarAppMode;
        },
        setSidebarAppMode(value: boolean) {
            this.sidebarAppMode = value;
        }

    },
    getters: {
    }
});