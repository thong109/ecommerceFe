<template>
  <div class="app sidebar-mini rtl  pace-done">
    <Header v-model="toogle" />
    <Aside v-model="toogle" />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Aside from '@/components/admin/Aside.vue';
import Header from '@/components/admin/Header.vue';
import { ref } from 'vue';

const toogle = ref(false)

</script>
