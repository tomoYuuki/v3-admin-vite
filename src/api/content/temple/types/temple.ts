export interface getTemplesRequestParams {
  adminSessionId: string
  page?: number
  pageSize?: number
  tenantName?: string
}

export interface getTemplesData {
  id: number
  tenantName: string
  [key: string]: any // 还有很多其他字段，这里只列举了两个
}

export type getTemplesResponseData = ApiResponseData<{
  list: getTemplesData[]
  totalCount: number
}>
