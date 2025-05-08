<template>
  <section class="hero">
    <Swiper
      v-if="settings.banners.length > 0"
      :modules="[Navigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      pagination
      navigation
      class="hero__slider"
    >
      <SwiperSlide v-for="(banner, index) in settings.banners" :key="index">
        <div
          class="hero__items relative bg-cover bg-center h-[500px] flex items-center"
        >
          <img
            :src="getAvatarUrl(banner.image)"
            alt=""
            class="position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100 object-fit-cover"
          />
          <div class="container text-white">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-md-8">
                <div class="hero__text space-y-4">
                  <h6 class="text-lg font-medium">{{ banner.label }}</h6>
                  <h2 class="text-3xl md:text-5xl font-bold">
                    {{ banner.title }}
                  </h2>
                  <p class="text-base md:text-lg text-dark">
                    {{ banner.description }}
                  </p>
                  <router-link to="/shop" class="primary-btn">
                    Shop now <span class="ml-2">&rarr;</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSettingsStore } from "@/stores/settings";
import { onMounted } from "vue";
import { getAvatarUrl } from "@/helpers/formatted";

const settingsStore = useSettingsStore();
const settings = settingsStore.settingsData;
const slides = [
  {
    title: "Fall - Winter Collections 2030",
    subtitle: "Summer Collection",
    desc: "A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.",
  },
  {
    title: "New Arrivals 2031",
    subtitle: "Spring Collection",
    desc: "Discover new trends and timeless pieces. Designed for comfort and style.",
  },
];

onMounted(async () => {
  await settingsStore.fetchSetting();
});
</script>
