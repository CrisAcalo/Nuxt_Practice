import { createError } from 'h3'

const baseURL = process.env.DUMMYJSON_BASE_URL || 'https://dummyjson.com'

export async function fetchDummyJson<T>(path: string, query?: Record<string, string | number>): Promise<T> {
  try {
    return await $fetch<T>(`${baseURL}${path}`, { query, timeout: 8000 }) as T
  } catch (error) {
    const status = (error as { statusCode?: number; response?: { status?: number } }).statusCode
      || (error as { response?: { status?: number } }).response?.status

    throw createError({
      statusCode: status === 404 ? 404 : 502,
      message: status === 404 ? 'Artículo no encontrado' : 'No se pudo consultar el servicio de artículos',
    })
  }
}
