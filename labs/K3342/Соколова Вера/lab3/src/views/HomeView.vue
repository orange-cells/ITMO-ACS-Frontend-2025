<template>
  <div class="container py-4">
    <div class="card p-4 mb-4 filter-card shadow-sm border-0">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label fw-bold">поиск</label>
          <input v-model="search" type="text" class="form-control" placeholder="пишите тут">
        </div>
        <div class="col-md-4">
          <label class="form-label fw-bold">тип блюда</label>
          <select v-model="filterType" class="form-select">
            <option value="all">любой</option>
            <option value="суп">суп</option>
            <option value="второе">второе</option>
            <option value="десерт">десерт</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label fw-bold">сложность</label>
          <select v-model="filterComplexity" class="form-select">
            <option value="all">любая</option>
            <option value="легко">легко</option>
            <option value="надо постараться">надо постараться</option>
            <option value="сложно">сложно</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div class="row g-4" v-else>
      <div class="col-md-4" v-for="recipe in filteredRecipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/api/instance';
import RecipeCard from '@/components/RecipeCard.vue';

const recipes = ref([]);
const loading = ref(true);
const search = ref('');
const filterType = ref('all');
const filterComplexity = ref('all');

onMounted(async () => {
  try {
    const { data } = await api.get('/recipes');
    recipes.value = data;
  } finally {
    loading.value = false;
  }
});

const filteredRecipes = computed(() => {
  return recipes.value.filter(r => {
    const mSearch = r.title.toLowerCase().includes(search.value.toLowerCase().trim());
    const mType = filterType.value === 'all' || r.type === filterType.value;
    const mComp = filterComplexity.value === 'all' || r.complexity === filterComplexity.value;
    return mSearch && mType && mComp;
  });
});
</script>

<style scoped>
.filter-card { background-color: darksalmon; color: white; }
</style>
