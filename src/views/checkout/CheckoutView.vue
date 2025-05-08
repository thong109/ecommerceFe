<template>
  <section class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__text">
            <h4>Thanh toán</h4>
            <div class="breadcrumb__links">
              <router-link to="/">Trang chủ</router-link>
              <router-link to="/shop">Cửa hàng</router-link>
              <span>Thanh toán</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="checkout spad">
    <div class="container">
      <div class="checkout__form">
        <form @submit.prevent="handleCheckoutCart" id="checkout">
          <div class="row">
            <div class="col-lg-7 col-md-6 border-top">
              <h6 class="checkout__title">Chi tiết hóa đơn</h6>
              <div class="checkout__input">
                <p>Họ tên<span>*</span></p>
                <input
                  type="text"
                  placeholder="Họ tên"
                  v-model="dataInfo.name"
                  @input="clearError('name')"
                />
                <div class="invalid-feedback">
                  <span v-if="errors.name" class="error-text">{{
                    errors.name[0]
                  }}</span>
                </div>
              </div>
              <div class="checkout__input">
                <p>Email<span>*</span></p>
                <input
                  type="text"
                  placeholder="Email"
                  class="checkout__input__add"
                  v-model="dataInfo.email"
                  @input="clearError('email')"
                />
                <div class="invalid-feedback">
                  <span v-if="errors.email" class="error-text">{{
                    errors.email[0]
                  }}</span>
                </div>
              </div>
              <div class="checkout__input">
                <p>Địa chỉ<span>*</span></p>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  class="checkout__input__add"
                  v-model="dataInfo.address"
                  @input="clearError('address')"
                />
                <div class="invalid-feedback">
                  <span v-if="errors.address" class="error-text">{{
                    errors.address[0]
                  }}</span>
                </div>
              </div>
              <div class="checkout__input">
                <p>Số điện thoại nhận hàng<span>*</span></p>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  v-model="dataInfo.phone"
                  @input="clearError('phone')"
                />
                <div class="invalid-feedback">
                  <span v-if="errors.phone" class="error-text">{{
                    errors.phone[0]
                  }}</span>
                </div>
              </div>
              <div class="checkout__input">
                <p>Ghi chú</p>
                <input
                  type="text"
                  placeholder="Ghi chú đơn hàng, loại hàng,...."
                  v-model="dataInfo.note"
                />
              </div>
            </div>
            <div class="col-lg-5 col-md-6">
              <div class="checkout__order">
                <h4 class="order__title">Đơn hàng của bạn</h4>
                <div class="checkout__order__products fw-bold">
                  Sản phẩm <span>Tổng</span>
                </div>
                <ul class="checkout__total__products p-0">
                  <li
                    v-for="(cart, index) in cartStore.carts"
                    :key="index"
                    class="row"
                  >
                    <div class="col-6">{{ cart.product.name }}</div>
                    <div class="col-2">
                      <b>x{{ cart.qty }}</b>
                    </div>
                    <div class="col-4">
                      <span>{{ formatPrice(cart.price) }}</span>
                    </div>
                  </li>
                </ul>
                <ul class="checkout__total__all">
                  <li v-if="discount.valid">
                    Giảm giá
                    <span v-if="discount.type === 'fixed'">{{
                      formatPrice(discount.discount)
                    }}</span>
                    <span v-else>{{ discount.discount }}%</span>
                  </li>
                  <li>
                    Tổng
                    <span>
                      {{
                        !discount.valid
                          ? formatPrice(cartStore.totalPrice)
                          : formatPrice(cartStore.discountedTotalPrice)
                      }}
                    </span>
                  </li>
                </ul>
                <div class="invalid-feedback">
                  <span v-if="errors.paymentMethod" class="error-text">{{
                    errors.paymentMethod[0]
                  }}</span>
                </div>
                <button type="submit" class="site-btn">Thanh toán COD</button>
                <button type="button" class="site-btn" @click="checkoutVnPay">
                  Thanh toán VNPay
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatPrice } from "@/helpers/formatted";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const cartStore = useCartStore();
const discount = computed(() => cartStore.discount);
const router = useRouter();
const dataInfo = ref({
  name: "",
  address: "",
  email: "",
  phone: "",
  note: "",
  paymentMethod: 1,
});
const errors = ref({});

const checkout = () => {
  let formData = new FormData();
  formData.append("name", dataInfo.value.name);
  formData.append("address", dataInfo.value.address);
  formData.append("email", dataInfo.value.email);
  formData.append("phone", dataInfo.value.phone);
  formData.append("note", dataInfo.value.note);
  formData.append("totalPrice", cartStore.totalPrice);
  formData.append("discounted", JSON.stringify(cartStore.discount));

  // Lấy thông tin giỏ hàng và thêm vào FormData
  cartStore.carts.forEach((item) => {
    formData.append("cartItems[]", JSON.stringify(item));
  });

  return formData;
};

const handleCheckoutCart = async () => {
  const formData = checkout();
  formData.append("paymentMethod", 1);

  const res = await cartStore.checkoutCart(formData);

  if (res && res.code === 422) {
    errors.value = res.errors;
  }

  if (res && res.code === 200) {
    const form = document.getElementById("checkout");
    form.reset();
    let navigated = false;
    toast.success(res.message, {
      autoClose: 1000,
      onClick: () => {
        if (!navigated) {
          navigated = true;
          router.push({ name: "home" });
        }
      },
      onClose: () => {
        if (!navigated) {
          navigated = true;
          router.push({ name: "home" });
        }
      },
    });
  }
};

const checkoutVnPay = async () => {
  const formData = checkout();
  formData.append("paymentMethod", 2);
  formData.append("return_url", window.location.origin + "/payment-return");

  const res = await cartStore.checkoutVnPay(formData);

  if (res && res.code === 422) {
    errors.value = res.errors;
  }

  if (res && res.data.code === 200) {
    window.location.href = res.data.payUrl;
  }
};

const clearError = (field) => {
  if (dataInfo.value[field]) {
    delete errors.value[field];
  }
};

watchEffect(async () => {
  if (authStore.user) {
    await cartStore.fetchCart();
    cartStore.restoreCouponFromStorage();
  }
});

onMounted(() => {
  if (cartStore.carts.length <= 0) {
    router.push({
      name: "home",
    });
  }
});
</script>
