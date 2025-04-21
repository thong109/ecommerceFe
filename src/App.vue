<template>
  <template v-if="isLoader">
    <Loader1 @loader-finished="isLoader = false" />
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Loader1 from './layouts/loader/Loader1.vue';
import { ref } from 'vue'

const isLoader = ref(false)


</script>