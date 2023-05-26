export interface LoginRequestData {
  loginName: string
  /** 密码 */
  password: string
  /** 验证码 */
  captcha: string
  /** 验证码id */
  captchaId: string
  /** 默认操作 */
  operate: "login"
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ adminSessionId: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
