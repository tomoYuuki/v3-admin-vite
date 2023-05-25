<template>
  <div>
    <el-input v-model="name" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

defineOptions({
  name: "Test"
})
const name = ref()
</script>

<style scoped></style>
