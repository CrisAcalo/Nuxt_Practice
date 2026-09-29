export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['@/assets/css/main.css', 'katex/dist/katex.min.css'],
  app: {
    head: {
      title: 'BlogCris',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  modules: ['@vee-validate/nuxt', '@nuxt/content', '@nuxt/ui'],
  mdc: {
    remarkPlugins: { 'remark-math': {} },
    rehypePlugins: { 'rehype-katex': { options: { output: 'html' } } },
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})
