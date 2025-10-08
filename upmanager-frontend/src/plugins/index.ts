/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import './chartjs';

// Types
import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia  = createPinia();
pinia.use(piniaPluginPersistedState);
export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia);
}
