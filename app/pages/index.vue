<script setup lang="ts">
import type { BlogListResponse } from '../../shared/types/blog'

const { data, status, error, refresh } = await useFetch<BlogListResponse>('/api/blogs', {
  query: { limit: 3, page: 1 },
})

useSeoMeta({
  title: 'BlogCris — ideas para seguir leyendo',
  description: 'Explora artículos, ideas y una pequeña guía de Nuxt en BlogCris.',
})
</script>

<template>
  <div>
    <section class="hero container">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-line" /> UN ESPACIO PARA DESCUBRIR</p>
        <h1>Las buenas ideas empiezan con <em>curiosidad.</em></h1>
        <p>Explora una colección de historias, temas y perspectivas. Un pequeño laboratorio editorial hecho con Nuxt.</p>
        <div class="hero-actions">
          <NuxtLink to="/blog" class="button button-primary">Explorar artículos <span aria-hidden="true">↗</span></NuxtLink>
          <NuxtLink to="/about" class="text-link">Conoce el proyecto <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <span class="art-label">EDICIÓN / 001</span>
        <div class="art-circle art-circle-one" />
        <div class="art-circle art-circle-two" />
        <div class="art-swoosh">B</div>
        <span class="art-bottom">IDEAS QUE CONECTAN</span>
      </div>
    </section>

    <section class="section container" aria-labelledby="recent-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span class="eyebrow-line" /> LECTURAS RECIENTES</p>
          <h2 id="recent-title">Para empezar a <em>leer.</em></h2>
        </div>
        <NuxtLink to="/blog" class="text-link">Ver todos los artículos <span aria-hidden="true">↗</span></NuxtLink>
      </div>
      <p v-if="status === 'pending'" class="status-message" role="status">Cargando artículos…</p>
      <div v-else-if="error" class="notice" role="alert">
        <p>No pudimos cargar los artículos en este momento.</p>
        <button class="text-link" type="button" @click="refresh()">Intentar de nuevo →</button>
      </div>
      <BlogList v-else-if="data?.posts.length" :posts="data.posts" />
      <p v-else class="status-message">Todavía no hay artículos disponibles.</p>
    </section>

    <section class="container callout">
      <div>
        <p class="eyebrow">UN PROYECTO PARA APRENDER</p>
        <h2>Detrás de cada página hay <em>algo nuevo.</em></h2>
      </div>
      <NuxtLink to="/guide" class="button button-light">Explorar la guía <span aria-hidden="true">↗</span></NuxtLink>
    </section>
  </div>
</template>
