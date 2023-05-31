import { ElLoading } from "element-plus"

const defaultOptions = {
  lock: true,
  text: "加载中..."
}

// 原理其实很简单，就是把异步函数包装一下，然后在异步函数执行前打开 loading，执行后关闭 loading
export const useFullscreenLoading = (fn, options = {}) => {
  const loadingInstance = ElLoading.service({ ...defaultOptions, ...options })
  return async (...args) => {
    try {
      // 核心是调用一下外部传入的异步函数
      return await fn(...args)
    } finally {
      loadingInstance.close()
    }
  }
}
