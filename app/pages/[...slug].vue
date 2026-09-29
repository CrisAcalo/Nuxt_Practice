<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`content:${route.path}`, () =>
  queryCollection('content').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, message: 'Página no encontrada' })
}

useSeoMeta({
  title: `${page.value.title || 'Guía'} — BlogCris`,
  description: page.value.description || 'Guía de uso de BlogCris.',
})
</script>

<template>
  <div class="container guide-page">
    <NuxtLink to="/" class="back-link">← Volver al inicio</NuxtLink>
    <div class="guide-content">
      <ContentRenderer :value="page!" />
    </div>
  </div>
</template>
