<template>
  <section class="hero">
    <Swiper :modules="[Navigation]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 5000 }" pagination navigation
      class="hero__slider">
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="hero__items relative bg-cover bg-center h-[500px] flex items-center">
          <img :src="`/src/assets/hero/hero-${index + 1}.jpg`" alt=""
            class="position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100 object-fit-cover">
          <div class="container text-white">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-md-8">
                <div class="hero__text space-y-4">
                  <h6 class="text-lg font-medium">{{ slide.subtitle }}</h6>
                  <h2 class="text-3xl md:text-5xl font-bold">{{ slide.title }}</h2>
                  <p class="text-base md:text-lg text-dark">{{ slide.desc }}</p>
                  <a href="#" class="primary-btn">
                    Shop now <span class="ml-2">&rarr;</span>
                  </a>
                  <div class="hero__social flex gap-4 mt-4 text-white text-xl">
                    <a href="#"><i class="bi bi-facebook"></i></a>
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-pinterest"></i></a>
                    <a href="#"><i class="bi bi-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  <section class="special_offer_area py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="special_offer_item position-relative">
            <img class="img-fluid" src="https://preview.colorlib.com/theme/persuit/img/feature-add/special-offer-1.jpg"
              alt="">
            <div class="p-4 hover_text h-100 d-flex flex-column justify-content-between">
              <div class="content">
                <h5 class="mb-0 pb-0">Young Couple</h5>
              </div>
              <div class="d-flex justify-content-center">
                <a class="primary-btn" href="#">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="special_offer_item position-relative">
            <img class="img-fluid" src="https://preview.colorlib.com/theme/persuit/img/feature-add/special-offer-2.jpg"
              alt="">
            <div class="p-4 hover_text h-100 d-flex flex-column justify-content-between">
              <div class="content">
                <h5 class="mb-0 pb-0">girls bag</h5>
              </div>
              <div class="d-flex justify-content-center">
                <a class="primary-btn" href="#">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    title: 'Fall - Winter Collections 2030',
    subtitle: 'Summer Collection',
    desc: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.'
  },
  {
    title: 'New Arrivals 2031',
    subtitle: 'Spring Collection',
    desc: 'Discover new trends and timeless pieces. Designed for comfort and style.'
  }
]
</script>