<template>
  <Loading :isLoading="authStore.isLoading" />
  <Breadcrumb :titles="['Cá nhân']" />
  <section class="spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4 overflow-hidden">
            <div class="card-body">
              <div class="background m-n3">
                <div class="bg-dark" style="height: 100px;"></div>
              </div>
              <div class="avatar mt-n5">
                <div class="avatar-wrapper position-relative" style="width: 100px; height: 100px;">
                  <img v-if="hasImagePreview" :src="previewImage" alt="avatar"
                    class="img-fluid w-100 h-100 object-fit-cover rounded-circle overflow-hidden border-white border bg-white">
                  <img v-else :src="authStore.user ? getAvatarUrl(authStore.user?.user_info.avatar) : getAvatarUrl()"
                    alt="avatar"
                    class="img-fluid w-100 h-100 object-fit-cover rounded-circle overflow-hidden border-white border bg-white">
                  <div class="position-relative">
                    <input type="file" id="fileInput" hidden @change="handleFileChange" />
                    <label for="fileInput"
                      class="position-absolute bottom-0 end-0 z-3 d-inline-flex justify-content-center align-items-center rounded-circle bg-dark-subtle p-1"
                      style="cursor: pointer;">
                      <i class="bi bi-camera-fill d-inline-flex justify-content-center align-items-center"
                        style="height: 16px;width: 16px; font-size: 12px;"></i>
                    </label>
                  </div>
                </div>
              </div>
              <h5 class="my-3">{{ authStore.user?.name }}</h5>
              <div class="d-flex flex-column gap-2 justify-content-center mb-2">
                <router-link to="path" class="w-100 primary-btn-outline small p-2">Chỉnh sửa thông tin</router-link>
              </div>
              <p class="text-muted mb-1"><i class="bi bi-calendar-check me-1"></i>{{
                formatDate(authStore.user?.created_at) }}</p>
              <p v-if="authStore.user?.user_info.address !== 'null'" class="text-muted mb-4"><i
                  class="bi bi-geo-alt-fill me-1"></i>
                {{ authStore.user?.user_info.address }}</p>
              <p v-else class="text-muted mb-4"><i class="bi bi-geo-alt-fill me-1"></i>Chưa cập nhật</p>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <h6 class="text-sm">Đã mua</h6>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Họ tên</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ authStore.user?.name }}</p>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Breadcrumb from "@/components/home/Breadcrumb.vue";
import Loading from "@/components/Loading.vue";
import { formatDate, getAvatarUrl } from "@/helpers/formatted";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";

const authStore = useAuthStore()

const previewImage = ref('') // ảnh hiển thị
const hasImagePreview = ref(false)

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  hasImagePreview.value = true;
  previewImage.value = URL.createObjectURL(selectedFile);

  authStore.user.user_info.avatar = selectedFile;
  const formData = new FormData();
  formData.append('name', authStore.user.name);
  formData.append('user_info[phone]', authStore.user.user_info.phone);
  formData.append('user_info[address]', authStore.user.user_info.address);
  formData.append('user_info[location]', authStore.user.user_info.location);
  formData.append('user_info[description]', authStore.user.user_info.description);

  if (authStore.user.user_info.avatar instanceof File) {
    formData.append('user_info[avatar]', authStore.user.user_info.avatar);
  }

  await authStore.updateUserProfile(formData);
};

onMounted(async () => {
  await authStore.fetchUser()
})

const handleUpdateProfile = async () => {
}

</script>