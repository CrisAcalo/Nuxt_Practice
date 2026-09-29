import { createError, getRouterParam } from 'h3'
import type { BlogCommentsResponse } from '../../../../shared/types/blog'
import { fetchDummyJson } from '../../../utils/dummyjson'

export default defineEventHandler(async (event): Promise<BlogCommentsResponse> => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    throw createError({ statusCode: 400, message: 'ID de artículo inválido' })
  }

  return fetchDummyJson<BlogCommentsResponse>(`/posts/${id}/comments`)
})
