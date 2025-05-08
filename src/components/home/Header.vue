<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="row align-items-center d-md-block d-lg-flex">
          <div class="col-lg-6 col-md-12 text-md-center">
            <div class="header__top__left text-left">
              <p>{{ settingsStore.settingsData.notify }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 text-md-center">
            <div
              class="header__top__right d-md-flex d-lg-block justify-content-center"
            >
              <div
                class="header__top__links"
                v-if="authStore.user && !authStore.isLoadHeader"
              >
                <button @click="logout" type="button" class="mb-0">
                  Đăng xuất
                </button>
                <router-link to="/user">Tài khoản</router-link>
                <router-link
                  v-if="Number(authStore.user.is_admin) === 1"
                  to="/admin/dashboard"
                  >Quản lý</router-link
                >
              </div>
              <div class="header__top__links" v-else>
                <router-link to="/login">Đăng nhập</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-12">
          <div class="header__logo text-md-center pb-md-0">
            <router-link to="/">
              <img
                src="https://preview.colorlib.com/theme/malefashion/img/logo.png"
                alt=""
              />
            </router-link>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <nav class="header__menu mobile-menu pb-md-0">
            <ul class="m-0 p-0">
              <li class="active">
                <router-link to="/">Trang chủ</router-link>
              </li>
              <li><router-link to="/shop">Cửa hàng</router-link></li>
              <!-- <li><router-link to="/page">Pages</router-link>
                <ul class="dropdown">
                  <li><router-link to="./about.html">About Us</router-link></li>
                  <li><router-link to="./shop-details.html">Shop Details</router-link></li>
                  <li><router-link to="./shopping-cart.html">Shopping Cart</router-link></li>
                  <li><router-link to="./checkout.html">Check Out</router-link></li>
                  <li><router-link to="./blog-details.html">Blog Details</router-link></li>
                </ul>
              </li> -->
              <!-- <li><router-link to="blog">Bài viết</router-link></li> -->
              <!-- <li><router-link to="./contact.html">Liên hệ</router-link></li> -->
            </ul>
          </nav>
        </div>
        <div class="col-lg-3 col-md-12">
          <div
            class="header__nav__option d-flex align-items-center justify-content-md-center"
          >
            <router-link
              to="/user/wishlists"
              class="d-flex align-items-center me-md-4"
            >
              <i class="bi bi-heart text-black"></i>
              <span>
                <span class="fw-semibold wishlist">Yêu thích</span>
                <span v-if="authStore" class="d-block mt-n1 text-black-50"
                  >{{ authStore.wishlists.length }} sản phẩm</span
                >
                <span v-else class="d-block mt-n1 text-black-50"
                  >0 sản phẩm</span
                >
              </span>
            </router-link>
            <router-link to="/carts/" class="d-flex align-items-center">
              <i class="bi bi-bag text-black"></i>
              <span>
                <span v-if="cartStore" class="fw-semibold wishlist"
                  >Giỏ hàng ({{ total }})</span
                >
                <span v-else class="fw-semibold wishlist">Giỏ hàng (0)</span>
                <span class="d-block mt-n1 text-black-50">{{
                  formatPrice(totalPrice)
                }}</span>
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="canvas__open"><i class="bi bi-list"></i></div>
    </div>
  </header>
</template>
<script setup>
import { formatPrice } from "@/helpers/formatted";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const total = computed(() => cartStore.totalQty);
const totalPrice = computed(() => cartStore.totalPrice);
const settingsStore = useSettingsStore();

const logout = () => {
  authStore.logout(router);
};
</script>
