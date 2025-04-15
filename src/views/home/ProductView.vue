<template>
  <Loading :is-loading="isLoading" />
  <section class="shop-details">
    <div class="wrapper">
      <div class="product__details__pic">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="product__details__breadcrumb">
                <a href="./index.html">Home</a>
                <a href="./shop.html">Shop</a>
                <span>{{ product.name }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-3">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                    <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-1.png">
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                    <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-2.png">
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                    <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-3.png">
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                    <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-4.png">
                      <i class="fa fa-play"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-6 col-md-9">
              <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                  <div class="product__details__pic__item">
                    <img :src="product.image" alt="">
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
          </div>
        </div>
      </div>
      <div class="product__details__content">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <div class="product__details__text">
                <h4>{{ product.name }}</h4>
                <div class="rating">
                  <i v-for="i in 5" :key="i"
                    :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
                  <span> - 5 Reviews</span>
                </div>
                <h3 v-if="product.discounted > 0">${{ discounted(product.price,
                  product.discounted) }} <span>${{ product.price }}</span></h3>
                <h3 v-else>${{ product.price }}</h3>
                <p>{{ product.short_desc }}</p>
                <div class="product__details__option">
                  <div v-for="(attribute, index) in attributes" :key="index" class="product__details__option__size">
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
                  <button type="button" @click="handleAddToCart(product.id)" class="primary-btn">add to cart</button>
                </div>
                <div class="product__details__btns__option">
                  <a href="#"><i class="fa fa-heart"></i> add to wishlist</a>
                  <a href="#"><i class="fa fa-exchange"></i> Add To Compare</a>
                </div>
                <div class="product__details__last__option">
                  <h5><span>Guaranteed Safe Checkout</span></h5>
                  <!-- <img src="img/shop-details/details-payment.png" alt=""> -->
                  <ul>
                    <li><span>SKU:</span> 3812912</li>
                    <li v-if="product.category"><span>Categories:</span> {{ product.category.name }}</li>
                    <li><span>Tag:</span> <router-link to="path" class="text-dark" v-for="(tag, index) in product.tag"
                        :key="index">{{ tag + ',' }}</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="product__details__tab">
                <ul class="nav nav-tabs" role="tablist">
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
                      <div class="product__details__tab__content__item">
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