<script setup lang="ts">
import type { BlogListResponse } from '../../../shared/types/blog'

const route = useRoute()
const page = computed(() => {
  const value = Number(route.query.page || 1)
  return Number.isSafeInteger(value) && value > 0 ? value : 1
})
const search = computed(() => typeof route.query.q === 'string' ? route.query.q : '')
const searchInput = ref(search.value)
watch(search, value => { searchInput.value = value })

const { data, status, error, refresh } = await useFetch<BlogListResponse>('/api/blogs', {
  query: computed(() => ({ page: page.value, limit: 9, q: search.value || undefined })),
})
const totalPages = computed(() => Math.max(1, Math.ceil((data.value?.total ?? 0) / 9)))

function goToPage(nextPage: number) {
  return navigateTo({ path: '/blog', query: { ...(search.value ? { q: search.value } : {}), page: nextPage > 1 ? nextPage : undefined } })
}

function submitSearch() {
  const q = searchInput.value.trim()
  return navigateTo({ path: '/blog', query: q ? { q } : {} })
}

useSeoMeta({
  title: 'Artículos — BlogCris',
  description: 'Explora y busca artículos en BlogCris.',
})
</script>

<template>
  <div>
    <BlogHeader />
    <section class="container blog-section" aria-label="Listado de artículos">
      <div class="blog-toolbar">
        <div class="results-caption">
          <span class="caption-dot" />
          <span v-if="data">{{ data.total }} {{ data.total === 1 ? 'artículo' : 'artículos' }}{{ search ? ` para “${search}”` : '' }}</span>
          <span v-else>Explora el archivo</span>
        </div>
        <form class="search-form" role="search" @submit.prevent="submitSearch">
          <label class="sr-only" for="blog-search">Buscar artículos</label>
          <input id="blog-search" v-model="searchInput" type="search" maxlength="100" placeholder="Buscar artículos…" />
          <button type="submit" aria-label="Buscar">Buscar <span aria-hidden="true">↗</span></button>
        </form>
      </div>

      <p v-if="status === 'pending'" class="status-message" role="status">Cargando artículos…</p>
      <div v-else-if="error" class="notice" role="alert">
        <h2>No pudimos cargar los artículos</h2>
        <p>El servicio puede estar temporalmente ocupado. Inténtalo otra vez.</p>
        <button class="button button-primary" type="button" @click="refresh()">Reintentar</button>
      </div>
      <div v-else-if="!data?.posts.length" class="empty-state">
        <span aria-hidden="true">✳</span>
        <h2>No encontramos artículos</h2>
        <p>Prueba con otra palabra o vuelve a explorar la colección completa.</p>
        <NuxtLink to="/blog" class="button button-primary">Ver todos los artículos</NuxtLink>
      </div>
      <template v-else>
        <BlogList :posts="data.posts" :start-index="data.skip" />
        <nav v-if="totalPages > 1" class="pagination" aria-label="Páginas de artículos">
          <button type="button" :disabled="page <= 1" @click="goToPage(page - 1)">← Anterior</button>
          <span>Página {{ page }} de {{ totalPages }}</span>
          <button type="button" :disabled="page >= totalPages" @click="goToPage(page + 1)">Siguiente →</button>
        </nav>
      </template>
    </section>
  </div>
</template>
