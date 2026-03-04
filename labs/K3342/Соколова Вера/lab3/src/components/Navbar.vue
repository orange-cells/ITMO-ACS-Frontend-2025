<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/catalog" class="brand-circle">рецептуар</router-link>
      
      <div class="d-flex align-items-center gap-2">
        <button @click="toggleTheme" class="btn btn-theme-toggle">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>

        <router-link to="/profile" class="btn btn-profile">
          личный кабинет
        </router-link>

        <button @click="logout" class="btn btn-logout">
          выйти
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';

const { logout } = useAuth();
const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
/* Логотип из ЛР1 */
.brand-circle {
  background-color: salmon;
  color: white;
  width: 80px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: bold;
}
.btn-theme-toggle {
  background: transparent;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 8px;
}
.btn-profile {
  background-color: transparent;
  color: blue;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
}
.btn-logout {
  background-color: transparent;
  color: red;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
}
</style>

