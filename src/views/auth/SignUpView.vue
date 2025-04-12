<template>
  <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-10 lg:col-6 lg:py-[114px]">
          <div class="mx-auto w-full max-w-[480px]">
            <img class="mb-8" src="https://themewagon.github.io/pinwheel/images/flower.svg" alt="" />
            <h1 class="mb-4">Sing Up</h1>
            <form @submit.prevent="handleSignUp">
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" id="name" class="form-control" placeholder="Your Full Name" v-model="data.name" />
              </div>
              <div class="form-group mt-4">
                <label for="email" class="form-label">Email Adrdess</label>
                <input type="email" id="email" class="form-control" placeholder="Your Email Address"
                  v-model="data.email" />
              </div>
              <div class="form-group mt-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Your Password"
                  v-model="data.password" />
              </div>
              <input class="btn btn-primary mt-10 block w-full" type="submit" value="Sign Up" />
            </form>
            <div
              class="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-border after:content-['']">
              <span class="relative z-[1] inline-block bg-white px-2">Or Sign Up With Google</span>
            </div>
            <div class="signin-options mt-10">
              <a class="btn btn-outline-white block w-full text-dark" href="#">Sign Up With Google</a>
            </div>
          </div>
        </div>

        <div class="auth-banner bg-gradient flex flex-col items-center justify-center py-16 lg:col-6">
          <img class="absolute top-0 left-0 h-full w-full"
            src="https://themewagon.github.io/pinwheel/images/login-banner-bg.svg" alt="" />
          <div class="w-full text-center">
            <h2 class="h3 text-white">
              A suite product accelerate <br />
              your career design
            </h2>
            <div class="swiper auth-banner-carousel">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img width="667" height="557" class="mx-auto"
                    src="https://themewagon.github.io/pinwheel/images/signup-carousel-img-1.png" alt="" />
                </div>
              </div>
              <div class="pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axiosConfig from '@/helpers/axiosConfig'
const authStore = useAuthStore()

const router = useRouter()
const data = reactive({
  name: null,
  email: null,
  password: null
})

const handleSignUp = () => {
  axiosConfig.post('/signup', data)
    .then((response) => {
      authStore.setUser(response.data.token, response.data.user.is_admin)
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.error(error)
      // alert(error.response.data.message)
    })
}
</script>