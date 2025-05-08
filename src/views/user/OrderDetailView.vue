<template>
  <Loading :isLoading="isLoading" />
  <Breadcrumb :titles="['Chi tiết đơn hàng']" />
  <section class="spad">
    <div class="container">
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="text-sm">Thông tin người mua</h6>
          <hr>
          <div class="row align-items-center">
            <div class="col-sm-3">
              <p class="mb-0">Họ tên</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ order.shipping.shipping_name }}</p>
            </div>
          </div>
          <hr>
          <div class="row align-items-center">
            <div class="col-sm-3">
              <p class="mb-0">Email</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ order.shipping.shipping_email }}</p>
            </div>
          </div>
          <hr>
          <div class="row align-items-center">
            <div class="col-sm-3">
              <p class="mb-0">Số điện thoại</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ order.shipping.shipping_phone }}</p>
            </div>
          </div>
          <hr>
          <div class="row align-items-center">
            <div class="col-sm-3">
              <p class="mb-0">Địa chỉ</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ order.shipping.shipping_address }}</p>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="text-sm">Thông tin đơn hàng ( <b>Ngày đặt: </b>{{ formatDateTime(order.created_at) }} )</h6>
          <hr>
          <div>
            <div class="row">
              <div class="col-2">
                <label class="d-block small mb-0">Hình ảnh</label>
              </div>
              <div class="col-3">
                <label class="d-block small mb-0">Tên</label>
              </div>
              <div class="col-2">
                <label class="d-block small mb-0">Số lượng</label>
              </div>
              <div class="col-2">
                <label class="d-block small mb-0">Tổng tiền</label>
              </div>
              <div class="col-3">
                <label class="d-block small mb-0">Thông tin</label>
              </div>
            </div>
            <hr>
          </div>
          <div v-for="ord in order.order_details" :key="ord.id">
            <div class="row align-items-center position-relative m-0">
              <div v-if="!ord.product" class="position-absolute top-50 translate-middle-y z-3 h-100">
                <div class="mow"></div>
                <div class="z-3 position-relative d-flex align-items-center h-100">
                  <div class="bg-danger w-100" style="height:2px"></div>
                  <p class="text-danger m-0 w-100 text-center fw-bold">Sản phẩm đã ngừng bán</p>
                  <div class="bg-danger w-100" style="height:2px"></div>
                </div>
              </div>
              <div class="col-2">
                <img :src="getAvatarUrl(ord.product_image)" :alt="ord.product_name" width="100" height="100">
              </div>
              <div class="col-3">
                <router-link :to="`/product/${ord.product_id}`" target="_blank" rel="noopener">
                  <p class="small mb-0">{{ ord.product_name }}</p>
                </router-link>
              </div>
              <div class="col-2">
                <p class="small mb-0">{{ ord.product_sales_quantity }}</p>
              </div>
              <div class="col-2">
                <p class="small mb-0">{{ formatPrice(ord.product_price) }}</p>
              </div>
              <div class="col-3">
                <div v-for="(values, attrName) in ord.attributes" :key="attrName"
                  class="d-flex align-items-center justify-content-start">
                  <strong class="fw-bold small">{{ attrName }}:</strong>
                  <div class="ms-1">
                    {{ values }}
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div>
            <div class="row align-items-center">
              <div class="col-2">
                <label class="d-block small mb-0"><b>Tổng</b></label>
              </div>
              <div class="col-3"></div>
              <div class="col-2">
                <label class="d-block small mb-0">{{ order.order_total }}</label>
              </div>
              <div class="col-2">
                <label class="d-block small mb-0">
                  <span class="d-block" v-if="order.order_discount_type">
                    <b>Giảm giá:</b> {{ order.order_discount_type === "fixed"
                      ? "-" + formatPrice(order.order_discount)
                      : order.order_discount_type === "percent"
                        ? "-" + formatFixed(order.order_discount)
                        : "" }}
                  </span>
                  <span class="d-block">
                    <b>Tổng: </b>{{
                      formatPrice(
                        order.order_details?.reduce(
                          (sum, or) => {
                            if (order.order_discount_type === "fixed")
                              return sum + (or.product_price - order.order_discount)
                            if (order.order_discount_type === "percent")
                              return sum + (or.product_price - (or.product_price * order.order_discount) / 100)
                            return sum + or.product_price
                          },
                          0
                        )
                      )
                    }}
                  </span>
                </label>
              </div>
              <div class="col-3">
                <label class="d-block small mb-0">
                  {{ order.payment_method }}
                </label>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <ButtonBack />
    </div>
  </section>
</template>

<script setup>
import Breadcrumb from "@/components/home/Breadcrumb.vue";
import Loading from "@/components/Loading.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import axiosConfig from "@/helpers/axiosConfig"
import { useRoute } from "vue-router";
import { formatDateTime, formatFixed, formatPrice, getAvatarUrl } from "@/helpers/formatted";
import ButtonBack from "@/components/button/ButtonBack.vue";

const authStore = useAuthStore()
const isLoading = ref(false)
const router = useRoute()
const order = ref({
  shipping: {
    shipping_name: null,
    shipping_email: null,
    shipping_phone: null,
    shipping_address: null,
  },
  attributes: {
    attributes: null
  }
})

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await axiosConfig.get(`/user/order/${router.params.id}`)

    order.value = res.data
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
textarea {
  resize: none;
}

.mow {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &::before {
    content: "";
    position: absolute;
    top: -1rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(0 0 0 / 10%);
    width: 100%;
    height: calc(100% + 2rem);
    z-index: 0;
  }
}
</style>