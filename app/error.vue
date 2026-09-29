<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage?: string } }>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="container">
      <NuxtLink to="/" class="brand"><span class="brand-mark">B<span>.</span></span><span>BlogCris</span></NuxtLink>
      <div class="error-content">
        <p class="eyebrow"><span class="eyebrow-line" /> ERROR {{ error.statusCode }}</p>
        <h1>{{ error.statusCode === 404 ? 'Esta página se perdió por el camino.' : 'Algo salió mal.' }}</h1>
        <p>{{ error.statusCode === 404 ? 'La dirección que buscas no existe.' : 'Inténtalo de nuevo más tarde.' }}</p>
        <button class="button button-primary" type="button" @click="goHome">Volver al inicio →</button>
      </div>
    </div>
  </div>
</template>
