import { ref } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  const applyTheme = (newTheme) => {
    theme.value = newTheme;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme, initTheme: () => applyTheme(theme.value) };
}
