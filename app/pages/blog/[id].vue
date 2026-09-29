<script setup lang="ts">
import type { BlogCommentsResponse, BlogPost } from '../../../shared/types/blog'

const route = useRoute()
const postId = computed(() => String(route.params.id))
const { data: post, status, error, refresh } = await useFetch<BlogPost>(() => `/api/blogs/${postId.value}`)
const { data: comments, status: commentsStatus, error: commentsError } = await useFetch<BlogCommentsResponse>(
  () => `/api/blogs/${postId.value}/comments`,
)

if (import.meta.server && (error.value?.statusCode === 404 || error.value?.statusCode === 400)) {
  setResponseStatus(404)
}

useSeoMeta({
  title: computed(() => post.value ? `${post.value.title} — BlogCris` : 'Artículo — BlogCris'),
  description: computed(() => post.value?.body.slice(0, 155) || 'Lee artículos en BlogCris.'),
})
</script>

<template>
  <div class="container article-page">
    <NuxtLink to="/blog" class="back-link">← Volver a los artículos</NuxtLink>

    <p v-if="status === 'pending'" class="status-message" role="status">Cargando artículo…</p>
    <div v-else-if="error?.statusCode === 404 || error?.statusCode === 400" class="empty-state">
      <span aria-hidden="true">✳</span>
      <h1>Artículo no encontrado</h1>
      <p>Este artículo no existe o la dirección no es válida.</p>
      <NuxtLink to="/blog" class="button button-primary">Explorar artículos</NuxtLink>
    </div>
    <div v-else-if="error" class="notice" role="alert">
      <h1>No pudimos cargar el artículo</h1>
      <p>Inténtalo de nuevo en unos momentos.</p>
      <button class="button button-primary" type="button" @click="refresh()">Reintentar</button>
    </div>
    <article v-else-if="post" class="article-layout">
      <header class="article-header">
        <p class="eyebrow"><span class="eyebrow-line" /> ARTÍCULO / {{ String(post.id).padStart(3, '0') }}</p>
        <h1>{{ post.title }}</h1>
        <div class="article-meta">
          <span>{{ post.views.toLocaleString('es') }} lecturas</span>
          <span aria-hidden="true">·</span>
          <span>{{ post.reactions.likes.toLocaleString('es') }} me gusta</span>
        </div>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="article-content">
        <p>{{ post.body }}</p>
      </div>

      <section class="comments-section" aria-labelledby="comments-title">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow"><span class="eyebrow-line" /> CONVERSACIÓN</p>
            <h2 id="comments-title">Comentarios <span v-if="comments">({{ comments.total }})</span></h2>
          </div>
        </div>
        <p v-if="commentsStatus === 'pending'" class="status-message" role="status">Cargando comentarios…</p>
        <p v-else-if="commentsError" class="muted">No pudimos cargar los comentarios.</p>
        <p v-else-if="!comments?.comments.length" class="muted">Todavía no hay comentarios.</p>
        <div v-else class="comments-list">
          <div v-for="comment in comments.comments" :key="comment.id" class="comment">
            <div class="comment-avatar" aria-hidden="true">{{ comment.user.fullName.charAt(0) }}</div>
            <div>
              <strong>{{ comment.user.fullName }}</strong>
              <span class="comment-user">@{{ comment.user.username }}</span>
              <p>{{ comment.body }}</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
