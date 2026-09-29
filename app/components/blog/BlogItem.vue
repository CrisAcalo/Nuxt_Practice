<script setup lang="ts">
import type { BlogPost } from '../../../shared/types/blog'

defineProps<{ post: BlogPost; index?: number }>()
</script>

<template>
  <article class="post-card">
    <div class="post-card-top">
      <span class="post-number">{{ String(index ?? post.id).padStart(2, '0') }}</span>
      <span class="post-views">{{ post.views.toLocaleString('es') }} lecturas</span>
    </div>
    <div class="post-tags">
      <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <h3><NuxtLink :to="`/blog/${post.id}`">{{ post.title }}</NuxtLink></h3>
    <p class="post-excerpt">{{ post.body }}</p>
    <NuxtLink :to="`/blog/${post.id}`" class="text-link" :aria-label="`Leer ${post.title}`">Leer artículo <span aria-hidden="true">↗</span></NuxtLink>
  </article>
</template>
