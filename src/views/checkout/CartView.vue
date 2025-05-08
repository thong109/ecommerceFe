<template>
  <Loading :isLoading="cartStore.isLoading" />
  <section class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__text">
            <h4>Giỏ hàng</h4>
            <div class="breadcrumb__links">
              <router-link to="/">Trang chủ</router-link>
              <router-link to="/shop">Cửa hàng</router-link>
              <span>Giỏ hàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="shopping-cart spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="shopping__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th></th>
                </tr>
              </thead>
              <!-- <tbody v-if="cartStore.carts.length > 0">
                <tr v-for="cart in cartStore.carts" :key="cart.id">
                  <td class="product__cart__item col-6">
                    <div class="product__cart__item__pic">
                      <img :src="getAvatarUrl(cart.product.image)" width="100" height="100" :alt="cart.product.name">
                    </div>
                    <div class="product__cart__item__text">
                      <h6>{{ cart.product.name }}</h6>
                      <h5>{{ formatPrice(cart.product.price) }}</h5>
                      <small v-for="(value, key) in cart.attributes" :key="key" class="d-flex align-items-center small">
                        <b>{{ key }}:</b>
                        <p class="m-0 ms-2">{{ value }}</p>
                      </small>
                    </div>
                  </td>
                  <td class="quantity__item col-2">
                    <div class="quantity border p-1 rounded-2">
                      <div class="pro-qty-2">
                        <input type="number" class="w-100" v-model.number="cart.qty"
                          @keydown="(e) => onKeyDown(e, cart)" @keyup="updateQty" />
                      </div>
                    </div>
                  </td>
                  <td class="cart__price col-3">{{ formatPrice(cart.product.price * cart.qty) }}</td>
                  <td class="cart__close col-1">
                    <button class="border-0 bg-transparent" type="button" @click="deleteItem(cart.id)">
                      <i class="bi bi-x-lg bg-transparent"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" class="text-center p-5">Không có sản phẩm nào trong giỏ hàng</td>
                </tr>
              </tbody> -->
            </table>
            <div v-if="cartStore.carts.length > 0">
              <div
                v-for="cart in cartStore.carts"
                :key="cart.id"
                class="cartsItem mb-3 border-bottom"
              >
                <div
                  class="row align-items-center m-0 p-2"
                  :class="{ 'border border-danger': cart.invalid }"
                >
                  <!-- Hình + Tên sản phẩm + Thuộc tính -->
                  <div class="col-12 mb-3 mb-md-0 col-md-7 d-flex">
                    <div class="product__cart__item__pic">
                      <img
                        :src="getAvatarUrl(cart.product.image)"
                        width="100"
                        height="100"
                        :alt="cart.product.name"
                        class="me-3 rounded"
                      />
                    </div>
                    <div class="product__cart__item__text">
                      <h6>{{ cart.product.name }}</h6>
                      <h5 class="mb-2">
                        {{ formatPrice(cart.product.price) }}
                      </h5>
                      <div
                        v-for="(value, key) in cart.attributes"
                        :key="key"
                        class="d-flex align-items-center small text-dark"
                      >
                        <b>{{ key }}:</b>
                        <p class="m-0 ms-2">{{ value }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 col-md-2">
                    <div class="quantity border p-1 rounded-2">
                      <div class="pro-qty-2">
                        <input
                          type="number"
                          class="w-100 border-0"
                          v-model.number="cart.qty"
                          @keydown="(e) => onKeyDown(e, cart)"
                          @keyup="updateQty"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-7 col-md-2 overflow-hidden">
                    <p class="mb-0 fw-bold text-end text-md-start">
                      {{ formatPrice(cart.product.price * cart.qty) }}
                    </p>
                  </div>
                  <div class="col-2 col-md-1 text-end">
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteItem(cart.id)"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
                <p v-if="cart.invalid" class="text-danger small mb-3">
                  ⚠️ {{ cart.invalidMessage }}
                </p>
              </div>
            </div>
            <div v-else>
              <div class="text-center p-5 m-2">
                Không có sản phẩm nào trong giỏ hàng.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="continue__btn">
                <router-link to="/shop/">Quay lại</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="cart__discount">
            <h6>Mã giảm giá</h6>
            <form @submit.prevent="addCoupon(coupon)">
              <input
                type="text"
                class="text-dark"
                placeholder="Nhập mã..."
                v-model="coupon"
              />
              <button type="submit" class="mb-0" :disabled="coupon === ''">
                Dùng mã
              </button>
            </form>
          </div>
          <div class="cart__total rounded-2">
            <h6 class="fw-bold">Tổng giỏ hàng</h6>
            <ul class="p-0">
              <li v-if="discount.valid">
                Giảm giá :
                <span class="ms-1 text-dark">
                  <button
                    type="button"
                    @click="cartStore.deleteCoupon()"
                    class="border-0 mb-0 p-2 py-0"
                    title="Không dùng mã giảm giá"
                  >
                    <i class="bi bi-x-lg bg-transparent"></i>
                  </button>
                </span>
                <span v-if="discount.type === 'fixed'">{{
                  formatPrice(discount.discount)
                }}</span>
                <span v-else>{{ discount.discount }}%</span>
              </li>
              <li>
                Tổng giá:
                <span>{{
                  !discount.valid
                    ? formatPrice(cartStore.totalPrice)
                    : formatPrice(cartStore.discountedTotalPrice)
                }}</span>
              </li>
            </ul>
            <div class="gap-1 d-flex flex-column">
              <button
                :disabled="cartStore.carts.length <= 0"
                type="button"
                class="primary-btn mb-0 w-100"
                @click="checkCart"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import { formatPrice, getAvatarUrl } from "@/helpers/formatted";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const coupon = ref("");
const discount = computed(() => cartStore.discount);
const router = useRouter();
const errorMessage = ref("");

const updateQty = (e) => {
  console.log("Giá trị sau khi thay đổi:", e.target.value);
};

const onKeyDown = (e, cart) => {
  if (e.key === "ArrowUp") {
    console.log(e.target.value);

    cart.qty++;
    e.preventDefault();
  }

  if (e.key === "ArrowDown") {
    if (cart.qty > 1) {
      cart.qty--;
      e.preventDefault();
    }
  }
};

const addCoupon = async (couponCode) => {
  await cartStore.checkCoupon(couponCode);
  coupon.value = "";
};

const deleteItem = async (id) => {
  await cartStore.removeFromCart(id);
};

const checkCart = async (param) => {
  const result = await cartStore.checkCart();
  if (!result.valid) {
    cartStore.carts.forEach((item) => {
      const found = result.invalidItems.find(
        (i) => i.product_id === item.product_id
      );
      if (found) {
        item.invalid = true;
        item.invalidMessage = found.message;
      } else {
        item.invalid = false;
        item.invalidMessage = "";
      }
    });
  } else {
    router.push({
      name: "checkout",
    });
  }
  // if (res) {
  //   router.push({
  //     name: 'checkout'
  //   })
  // }

  // if (res.data.status === "error") {
  //   const invalidProductIds = res.data.invalid_items.map(
  //     (item) => item.product_id
  //   );

  //   // Ví dụ: highlight các item này
  //   cartItems.value.forEach((item) => {
  //     item.invalid = invalidProductIds.includes(item.product_id);
  //   });
  // }
};

watchEffect(async () => {
  if (authStore.user) {
    await cartStore.fetchCart();
    cartStore.restoreCouponFromStorage();
  }
});
</script>
