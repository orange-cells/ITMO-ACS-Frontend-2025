<template>
  <div class="app-container">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
// скрыть навбар
const showNavbar = computed(() => {
  const publicPages = 'Login';
  return !publicPages.includes(route.name);
});
</script>
