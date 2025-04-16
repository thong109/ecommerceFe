<template>
  <Loading :is-loading="isLoading" />
  <section class="shop-details">
    <div class="wrapper">
      <div class="product__details__pic">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="product__details__breadcrumb">
                <router-link to="/">Home</router-link>
                <router-link to="/shop">Shop</router-link>
                <span>{{ product.name }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5 col-md-9">
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
            <div class="col-lg-7 col-md-9">
              <div class="product__details__content">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="product__details__text">
                        <h4>{{ product.name }}</h4>
                        <div class="rating">
                          <i v-for="i in 5" :key="i"
                            :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
                          <span> - 5 Reviews</span>
                        </div>
                        <h3 v-if="product.discounted > 0">
                          {{ formatPrice(discounted(product.price, product.discounted)) }}
                          <span>{{ formatPrice(product.price) }}</span>
                        </h3>
                        <h3 v-else>${{ formatPrice(product.price) }}</h3>
                        <p>{{ product.short_desc }}</p>
                        <div class="product__details__option">
                          <div v-for="(attribute, index) in attributes" :key="index"
                            class="product__details__option__size">
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
                          <button type="button" @click="handleAddToCart(product.id)" class="primary-btn mb-0">add to
                            cart</button>
                        </div>
                        <div class="product__details__last__option">
                          <ul class="m-0 p-0">
                            <li><span>Quantity:</span> {{ product.quantity }}</li>
                            <li v-if="product.category"><span>Categories:</span> {{ product.category.name }}</li>
                            <li><span>Tag:</span> <router-link to="path" class="text-dark px-1"
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
                    <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Description</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Customer
                      Previews(5)</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Additional
                      information</a>
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
import discounted from '@/helpers/discounted'
import { formatPrice, getAvatarUrl } from '@/helpers/formatted'
import { useCartStore } from '@/stores/cart'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref({})
const attributes = ref([])
const isLoading = ref(false);
const selectedAttributes = reactive({})
const cartStore = useCartStore()
const qty = ref(1)

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

const handleAddToCart = (id) => {
  console.log(product);
  console.log(selectedAttributes);

  // if (Object.keys(selectedAttributes.value).length === product.attributes.length) {
  // Nếu tất cả thuộc tính đã được chọn, thêm vào giỏ hàng
  cartStore.addToCart(id, selectedAttributes, qty.value);
  // } else {
  // Nếu chưa chọn đầy đủ thuộc tính, thông báo cho người dùng
  // alert('Vui lòng chọn đầy đủ thuộc tính.');
  // }
}

onMounted(() => {
  loadProduct(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadProduct(newId)
})

</script>