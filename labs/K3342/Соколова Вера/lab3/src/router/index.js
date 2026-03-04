import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/ProfileView.vue';

const routes = [
  { path: '/login', component: LoginView, name: 'Login' },
  { path: '/catalog', component: HomeView, name: 'Home', meta: { requiresAuth: true } },
  { path: '/profile', component: ProfileView, name: 'Profile', meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
