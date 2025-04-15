<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';
</script>
