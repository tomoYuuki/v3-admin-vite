<template>
  <div class="index-container">
    <!-- 跳转至HomeAdd -->
    <button @click="navigationToAdd()">跳转至HomeAdd</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
console.log(route)
const navigationToAdd = () => {
  router.push({ name: "HomeAdd" })
}
</script>

<style lang="less" scoped></style>
