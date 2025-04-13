<template>
  <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-10 lg:col-6 lg:py-[114px]">
          <div class="mx-auto w-full max-w-[480px]">
            <img class="mb-8" src="https://themewagon.github.io/pinwheel/images/flower.svg" alt="" />
            <h1 class="mb-4">Sing In</h1>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="email" class="form-label">Email Adrdess</label>
                <input type="email" id="email" class="form-control" placeholder="Your Email Address"
                  v-model="data.email" />
              </div>
              <div class="form-group mt-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Your Password" autocomplete="current-password"
                  v-model="data.password" />
              </div>
              <button class="btn btn-primary mt-10 block w-full">Sign In</button>
              <p class="mt-6 text-center">
                Can't <span class="text-dark" href="#">log in</span>?
                <router-link class="text-dark" to="/signup">Sign up</router-link> for create
                account
              </p>
            </form>
            <div
              class="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-border after:content-['']">
              <span class="relative z-[1] inline-block bg-white px-2">Or</span>
            </div>
            <div class="signin-options mt-10">
              <a class="btn btn-outline-white block w-full text-dark" href="#">Sign In With Google</a>
            </div>
          </div>
        </div>

        <div class="auth-banner bg-gradient flex flex-col items-center justify-center py-16 lg:col-6">
          <img class="absolute top-0 left-0 h-full w-full"
            src="https://themewagon.github.io/pinwheel/images/login-banner-bg.svg" alt="" />
          <div class="w-full text-center">
            <h2 class="h3 text-white">
              Turn your All ideas into<br />
              your reality
            </h2>
            <div class="swiper auth-banner-carousel">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img width="667" height="557" class="mx-auto"
                    src="https://themewagon.github.io/pinwheel/images/login-carousel-img-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axiosConfig from '@/helpers/axiosConfig';
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const data = reactive({
  email: null,
  password: null
})

const handleLogin = () => {
  axiosConfig.post('/login', data)
    .then((response) => {
      authStore.setUser(response.data.token, response.data.user.is_admin)
      router.go(-1)
    })
    .catch((error) => {
      console.error(error)
      // alert(error.response.data.message)
    })
}
</script>
