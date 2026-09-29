<script setup lang="ts">
useSeoMeta({
  title: 'Acerca de — BlogCris',
  description: 'Conoce el propósito y las tecnologías detrás del prototipo BlogCris.',
})
</script>

<template>
  <div class="container simple-page">
    <p class="eyebrow"><span class="eyebrow-line" /> ACERCA DEL PROYECTO</p>
    <h1>Un lugar para <em>aprender haciendo.</em></h1>
    <p class="lead">BlogCris es un prototipo de blog creado para practicar el desarrollo de una aplicación completa con Nuxt.</p>

    <div class="about-grid">
      <div class="about-panel about-panel-dark">
        <span class="panel-index">01 / LA IDEA</span>
        <h2>Explorar, construir y mejorar.</h2>
        <p>La experiencia reúne navegación, contenido Markdown, datos de una API externa, formularios y una interfaz adaptable. Cada sección sirve para practicar una pieza del desarrollo web.</p>
      </div>
      <div class="about-panel">
        <span class="panel-index">02 / LOS DATOS</span>
        <h2>Artículos de demostración.</h2>
        <p>Los artículos y comentarios provienen de DummyJSON. Son datos ficticios en inglés para probar el funcionamiento del blog; no representan publicaciones originales de este sitio.</p>
      </div>
    </div>

    <div class="about-next">
      <p>¿Quieres ver el prototipo en acción?</p>
      <NuxtLink to="/blog" class="button button-primary">Explorar los artículos <span aria-hidden="true">↗</span></NuxtLink>
    </div>
  </div>
</template>
