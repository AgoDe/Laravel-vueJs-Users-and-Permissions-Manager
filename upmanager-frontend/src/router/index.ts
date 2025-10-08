import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/Login.vue"),
  },
  {
    path: "/access-denied",
    name: "access-denied",
    component: () => import("@/pages/auth/AccessDenied.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/index.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/users",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "users-index",
        component: () => import("@/pages/users/Index.vue"),
        meta: { 
          requiresAuth: true,
          breadcrumb: "Users"
        },
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "settings",
        component: () => import("@/pages/Settings.vue"),
        meta: {
          breadcrumb: "Settings",
          requiresAuth: true, 
          roles: ["admin"] 
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth; // Leggi il meta field
  const requiredRoles = to.meta.roles as string[] | undefined;

  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.checkAuthStatus();
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  }

  if (to.name === "login" && authStore.isAuthenticated) {
    return next({ name: "dashboard" });
  }

  if (requiresAuth && requiredRoles && requiredRoles.length > 0) {
    const userRole = authStore.user?.role || "guest";
    const hasAccess = requiredRoles.includes(userRole);

    if (!hasAccess) {
      return next({ name: "access-denied" });
    }
  }

  next();
});

export default router;
