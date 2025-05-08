<template>
  <template v-if="isLoader">
    <Loader1 @loader-finished="isLoader = false" />
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<script setup>
import { RouterView } from "vue-router";
import Loader1 from "./layouts/loader/Loader1.vue";
import { onMounted, ref } from "vue";
import { useSettingsStore } from "./stores/settings";
const settingsStore = useSettingsStore();

onMounted(() => {
  if (settingsStore.settingsData?.theme_color) {
    document.documentElement.style.setProperty(
      "--theme-color",
      settingsStore.settingsData.theme_color
    );
  }
});

const isLoader = ref(false);
</script>

<style lang="scss">
:root {
  --theme-color: #111111;
}
</style>
