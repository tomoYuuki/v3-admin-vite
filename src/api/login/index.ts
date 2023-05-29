import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "admin/verify/getRandomCode",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(params: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "admin/verify",
    method: "post",
    params
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "users/info",
    method: "get"
  })
}

/** 获取用户菜单 */
export function getUserMenuApi(params: Login.MenuRequestData) {
  return request<Login.UserMenuResponseData>({
    url: "admin/auth",
    method: "get",
    params
  })
}
