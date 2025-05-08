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
                  <img v-else :src="authStore.user ? getAvatarUrl(authStore.user?.user_info.avatar) : getAvatarUrl('')"
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
                <router-link to="/user/edit" class="w-100 primary-btn-outline small p-2">Chỉnh sửa thông
                  tin</router-link>
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
              <div v-for="order in authStore.userBuy" :key="order.id">
                <div class="row text-center">
                  <div class="col-2">
                    <label class="d-block small mb-0">Ngày mua</label>
                    <p class="text-muted mb-0">{{ order.created_at }}</p>
                  </div>
                  <div class="col-2">
                    <label class="d-block small mb-0">Số lượng</label>
                    <p class="text-muted mb-0">{{ order.order_total }}</p>
                  </div>
                  <div class="col-2">
                    <label class="d-block small mb-0">Tổng tiền</label>
                    <p class="text-muted mb-0">{{ formatPrice(order.product_summary) }}</p>
                  </div>
                  <div class="col-3">
                    <label class="d-block small mb-0">Tình trạng</label>
                    <span v-if="order.order_status !== undefined" class="badge"
                      :class="getStatusBadgeClass(order.order_status)">
                      {{ order.order_status_label }}
                    </span>
                  </div>
                  <!-- <div class="col-2">
                    <label class="d-block small mb-0">Hủy đơn</label>
                    <div class="d-block">
                      <button class="badge badge-danger border-0 py-1 px-2 mb-0"
                        :disabled="[0, 2, 3, 4, 5].includes(order.order_status)" type="button">Hủy đơn</button>
                    </div>
                  </div> -->
                  <div class="col-3">
                    <label class="d-block small mb-0">Chi tiết</label>
                    <router-link :to="`/user/order/${order.id}`"
                      class="d-inline-flex align-items-center btn btn-primary btn-sm bg-warning border-0 text-white mb-0"
                      title="Sửa">
                      <i class="bi bi-eye d-inline-flex align-items-center py-1"></i>
                    </router-link>
                  </div>
                </div>
                <hr>
              </div>
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
import { formatDate, formatDateTime, formatPrice, getAvatarUrl } from "@/helpers/formatted";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

const authStore = useAuthStore()

const previewImage = ref('') // ảnh hiển thị
const hasImagePreview = ref(false)
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 0:
      return 'bg-warning';
    case 1:
      return 'bg-info';
    case 2:
      return 'bg-primary';
    case 3:
      return 'bg-success';
    case 4:
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  hasImagePreview.value = true;
  previewImage.value = URL.createObjectURL(selectedFile);

  authStore.user.user_info.avatar = selectedFile;
  const formData = new FormData();
  if (authStore.user.user_info.avatar instanceof File) {
    formData.append('user_info[avatar]', authStore.user.user_info.avatar);
  }

  const res = await authStore.updateUserProfile(formData);
  console.log(res);

  if (res && res.data.code === 200) {
    toast.success(res.data.message)
  }
};

onMounted(async () => {
  await authStore.fetchUser()
  await authStore.fetchUserBuy()
})
</script>

<style scoped>
.badge[disabled]{
  opacity: .5;
}
</style>