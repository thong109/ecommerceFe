<template>
  <Loading :isLoading="isLoading" />
  <Breadcrumb :titles="['Của hàng']" />
  <section class="shop spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="shop__sidebar">
            <div class="shop__sidebar__search">
              <form action="#">
                <input type="text" placeholder="Search...">
                <button type="submit"><span class="">
                    <i class="bi bi-search"></i>
                  </span></button>
              </form>
            </div>
            <div class="shop__sidebar__accordion">
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseOne">Danh mục</a>
                  </div>
                  <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__categories">
                        <ul class="nice-scroll p-0">
                          <li v-for="(category, index) in categoryStore.data" :key="index">
                            <button type="button" class="border-0 bg-transparent"
                              @click="getProductByData(category.id, 'category')">
                              {{ category.name }}
                              <span class="ml-2">({{ category.products ? category.products.length : 0 }})</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseTwo">Thương hiệu</a>
                  </div>
                  <div id="collapseTwo" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__brand">
                        <ul class="nice-scroll p-0">
                          <li v-for="(brand, index) in brandStore.data" :key="index">
                            <button type="button" class="border-0 bg-transparent"
                              @click="getProductByData(brand.id, 'brand')">
                              {{ brand.name }}
                              <span class="ml-2">({{ brand.products ? brand.products.length : 0 }})</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
                  </div>
                  <div id="collapseSix" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__tags">
                        <a href="#">Product</a>
                        <a href="#">Bags</a>
                        <a href="#">Shoes</a>
                        <a href="#">Fashio</a>
                        <a href="#">Clothing</a>
                        <a href="#">Hats</a>
                        <a href="#">Accessories</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="shop__product__option">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="shop__product__option__left">
                  <p>Hiển thị {{ visibleProducts.length }} trong số {{ totalProductCount }} kết quả</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="shop__product__option__right d-flex align-items-center">
                  <p style="flex: 0 0 auto;" class="mr-2">Sắp xếp theo:</p>
                  <select class="form-select" @change="handleSort">
                    <option value="low">Từ thấp đến cao</option>
                    <option value="high">Từ cao đến thấp</option>
                    <!-- <option value="rating">Đánh giá</option> -->
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-for="(product, index) in visibleProducts" :key="index" class="col-lg-4 col-md-6 col-sm-6 pb-4">
              <div
                class="product__item d-flex flex-column justify-content-between border rounded-3 shadow-sm p-3 h-100">
                <div class="product__item__pic d-block position-relative">
                  <img :src="getAvatarUrl(product.image)"
                    class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0 "
                    :alt="product.name" loading="eager">
                  <!-- <span v-if="product.discounted > 0" class="label text-white">{{ product.discounted }}%</span> -->
                  <ul class="product__hover">
                    <li>
                      <WishlistButton :product-id="product.id" />
                    </li>
                    <li>
                      <a href="#" class="bg-opacity-8 bg-dark-subtle border rounded-2">
                        <i class="bi bi-search text-dark"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="product__item__text">
                  <div class="d-block">
                    <h6>
                      <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
                    </h6>
                    <!-- <div class="rating">
                      <i v-for="i in 5" :key="i"
                        :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
                    </div> -->
                  </div>
                  <h5>{{ formatPrice(product.price) }}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4" v-if="visibleProducts.length < totalProductCount">
            <button class="primary-btn bg-transparent text-dark border-black" @click="loadMore" :disabled="isLoading">
              <span v-if="isLoading">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Đang tải...
              </span>
              <span v-else>
                Xem thêm
              </span>
            </button>
          </div>

          <div class="text-center mt-4" v-else>
            <p>Không còn sản phẩm nào để hiển thị</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Breadcrumb from '@/components/home/Breadcrumb.vue';
import { computed, onMounted, ref } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'
import { useCategoryStore } from '@/stores/category';
import { useBrandStore } from '@/stores/brand';
import { formatPrice, getAvatarUrl } from '@/helpers/formatted';
import Loading from '@/components/Loading.vue';
import { useAuthStore } from '@/stores/auth';
import WishlistButton from '@/components/button/WishlistButton.vue';

const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const authStore = useAuthStore()
const visibleProducts = ref([]);
const totalProductCount = ref(0);
const isLoading = ref(true);
const productsPerLoad = ref(6);
const currentPage = ref(1);
const sortOption = ref('low');
const getBy = ref({
  name: 'product',
  id: null
})

// ✅ Số sản phẩm hiện đang hiển thị
const currentLoadedCount = computed(() => visibleProducts.value.length);

// 🟦 Hàm load thêm sản phẩm (Xem thêm)
const loadMore = async () => {
  isLoading.value = true;

  try {
    const { data } = await axiosConfig.get('/products', {
      params: {
        page: currentPage.value,
        limit: productsPerLoad.value,
        sort: sortOption.value,
        ...(getBy.value?.name && getBy.value?.id
          ? { getBy: getBy.value.name, id: getBy.value.id }
          : {})
      }
    });

    if (data && Array.isArray(data.products)) {
      const newProducts = data.products.map(product => ({
        ...product,
        isWishlisted: authStore.wishlists.some(w => w.product_id === product.id)
      }));

      visibleProducts.value.push(...newProducts);
      totalProductCount.value = data.total;
      currentPage.value += 1;
    } else {
      console.warn("Dữ liệu không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Có lỗi khi tải sản phẩm:", error);
  } finally {
    isLoading.value = false;
  }
};
// 🟨 Hàm load lại đúng số lượng đã hiển thị nhưng theo sort mới
const loadUntilCount = async (targetCount) => {
  isLoading.value = true;
  visibleProducts.value = [];
  currentPage.value = 1;

  try {
    while (visibleProducts.value.length < targetCount) {
      const response = await axiosConfig.get(
        `/products?page=${currentPage.value}&limit=${productsPerLoad.value}&sort=${sortOption.value}&getBy=${getBy.value.name}&id=${getBy.value.id}`
      );

      const data = response.data;

      visibleProducts.value.push(...data.products);
      totalProductCount.value = data.total;
      currentPage.value += 1;

      if (visibleProducts.value.length >= data.total) break;
    }
  } catch (error) {
    console.error("Lỗi khi load sản phẩm khi sort:", error);
  } finally {
    isLoading.value = false;
  }
};

// 🟧 Khi chọn sort
const handleSort = async (e) => {
  sortOption.value = e.target.value;
  currentPage.value = 1;
  totalProductCount.value = 0;

  await loadUntilCount(currentLoadedCount.value); // Load lại đúng số đã hiện
};

// 🟩 Khi chọn theo danh mục
const getProductByData = async (id, type) => {
  getBy.value = {
    name: type,
    id: id
  };

  visibleProducts.value = [];
  totalProductCount.value = 0;
  currentPage.value = 1;

  await loadMore(); // Load lại từ đầu danh mục
};

// 🟦 Lúc đầu load danh mục và sản phẩm
onMounted(async () => {
  await categoryStore.fetchProductByCategory();
  await brandStore.fetchProductByBrand();
  await authStore.fetchWishlist()
  await loadMore();
});

</script>
