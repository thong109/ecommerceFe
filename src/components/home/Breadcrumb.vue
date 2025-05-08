<template>
  <section class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__text">
            <div class="breadcrumb__links">
              <router-link to="/">Trang chủ</router-link>
              <template v-for="(title, index) in titles" :key="index">
                <router-link v-if="title.text" :to="title.url">{{ title.text }}</router-link>
                <span v-else>{{ title }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { titles } = defineProps({
  titles: Array,
})
</script>