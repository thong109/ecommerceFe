<template>
  <template v-if="isLoader">
    <Loader1 />
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Loader1 from './layouts/loader/Loader1.vue';
import { ref, onMounted } from 'vue'

const isLoader = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoader.value = false
  }, 10000)
})
</script>