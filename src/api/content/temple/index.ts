import { request } from "@/utils/service"
import * as Temple from "./types/temple"
export const getTemplesApi = (params: Temple.getTemplesRequestParams) => {
  return request<Temple.getTemplesResponseData>({
    url: "/admin/tenant/query",
    method: "get",
    params
  })
}
