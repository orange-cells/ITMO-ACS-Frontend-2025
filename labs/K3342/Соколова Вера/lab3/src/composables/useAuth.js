import { ref, computed } from 'vue';
import api from '@/api/instance';

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value);

  const login = async (email, password) => {
    try {
      const response = await api.get('/users', {
        params: { email: email.trim() } 
      });
      const users = response.data;
      if (users.length === 0) {
        throw new Error('такого пользователя нет');
      }
      const user = users[0];
      if (String(user.password) === String(password)) {
        currentUser.value = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      } else {
        throw new Error('неверный пароль');
      }
    } catch (err) {
      console.error("ошибка входа:", err.message);
      throw err; 
    }
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  const refreshUser = async () => {  // чтобы брать список сохраненных
    if (!currentUser.value) return;
    try {
      const { data } = await api.get(`/users/${currentUser.value.id}`);
      currentUser.value = data;
      localStorage.setItem('currentUser', JSON.stringify(data)); 
    } catch (e) {
      console.error("ошибка: ", e);
    }
  };

  return { currentUser, isLoggedIn, login, logout, refreshUser };
}

