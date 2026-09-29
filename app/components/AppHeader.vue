<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" aria-label="BlogCris, inicio">
        <span class="brand-mark">B<span>.</span></span>
        <span>BlogCris</span>
      </NuxtLink>
      <nav class="main-nav" aria-label="Navegación principal">
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/blog">Artículos</NuxtLink>
        <NuxtLink to="/about">Acerca de</NuxtLink>
        <NuxtLink to="/guide">Guía</NuxtLink>
      </nav>
      <NuxtLink to="/contact" class="header-contact">Contacto <span aria-hidden="true">↗</span></NuxtLink>
    </div>
  </header>
</template>
