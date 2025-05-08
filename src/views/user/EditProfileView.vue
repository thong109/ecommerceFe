<template>
  <Loading :isLoading="authStore.isLoading" />
  <Breadcrumb :titles="['Chỉnh sửa thông tin']" />
  <section class="spad">
    <div class="container">
      <form @submit.prevent="updateUserProfile">
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="text-sm">Đã mua</h6>
            <hr>
            <div class="row align-items-center">
              <div class="col-sm-3">
                <p class="mb-0">Họ tên</p>
              </div>
              <div class="col-sm-9">
                <input type="text" class="text-muted mb-0 form-control form-control-sm" v-model="user.name" />
                <p class="small mb-0 text-danger" v-if="errors.name">
                  {{ errors.name[0] }}
                </p>
              </div>
            </div>
            <hr>
            <div class="row align-items-center">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <input type="text" class="text-muted mb-0 form-control form-control-sm" v-model="user.email" readonly
                  disabled />
              </div>
            </div>
            <hr>
            <div class="row align-items-center">
              <div class="col-sm-3">
                <p class="mb-0">Số điện thoại</p>
              </div>
              <div class="col-sm-9">
                <input type="text" class="text-muted mb-0 form-control form-control-sm"
                  v-model="user.user_info.phone" />
                <p class="text-danger small mb-0" v-if="errors['user_info.phone']">
                  {{ errors['user_info.phone'][0] }}
                </p>
              </div>
            </div>
            <hr>
            <div class="row align-items-center">
              <div class="col-sm-3">
                <p class="mb-0">Địa chỉ</p>
              </div>
              <div class="col-sm-9">
                <input type="text" class="text-muted mb-0 form-control form-control-sm"
                  v-model="user.user_info.address" />
              </div>
            </div>
            <hr>
            <div class="row align-items-center">
              <div class="col-sm-3">
                <p class="mb-0">Giới thiệu ngắn</p>
              </div>
              <div class="col-sm-9">
                <textarea class="text-muted mb-0 form-control form-control-sm"
                  v-model="user.user_info.description"></textarea>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-center pt-2 gap-3">
              <ButtonBack />
              <button type="submit" class="primary-btn mb-0">Lưu</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import ButtonBack from "@/components/button/ButtonBack.vue";
import Breadcrumb from "@/components/home/Breadcrumb.vue";
import Loading from "@/components/Loading.vue";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const errors = ref({})

const updateUserProfile = async () => {
  const formData = new FormData();
  formData.append('name', authStore.user.name);
  formData.append('user_info[phone]', authStore.user.user_info.phone);
  formData.append('user_info[address]', authStore.user.user_info.address);
  formData.append('user_info[description]', authStore.user.user_info.description);
  try {
    const res = await authStore.updateUserProfile(formData);
    if (res.code === 422) {
      errors.value = res.errors;
    } else if (res.status === 200) {
      toast.success(res.data.message);
      errors.value = {};
    } else {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  } catch (error) {
    toast.error('Lỗi máy chủ hoặc mạng. Vui lòng thử lại sau.');
  }
}

onMounted(async () => {
  await authStore.fetchUser()
})
</script>

<style scoped>
textarea {
  resize: none;
}
</style>