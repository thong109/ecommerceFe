<template>
  <Loading :is-loading="isLoading" />
  <section class="shop-details">
    <div class="wrapper">
      <div class="product__details__pic">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="product__details__breadcrumb">
                <router-link to="/">Trang chủ</router-link>
                <router-link to="/shop">Của hàng</router-link>
                <span>{{ product.name }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5 col-md-12 mb-md-4">
              <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                  <div class="product__details__pic__item">
                    <img :src="getAvatarUrl(product.image)" alt="">
                  </div>
                </div>
                <div class="tab-pane" id="tabs-2" role="tabpanel">
                  <div class="product__details__pic__item">
                    <!-- <img src="img/shop-details/product-big-3.png" alt=""> -->
                  </div>
                </div>
                <div class="tab-pane" id="tabs-3" role="tabpanel">
                  <div class="product__details__pic__item">
                    <!-- <img src="img/shop-details/product-big.png" alt=""> -->
                  </div>
                </div>
                <div class="tab-pane" id="tabs-4" role="tabpanel">
                  <div class="product__details__pic__item">
                    <!-- <img src="img/shop-details/product-big-4.png" alt=""> -->
                    <a href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                      class="video-popup"><i class="fa fa-play"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7 col-md-12">
              <div class="product__details__content">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="product__details__text">
                        <h4>{{ product.name }}</h4>
                        <!-- <div class="rating mb-3">
                          <i v-for="i in 5" :key="i"
                            :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star text-black'"></i>
                          <span> - 5 Reviews</span>
                        </div> -->
                        <h3>{{ formatPrice(product.price) }}</h3>
                        <p class="mb-3">{{ product.short_desc }}</p>
                        <div class="product__details__option mb-3">
                          <div v-for="(attribute, index) in attributes" :key="index"
                            class="product__details__option__size mb-3">
                            <span>{{ attribute.attribute }}:</span>
                            <label v-for="(value, i) in attribute.values" :key="i" :for="`bg-${value}`">
                              {{ value }}
                              <input type="radio" :id="`bg-${value}`" :name="attribute.attribute" :value="value"
                                v-model="selectedAttributes[attribute.attribute]" :checked="i === 0" />
                            </label>
                          </div>
                        </div>
                        <div class="product__details__cart__option">
                          <div class="quantity">
                            <div class="pro-qty">
                              <input type="text" v-model="qty">
                            </div>
                          </div>
                          <button type="button" @click="handleAddToCart(product.id, product.price)"
                            :disabled="product.quantity === 0" class="primary-btn mb-0">Thêm vào giỏ</button>
                        </div>
                        <div class="product__details__last__option">
                          <ul class="m-0 p-0">
                            <li><span>Số lượng:</span> {{ product.quantity }}</li>
                            <li v-if="product.category"><span>Danh mục:</span> {{ product.category.name }}</li>
                            <li><span>Thẻ:</span> <router-link to="path" class="text-dark px-1"
                                v-for="(tag, index) in product.tag" :key="index">{{ tag }}</router-link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="product__details__tab">
                <ul class="nav nav-tabs w-100" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Nội dung</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tabs-5" role="tabpanel">
                    <div class="product__details__tab__content">
                      <div class="product__details__tab__content__item text-left">
                        <div v-html="product.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <RelatedProduct v-if="product.id" :id="product.id" />
</template>

<script setup>
import RelatedProduct from '@/components/home/RelatedProduct.vue'
import Loading from '@/components/Loading.vue'
import axiosConfig from '@/helpers/axiosConfig'
import { formatPrice, getAvatarUrl } from '@/helpers/formatted'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref({})
const attributes = ref([])
const isLoading = ref(false);
const selectedAttributes = reactive({})
const cartStore = useCartStore()
const authStore = useAuthStore()
const qty = ref(1)

onMounted(() => {
  loadProduct(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadProduct(newId)
})

const loadProduct = async (id) => {
  try {
    isLoading.value = true
    const res = await axiosConfig.get(`/product/${id}`)
    product.value = res.data.product
    attributes.value = res.data.attributes

    attributes.value.forEach(attr => {
      selectedAttributes[attr.attribute] = attr.values[0];
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ name: 'NotFound' })
    } else {
      console.error('Lỗi khi tải sản phẩm:', error)
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const handleAddToCart = async (id, price) => {
  if (!authStore.user) {
    return router.push({
      name: 'login'
    })
  }
  const requiredAttributes = attributes.value.map(attr => attr.attribute)
  const selectedKeys = Object.keys(selectedAttributes)

  const hasAllAttributes = requiredAttributes.every(attr => selectedKeys.includes(attr) && selectedAttributes[attr]);

  if (!hasAllAttributes) {
    alert('Vui lòng chọn đầy đủ thuộc tính trước khi thêm vào giỏ hàng.');
    return;
  }

  // Nếu đầy đủ thuộc tính thì thêm vào giỏ
  await cartStore.addToCart(id, { ...selectedAttributes }, Number(price), Number(qty.value));
}

</script>