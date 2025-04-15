<template>
  <Loading :isLoading="userStore.isLoading" />
  <Breadcrumb :titles="['Profile']" />
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
                  <img v-if="hasImagePreview"
                    :src="previewImage"
                    alt="avatar"
                    class="img-fluid w-100 h-100 object-fit-cover rounded-circle overflow-hidden border-white border bg-white">
                  <img v-else :src="getAvatarUrl(userStore.data.user_info.avatar)" alt="avatar"
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
              <h5 class="my-3">{{ userStore.data.name }}</h5>
              <div class="d-flex flex-column gap-2 justify-content-center mb-2">
                <button type="button" class="w-100 primary-btn">Follow</button>
                <router-link to="path" class="w-100 primary-btn-outline">Edit Profile</router-link>
              </div>
              <p class="text-muted mb-1"><i class="bi bi-calendar-check me-1"></i>{{
                formatDate(userStore.data.created_at) }}</p>
              <p v-if="userStore.data.user_info.address" class="text-muted mb-4"><i
                  class="bi bi-geo-alt-fill me-1"></i>{{
                    userStore.data.user_info.address }}</p>
              <p v-else class="text-muted mb-4"><i class="bi bi-geo-alt-fill me-1"></i>Not provided yet</p>
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
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Johnatan Smith</p>
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
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";

const userStore = useUserStore()

const previewImage = ref('') // ảnh hiển thị
const hasImagePreview = ref(false)

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  hasImagePreview.value = true;
  previewImage.value = URL.createObjectURL(selectedFile);

  userStore.data.user_info.avatar = selectedFile;

  await userStore.updateUserProfile();
};

onMounted(async () => {
  await userStore.fetchUser()
})

const handleUpdateProfile = async () => {
  await userStore.updateUserProfile()
}

</script>