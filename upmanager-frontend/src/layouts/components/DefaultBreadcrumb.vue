<template>

<v-breadcrumbs v-if="breadcrumbs.length > 0" :items="breadcrumbs" class="mb-4">
    <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
</v-breadcrumbs>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const breadcrumb = computed(() => {
    return route.meta.breadcrumb
})

interface BreadcrumbItem {
    title: string;
    href: string;
    disabled: boolean;
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    console.log("breadcrumb", route.name)
    const array : BreadcrumbItem[] = []
    if(route.name != "dashboard") {
        array.push({ title: 'Dashboard', href: '/', disabled: false })
    }

    if (route.meta.breadcrumb) {
        array.push({ title: route.meta.breadcrumb as string, href: route.path, disabled: true })
    }
    return array;
});



</script>