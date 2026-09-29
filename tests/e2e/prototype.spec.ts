import { expect, test, type Page } from '@playwright/test'

async function openPage(page: Page, path: string) {
  await page.goto(path)
  await page.waitForFunction(() => Boolean((document.querySelector('#__nuxt') as HTMLElement & { __vue_app__?: unknown })?.__vue_app__))
}

test('API interna: lista, búsqueda, detalle y validación', async ({ request }) => {
  const list = await request.get('/api/blogs?limit=9&page=2')
  expect(list.ok()).toBeTruthy()
  const listData = await list.json()
  expect(listData.total).toBe(24)
  expect(listData.posts[0].id).toBe(10)

  const search = await request.get('/api/blogs?q=love')
  expect((await search.json()).posts.map((post: { id: number }) => post.id)).toEqual([2])

  const detail = await request.get('/api/blogs/1')
  expect((await detail.json()).title).toBe('A first story')
  expect((await request.get('/api/blogs/1/comments')).ok()).toBeTruthy()
  expect((await request.get('/api/blogs/999')).status()).toBe(404)
  expect((await request.get('/api/blogs?page=0')).status()).toBe(400)
  expect((await request.get('/api/blogs/abc')).status()).toBe(400)
  expect((await request.get('/api/blogs?q=trigger-502')).status()).toBe(502)
})

test('recorrido: portada, listado, búsqueda, detalle y regreso', async ({ page }) => {
  await openPage(page, '/')
  await expect(page.getByRole('heading', { name: /Las buenas ideas/ })).toBeVisible()
  await page.getByRole('link', { name: /Explorar artículos/ }).first().click()
  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.getByRole('heading', { name: 'A first story' })).toBeVisible()

  await page.getByRole('searchbox', { name: 'Buscar artículos' }).fill('love')
  await page.getByRole('button', { name: 'Buscar' }).click()
  await expect(page).toHaveURL(/q=love/)
  await expect(page.getByRole('heading', { name: 'Love in testing' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A first story' })).toHaveCount(0)
  await page.getByRole('link', { name: 'Leer Love in testing' }).click()
  await expect(page).toHaveURL(/\/blog\/2$/)
  await expect(page.getByText('This is the complete body of article 2.')).toBeVisible()
  await page.getByRole('link', { name: /Volver a los artículos/ }).click()
  await expect(page).toHaveURL(/\/blog$/)
})

test('paginación y estados vacíos', async ({ page }) => {
  await openPage(page, '/blog')
  await page.getByRole('button', { name: 'Siguiente →' }).click()
  await expect(page).toHaveURL(/page=2/)
  await expect(page.getByRole('heading', { name: 'Story number 10' })).toBeVisible()

  await page.getByRole('searchbox', { name: 'Buscar artículos' }).fill('no-match-at-all')
  await page.getByRole('button', { name: 'Buscar' }).click()
  await expect(page.getByRole('heading', { name: 'No encontramos artículos' })).toBeVisible()
  await page.getByRole('link', { name: 'Ver todos los artículos' }).click()
  await expect(page.getByRole('heading', { name: 'A first story' })).toBeVisible()
})

test('detalle, comentarios y rutas inexistentes', async ({ page }) => {
  await openPage(page, '/blog/1')
  await expect(page.getByRole('heading', { name: 'A first story' })).toBeVisible()
  await expect(page.getByText('A thoughtful comment.')).toBeVisible()
  await openPage(page, '/blog/999')
  await expect(page.getByRole('heading', { name: 'Artículo no encontrado' })).toBeVisible()
  await openPage(page, '/ruta-que-no-existe')
  await expect(page.getByRole('heading', { name: 'Esta página se perdió por el camino.' })).toBeVisible()
})

test('fallo del proveedor muestra un estado recuperable', async ({ page }) => {
  await openPage(page, '/blog?q=trigger-502')
  await expect(page.getByRole('heading', { name: 'No pudimos cargar los artículos' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible()
})

test('formulario: validación y confirmación sin envío', async ({ page }) => {
  await openPage(page, '/contact')
  await page.getByRole('button', { name: /Validar mensaje/ }).click()
  await expect(page.getByText('Este campo es obligatorio.')).toHaveCount(3)
  await page.getByLabel('Nombre').fill('Cris')
  await page.getByLabel('Correo electrónico').fill('correo-invalido')
  await page.getByLabel('Mensaje').fill('corto')
  await page.getByRole('button', { name: /Validar mensaje/ }).click()
  await expect(page.getByText('Ingresa un correo válido.')).toBeVisible()
  await expect(page.getByText('Escribe al menos 10 caracteres.')).toBeVisible()
  await page.getByLabel('Correo electrónico').fill('cris@ejemplo.com')
  await page.getByLabel('Correo electrónico').blur()
  await page.getByLabel('Mensaje').fill('Un mensaje de prueba completo.')
  await page.getByLabel('Mensaje').blur()
  await expect(page.locator('.field-error')).toHaveCount(0)
  await page.getByRole('button', { name: /Validar mensaje/ }).click()
  await expect(page.getByRole('heading', { name: 'Formulario completado' })).toBeVisible()
  await expect(page.getByText('el mensaje no se envió')).toBeVisible()
})

test('guía Markdown y navegación', async ({ page }) => {
  await openPage(page, '/guide')
  await expect(page.getByRole('heading', { name: 'Guía de BlogCris' })).toBeVisible()
  await expect(page.locator('.katex').first()).toBeVisible()
  await page.getByRole('link', { name: 'Acerca de', exact: true }).last().click()
  await expect(page.getByRole('heading', { name: /Un lugar para/ })).toBeVisible()
})

test('interfaz adaptable sin desplazamiento horizontal', async ({ page }, testInfo) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 820 })
    await openPage(page, '/')
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
    await page.screenshot({ path: testInfo.outputPath(`inicio-${width}.png`), fullPage: true })
    await openPage(page, '/blog')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
  }
})
