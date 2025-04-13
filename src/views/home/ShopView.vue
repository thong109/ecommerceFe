<template>
  <Breadcrumb :titles="['Shop']" />
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
                    <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                  </div>
                  <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__categories">
                        <ul class="nice-scroll p-0">
                          <li v-for="(category, index) in categoryStore.data" :key="index">
                            <button type="button" class="border-0 bg-transparent"
                              @click="getProductByData(category.id, 'category')">
                              {{ category.name }}
                              <span class="ml-2">({{ category.products.length }})</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
                  </div>
                  <div id="collapseTwo" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__brand">
                        <ul class="nice-scroll p-0">
                          <li v-for="(brand, index) in brandStore.data" :key="index">
                            <button type="button" class="border-0 bg-transparent"
                              @click="getProductByData(brand.id, 'brand')">
                              {{ brand.name }}
                              <span class="ml-2">({{ brand.products.length }})</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                  </div>
                  <div id="collapseThree" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__price">
                        <ul>
                          <li><a href="#">$0.00 - $50.00</a></li>
                          <li><a href="#">$50.00 - $100.00</a></li>
                          <li><a href="#">$100.00 - $150.00</a></li>
                          <li><a href="#">$150.00 - $200.00</a></li>
                          <li><a href="#">$200.00 - $250.00</a></li>
                          <li><a href="#">250.00+</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                  </div>
                  <div id="collapseFour" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__size">
                        <label for="xs">xs
                          <input type="radio" id="xs">
                        </label>
                        <label for="sm">s
                          <input type="radio" id="sm">
                        </label>
                        <label for="md">m
                          <input type="radio" id="md">
                        </label>
                        <label for="xl">xl
                          <input type="radio" id="xl">
                        </label>
                        <label for="2xl">2xl
                          <input type="radio" id="2xl">
                        </label>
                        <label for="xxl">xxl
                          <input type="radio" id="xxl">
                        </label>
                        <label for="3xl">3xl
                          <input type="radio" id="3xl">
                        </label>
                        <label for="4xl">4xl
                          <input type="radio" id="4xl">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-heading">
                    <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                  </div>
                  <div id="collapseFive" class="collapse show" data-parent="#accordionExample">
                    <div class="card-body">
                      <div class="shop__sidebar__color">
                        <label class="c-1" for="sp-1">
                          <input type="radio" id="sp-1">
                        </label>
                        <label class="c-2" for="sp-2">
                          <input type="radio" id="sp-2">
                        </label>
                        <label class="c-3" for="sp-3">
                          <input type="radio" id="sp-3">
                        </label>
                        <label class="c-4" for="sp-4">
                          <input type="radio" id="sp-4">
                        </label>
                        <label class="c-5" for="sp-5">
                          <input type="radio" id="sp-5">
                        </label>
                        <label class="c-6" for="sp-6">
                          <input type="radio" id="sp-6">
                        </label>
                        <label class="c-7" for="sp-7">
                          <input type="radio" id="sp-7">
                        </label>
                        <label class="c-8" for="sp-8">
                          <input type="radio" id="sp-8">
                        </label>
                        <label class="c-9" for="sp-9">
                          <input type="radio" id="sp-9">
                        </label>
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
                  <p>Showing {{ visibleProducts.length }} of {{ totalProductCount }} results</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="shop__product__option__right d-flex align-items-center">
                  <p style="flex: 0 0 auto;" class="mr-2">Sort by Price:</p>
                  <select class="form-select" @change="handleSort">
                    <option value="low">Từ thấp đến cao</option>
                    <option value="high">Từ cao đến thấp</option>
                    <option value="rating">Đánh giá</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-for="(product, index) in visibleProducts" :key="index" class="col-lg-4 col-md-6 col-sm-6">
              <div class="product__item">
                <div class="product__item__pic d-block position-relative">
                  <img :src="product.image"
                    class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0 "
                    :alt="product.name" loading="eager">
                  <ul class="product__hover">
                    <li><a href="#" class="bg-white"><i class="bi bi-heart text-black"></i></a></li>
                    <li><a href="#" class="bg-white"><i class="bi bi-search text-black"></i></a></li>
                  </ul>
                </div>
                <div class="product__item__text">
                  <h6>
                    <router-link to="path">{{ product.name }}</router-link>
                  </h6>
                  <div class="rating">
                    <i v-for="i in 5" :key="i"
                      :class="i <= product.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star'"></i>
                  </div>
                  <h5>${{ product.price }}</h5>
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
          <!-- <div class="row">
            <div class="col-lg-12">
              <div class="product__pagination">
                <a class="active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <span>...</span>
                <a href="#">21</a>
              </div>
            </div>
          </div> -->
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
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()

const visibleProducts = ref([]);
const totalProductCount = ref(0);
const isLoading = ref(false);
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
    const response = await axiosConfig.get(
      `/products?page=${currentPage.value}&limit=${productsPerLoad.value}&sort=${sortOption.value}&getBy=${getBy.value.name}&id=${getBy.value.id}`
    );

    const data = response.data;

    visibleProducts.value.push(...data.products);
    totalProductCount.value = data.total;
    currentPage.value += 1;
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
  await categoryStore.fetchCategories();
  await brandStore.fetchBrands();
  await loadMore();
});

</script>
