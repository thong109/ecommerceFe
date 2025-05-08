<template>
  <section class="spad">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-10 lg:col-6 lg:py-[114px]">
          <div class="mx-auto w-full max-w-480px">
            <div class="d-flex justify-content-center">
              <img
                class="mb-8"
                src="https://themewagon.github.io/pinwheel/images/flower.svg"
                alt=""
              />
            </div>
            <h1 class="mb-4 text-center">Đăng nhập</h1>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="data.email"
                />
              </div>
              <div class="form-group mt-4">
                <label for="password" class="form-label">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Mật khẩu"
                  autocomplete="current-password"
                  v-model="data.password"
                />
              </div>
              <button class="btn btn-primary mt-4 block w-100 mb-4">
                Đăng nhập
              </button>
              <p class="mt-6 text-center">
                Không thể <span class="text-dark" href="#">đăng nhập</span>?
                <router-link class="text-dark" to="/signup"
                  >Đăng ký ngay</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const router = useRouter();
const data = reactive({
  email: null,
  password: null,
});

const handleLogin = async () => {
  const success = await authStore.login(data);

  if (success) {
    router.push({
      name: "home",
    });
  } else {
    toast.error("error");
  }
};
</script>
