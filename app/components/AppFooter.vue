<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <NuxtLink to="/" class="footer-brand">BlogCris<span>.</span></NuxtLink>
        <p>Un espacio para explorar ideas y practicar con Nuxt.</p>
      </div>
      <div class="footer-links">
        <NuxtLink to="/blog">Artículos</NuxtLink>
        <NuxtLink to="/guide">Guía</NuxtLink>
        <NuxtLink to="/contact">Contacto</NuxtLink>
      </div>
      <small>© {{ new Date().getFullYear() }} BlogCris</small>
    </div>
  </footer>
</template>
