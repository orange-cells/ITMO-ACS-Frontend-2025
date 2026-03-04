<template>
  <div class="d-flex align-items-center justify-content-center flex-column" style="height: 90vh;">
    <div class="card text-center mb-3 login-card" style="width: 25rem; background-color: darksalmon; padding: 5%;">
      <form @submit.prevent="handleLogin" class="text-white">
        <h2 class="mb-4">вход</h2>
        <div class="mb-3 text-start">
          <label class="form-label">электронная почта</label>
          <input v-model="email" type="email" class="form-control" required>
        </div>
        <div class="mb-3 text-start">
          <label class="form-label">пароль</label>
          <input v-model="password" type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'загрузка...' : 'войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/profile')
  } catch (err) {
    alert(err.message)
  } finally {
    loading.value = false
  }
}
</script>
