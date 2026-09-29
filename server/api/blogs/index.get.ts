import { createError, getQuery } from 'h3'
import type { BlogListResponse } from '../../../shared/types/blog'
import { fetchDummyJson } from '../../utils/dummyjson'

export default defineEventHandler(async (event): Promise<BlogListResponse> => {
  const query = getQuery(event)
  const rawPage = query.page ?? '1'
  const rawLimit = query.limit ?? '9'
  const rawSearch = query.q ?? ''

  if (typeof rawPage !== 'string' || !/^[1-9]\d*$/.test(rawPage)
    || typeof rawLimit !== 'string' || !/^[1-9]\d*$/.test(rawLimit)
    || typeof rawSearch !== 'string' || rawSearch.length > 100) {
    throw createError({ statusCode: 400, message: 'Parámetros de búsqueda inválidos' })
  }

  const page = Number(rawPage)
  const limit = Number(rawLimit)
  if (!Number.isSafeInteger(page) || !Number.isSafeInteger(limit) || limit > 20
    || !Number.isSafeInteger((page - 1) * limit)) {
    throw createError({ statusCode: 400, message: 'Parámetros de búsqueda inválidos' })
  }

  const q = rawSearch.trim()
  return fetchDummyJson<BlogListResponse>(q ? '/posts/search' : '/posts', {
    limit,
    skip: (page - 1) * limit,
    ...(q ? { q } : {}),
  })
})
