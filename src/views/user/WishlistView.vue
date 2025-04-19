<template>
  <Loading :isLoading="authStore.isLoading" />
  <section class="shop spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="shop__product__option">
            <div class="row">
              <div class="col-lg-8 col-md-6 col-sm-6">
                <div class="shop__product__option__left">
                  <p>Hiển thị {{ filteredWishlists.length }} kết quả</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="shop__product__option__right d-flex align-items-center">
                  <input type="search" v-model="keyword" class="form-control h-50 p-2" placeholder="Tìm kiếm..."
                    @input="searchData">
                </div>
              </div>
            </div>
          </div>
          <div class="d-block">
            <div v-if="filteredWishlists.length > 0" class="row">
              <div ref="items" v-for="(wishlist, index) in filteredWishlists" :key="index"
                class="col-lg-3 col-md-6 col-sm-6 pb-4 wishlist-item">
                <div
                  class="product__item d-flex flex-column justify-content-between border rounded-3 shadow-sm p-3 h-100">
                  <div class="product__item__pic d-block position-relative">
                    <img :src="getAvatarUrl(wishlist.product?.image)"
                      class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0 "
                      :alt="wishlist.product?.name" loading="eager">
                    <!-- <span v-if="product.discounted > 0" class="label text-white">{{ product.discounted }}%</span> -->
                    <ul class="product__hover">
                      <li>
                        <WishlistButton :product-id="wishlist.product_id" />
                      </li>
                      <li>
                        <a href="#" class="bg-opacity-8 bg-dark-subtle border rounded-2">
                          <i class="bi bi-search text-white"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="product__item__text">
                    <div class="d-block">
                      <h6>
                        <router-link :to="`/product/${wishlist.product_id}`">{{ wishlist.product?.name }}</router-link>
                      </h6>
                      <div class="rating">
                        <i v-for="i in 5" :key="i"
                          :class="i <= wishlist.product?.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
                      </div>
                    </div>
                    <h5>{{ formatPrice(wishlist.product?.price) }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-center mb-0 p-5">Không có sản phẩm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import WishlistButton from '@/components/button/WishlistButton.vue';
import Loading from '@/components/Loading.vue';
import { formatPrice, getAvatarUrl } from '@/helpers/formatted';
import { useAuthStore } from '@/stores/auth';
import { computed, nextTick, ref, watch } from 'vue';
import gsap from 'gsap'

const authStore = useAuthStore()
const keyword = ref('')
const items = ref([])

const filteredWishlists = computed(() => {
  return authStore.wishlists.filter(w =>
    w.product.name.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

watch(filteredWishlists, async () => {
  await nextTick() // đợi DOM render xong

  // Đảm bảo có phần tử để animate
  if (!items.value || items.value.length === 0) return

  gsap.fromTo(
    items.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    }
  )
})

</script>

<style scoped>
.search-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.wishlist-item {
  margin: 0.3rem 0;
  padding: 0.5rem;
}
</style>