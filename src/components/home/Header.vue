<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-7">
            <div class="header__top__left">
              <p>Free shipping, 30-day return or refund guarantee.</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-5">
            <div class="header__top__right">
              <div class="header__top__links" v-if="authStore.token">
                <button @click="logout" type="button">Logout</button>
                <router-link to="/user">Profile</router-link>
                <router-link to="#">FAQs</router-link>
              </div>
              <div class="header__top__links" v-else>
                <router-link to="/login">Sign in</router-link>
                <router-link to="#">FAQs</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3">
          <div class="header__logo">
            <router-link to="/">
              <img src="https://preview.colorlib.com/theme/malefashion/img/logo.png" alt="">
            </router-link>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <nav class="header__menu mobile-menu">
            <ul class="m-0 p-0">
              <li class="active"><router-link to="/">Home</router-link></li>
              <li><router-link to="/shop">Shop</router-link></li>
              <li><router-link to="/page">Pages</router-link>
                <ul class="dropdown">
                  <li><router-link to="./about.html">About Us</router-link></li>
                  <li><router-link to="./shop-details.html">Shop Details</router-link></li>
                  <li><router-link to="./shopping-cart.html">Shopping Cart</router-link></li>
                  <li><router-link to="./checkout.html">Check Out</router-link></li>
                  <li><router-link to="./blog-details.html">Blog Details</router-link></li>
                </ul>
              </li>
              <li><router-link to="blog">Blog</router-link></li>
              <li><router-link to="./contact.html">Contacts</router-link></li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-3 col-md-3">
          <div class="header__nav__option d-flex align-items-center">
            <router-link to="#" class="d-flex align-items-center">
              <i class="bi bi-heart text-black"></i>
              <span>
                <span class="fw-semibold wishlist">Wishlist</span>
                <span class="d-block mt-n1 text-black-50">20</span>
              </span>
            </router-link>
            <router-link to="#" class="d-flex align-items-center">
              <i class="bi bi-bag text-black"></i>
              <span>
                <span class="fw-semibold wishlist">Cart</span>
                <span class="d-block mt-n1 text-black-50">$0.00</span>
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
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

const logout = () => {
  authStore.logout(router)
}
</script>
