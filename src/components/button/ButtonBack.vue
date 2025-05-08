<template>
  <button class="primary-btn text-dark bg-transparent mb-0" type="button" @click="goBack">Quay lại</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>