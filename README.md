# BlogCris

Prototipo de blog construido con Nuxt 4 y Vue 3. Los artículos y comentarios vienen de [DummyJSON](https://dummyjson.com/docs/posts) a través de rutas internas del servidor de Nuxt. La guía se publica con Nuxt Content.

## Requisitos e instalación

- Node.js 22.19 o superior compatible con Nuxt 4.
- npm.

```bash
npm install
npm run dev
```

La aplicación de desarrollo queda disponible en `http://localhost:3000`.

## Producción

```bash
npm run build
node .output/server/index.mjs
```

El blog requiere el servidor de Nuxt para atender `/api/blogs`. Esta configuración está pensada para un despliegue con Node, no para alojamiento de archivos estáticos.

## Rutas

| Ruta | Función |
| --- | --- |
| `/` | Portada y artículos recientes |
| `/blog` | Listado, búsqueda y paginación |
| `/blog/:id` | Artículo y comentarios |
| `/about` | Información del prototipo |
| `/contact` | Demostración de validación de formulario |
| `/guide` | Guía Markdown con una fórmula KaTeX |

La API interna expone `GET /api/blogs?page=1&limit=9&q=`, `GET /api/blogs/:id` y `GET /api/blogs/:id/comments`. El servidor valida los parámetros y convierte los errores del proveedor en respuestas HTTP apropiadas. Para pruebas locales puede cambiarse el proveedor con la variable `DUMMYJSON_BASE_URL`.

## Verificación

```bash
npm run typecheck
npm run test:e2e
npm run build
```

Las pruebas de navegador usan Playwright y un proveedor de datos local para ser reproducibles. Antes de ejecutarlas por primera vez, instala Chromium con `npx playwright install chromium`. Cubren API, navegación, búsqueda, paginación, detalle, comentarios, formulario, guía y anchos de pantalla de 375, 768 y 1280 píxeles.

## Límites del prototipo

Los artículos de DummyJSON son ficticios, breves y están en inglés. No incluyen imágenes ni se almacenan en este proyecto. El formulario de contacto valida y confirma la entrada, pero no envía correos ni guarda mensajes.

## Licencia

El código de este proyecto se distribuye bajo la [licencia MIT](LICENSE).
