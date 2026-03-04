<template>
  <div class="container py-5" v-if="currentUser">
    <div class="row mb-4 align-items-center">
      <div class="col-auto">
        <img src="/images/image.png" class="rounded-circle" width="120">
      </div>
      <div class="col">
        <h2 id="name">имя: {{ currentUser.name }}</h2>
        <p class="text-muted">email: {{ currentUser.email }}</p>
      </div>
    </div>

    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#saved">сохраненные</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#my-recipes">мои рецепты</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#subscription">подписки</button>
      </li>
    </ul>

    <div class="tab-content pt-4">
      <div class="tab-pane fade show active" id="saved">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary"></div>
        </div>
        <div v-else class="row g-4">
          <div class="col-md-4" v-for="recipe in savedRecipes" :key="recipe.id">
             <RecipeCard :recipe="recipe" />
          </div>
          <p v-if="!loading && !savedRecipes.length" class="text-muted">ничего пока не сохранено</p>
        </div>
      </div>

      <div class="tab-pane fade" id="my-recipes">
        <p>скоро будет</p>
      </div>
      <div class="tab-pane fade" id="subscription">
        <p>скоро будет</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/instance'; 
import { useAuth } from '@/composables/useAuth'
import RecipeCard from '@/components/RecipeCard.vue';

const { currentUser, refreshUser } = useAuth()
const savedRecipes = ref([]);
const loading = ref(false);

const fetchSavedRecipes = async () => {
    const favIds = currentUser.value?.favourites || [];

    if (favIds.length === 0) {
        savedRecipes.value = [];
        return;
    }

    loading.value = true;
    try {
        const queryParams = favIds.map(id => `id=${id}`).join('&');
        const response = await api.get(`/recipes?${queryParams}`);
        
        savedRecipes.value = response.data;
    } catch (error) {
        console.error("ошибка", error);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
  await refreshUser(); 
  await fetchSavedRecipes();
});

</script>
