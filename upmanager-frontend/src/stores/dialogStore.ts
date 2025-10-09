// src/stores/dialogStore.ts
import { defineStore } from 'pinia';
import type { Component } from 'vue';

export interface DialogState {
    isOpen: boolean;
    component: Component | null;
    props: Record<string, any>;
    title: string;
    maxWidth: string | number;
    persistent: boolean;
}

export const useDialogStore = defineStore('dialog', {
    state: (): DialogState => ({
        isOpen: false,
        component: null,
        props: {},
        title: '',
        maxWidth: '600px', 
        persistent: false,
    }),
    actions: {
        openDialog<T extends Record<string, any>>(
            component: Component,
            props: T = {} as T,
            options: Partial<{ title: string; maxWidth: string | number; persistent: boolean }> = {}
        ) {
            this.component = component;
            this.props = props;
            this.title = options.title || '';
            this.maxWidth = options.maxWidth || '600px';
            this.persistent = options.persistent || false;
            this.isOpen = true;
        },
        closeDialog() {
            this.isOpen = false;
           
            setTimeout(() => {
                if (!this.isOpen) {
                    this.component = null;
                    this.props = {};
                    this.title = '';
                }
            }, 300);
        },
    },
});
