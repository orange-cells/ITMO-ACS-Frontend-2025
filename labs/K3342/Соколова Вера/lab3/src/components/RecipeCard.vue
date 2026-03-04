<template>
  <div class="card h-100 shadow-sm border-0">
    <img :src="recipe.image" class="card-img-top" :alt="recipe.title">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ recipe.title }}</h5>
      <p class="card-text text-muted small">{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['recipe']);
</script>
