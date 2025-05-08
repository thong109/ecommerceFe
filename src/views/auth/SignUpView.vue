<template>
  <section class="spad">
    <div class="container max-w-full">
      <div class="row">
        <div class="d-block">
          <div class="mx-auto w-full max-w-480px">
            <div class="d-flex justify-content-center">
              <img
                class="mb-8"
                src="https://themewagon.github.io/pinwheel/images/flower.svg"
                alt=""
              />
            </div>
            <h1 class="mb-4 text-center">Đăng ký</h1>
            <form @submit.prevent="handleSignUp">
              <div class="form-group">
                <label for="name" class="form-label">Họ tên</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Họ tên"
                  v-model="data.name"
                />
              </div>
              <div class="form-group mt-4">
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
                  v-model="data.password"
                />
              </div>
              <input
                class="btn btn-primary d-block w-100 my-4"
                type="submit"
                value="Đăng ký"
              />
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
const authStore = useAuthStore();

const router = useRouter();
const data = reactive({
  name: null,
  email: null,
  password: null,
});

const handleSignUp = async () => {
  const success = await authStore.register(data);

  if (success) {
    router.push({ name: "home" });
  } else {
    toast.error("error");
  }
};
</script>
