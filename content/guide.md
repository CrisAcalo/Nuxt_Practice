---
title: Guía de BlogCris
description: Cómo recorrer el prototipo y conocer las tecnologías que utiliza.
---

# Guía de BlogCris

Este prototipo reúne varias funciones habituales de una aplicación Nuxt. Puedes recorrerlo sin crear una cuenta.

## Explorar artículos

Visita [Artículos](/blog) para ver las publicaciones. El buscador filtra por texto y la paginación permite recorrer los resultados. Al abrir una tarjeta encontrarás el contenido, sus etiquetas y los comentarios disponibles.

Los artículos vienen de **DummyJSON**, una API pública de datos ficticios. Por eso los textos están en inglés y pueden cambiar fuera de este proyecto.

## Probar el formulario

En [Contacto](/contact) puedes validar un nombre, un correo y un mensaje. Al completarlo verás una confirmación. **El formulario no envía correos ni almacena datos.**

## ¿Qué hay detrás?

| Parte | Tecnología |
| --- | --- |
| Interfaz y rutas | Nuxt y Vue |
| API interna | Servidor Nitro de Nuxt |
| Diseño | Tailwind CSS y estilos propios |
| Contenido de esta guía | Nuxt Content |
| Formulario | VeeValidate |

Esta página también demuestra la representación de Markdown y fórmulas con KaTeX. Por ejemplo, la suma de los primeros $n$ números naturales es:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

Para conocer el propósito del sitio, visita [Acerca de](/about).
