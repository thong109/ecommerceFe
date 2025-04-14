<template>
  <section class="related spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="related-title">Related Product</h3>
        </div>
      </div>
      <div class="row" v-if="relatedProducts.length <= 4">
        <div v-for="(product, index) in relatedProducts" :key="index" class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
          <div class="product__item">
            <div class="product__item__pic set-bg">
              <img :src="product.image"
                class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0 " :alt="product.name"
                loading="eager">
              <!-- <span class="label">New</span> -->
              <ul class="product__hover">
                <li><a href="#" class="bg-white"><i class="bi bi-heart text-black"></i></a></li>
                <li><a href="#" class="bg-white"><i class="bi bi-search text-black"></i></a></li>
              </ul>
            </div>
            <div class="product__item__text">
              <h6>
                <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
              </h6>
              <div class="rating">
                <i v-for="i in 5" :key="i"
                  :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
              </div>
              <h5 v-if="product.discounted > 0">{{ formatPrice(discounted(product.price, product.discounted)) }}
                <span>{{ formatPrice(product.price)
                }}</span>
              </h5>
              <h5 v-else>{{ formatPrice(product.price) }}</h5>
            </div>
          </div>
        </div>
      </div>
      <Swiper v-else :slides-per-view="4" :loop="true" :autoplay="{ delay: 5000 }" class="hero__slider">
        <SwiperSlide v-for="(product, index) in relatedProducts" :key="index"
          class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
          <div class="product__item">
            <div class="product__item__pic set-bg">
              <img :src="product.image"
                class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0 " :alt="product.name"
                loading="eager">
              <!-- <span class="label">New</span> -->
              <ul class="product__hover">
                <li><a href="#" class="bg-white"><i class="bi bi-heart text-black"></i></a></li>
                <li><a href="#" class="bg-white"><i class="bi bi-search text-black"></i></a></li>
              </ul>
            </div>
            <div class="product__item__text">
              <h6>
                <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
              </h6>
              <div class="rating">
                <i v-for="i in 5" :key="i"
                  :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
              </div>
              <h5 v-if="product.discounted > 0">{{ formatPrice(discounted(product.price, product.discounted)) }}
                <span>{{ formatPrice(product.price)
                }}</span>
              </h5>
              <h5 v-else>{{ formatPrice(product.price) }}</h5>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'
import { formatPrice } from '@/helpers/formatted'
import discounted from '@/helpers/discounted';
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { id } = defineProps({
  id: Number,
})

const relatedProducts = ref([]);

watch(() => id, async (newId) => {
  try {
    const res = await axiosConfig.get(`/products/related/${newId}`)
    relatedProducts.value = res.data.productsRelated

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // })
  } catch (error) {

  }
}, { immediate: true });
</script>