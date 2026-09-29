<script setup lang="ts">
import type { BlogPost } from '../../../shared/types/blog'

defineProps<{ posts: BlogPost[]; startIndex?: number }>()
</script>

<template>
  <div class="post-grid">
    <BlogItem v-for="(post, index) in posts" :key="post.id" :post="post" :index="(startIndex ?? 0) + index + 1" />
  </div>
</template>
