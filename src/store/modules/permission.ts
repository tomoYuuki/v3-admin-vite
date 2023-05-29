import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"
import { useUserStoreHook } from "@/store/modules/user"

// 主要思路： 1.通过拿asyncRoutes（router.ts里的） 与userMenus（业务接口里的菜单数据）做比较，先过滤一部分放到finalRoutes
// 2.通过比较第一级的对象，如果title一致，那么找到这项findItem,再去比较children，如果找不到这项，那么就把这项的hidden设置为true
// 3.把本页面的按钮权限加入具体页面的meta里
const filterAsyncRoutes = (asyncRoutes: RouteRecordRaw[]) => {
  // 先去默认加载所有的接口查到的userMenus
  const userStore = useUserStoreHook()
  const userMenus = userStore.menus

  const finalRoutes: RouteRecordRaw[] = []
  // 遍历userMenus，留下有权限的路由，指定到finalRoutes
  // 通过title来判断，第一级要不要留下
  for (const asyncRoute of asyncRoutes) {
    // 找到userMenus内匹配的route
    const findItem = userMenus.find((item) => item.title === asyncRoute?.meta?.title)
    if (findItem !== undefined) {
      // 处理子路由
      const currentUserMenuChildren = findItem.children
      const currentAsyncRouteChildren = asyncRoute.children

      currentAsyncRouteChildren?.map((item: any) => {
        const findItem = item.meta && currentUserMenuChildren.find((item2: any) => item2.title === item?.meta?.title)
        if (findItem == undefined) {
          item.meta.hidden = true
        } else {
          item.meta.buttons = findItem?.buttons || []
        }

        return { ...item, rights: findItem?.buttons }
      })

      finalRoutes.push(asyncRoute)
    }
  }

  return finalRoutes
}

// 过滤异步的路由方法2,递归的方式
// 通过比较

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    console.log(roles)
    let accessedRoutes
    if (!asyncRouteSettings.open) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes)
    }
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
