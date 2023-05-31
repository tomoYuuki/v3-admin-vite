<template>
  <div class="my-test-hook-demo-container">
    <el-button @click="getData">点我请求</el-button>
  </div>
</template>

<script setup>
import { useFullscreenLoading } from "@/hooks/useFullscreenLoading"
import { getTemplesApi } from "@/api/content/temple"
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
const getData = async () => {
  const res = await useFullscreenLoading(getTemplesApi)({ adminSessionId: userStore.token })
  console.log(res)
}
</script>

<style lang="less" scoped></style>
