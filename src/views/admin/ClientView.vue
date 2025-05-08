<template>
  <Loading :isLoading="authStore.isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Bảng điều khiển</b></li>
        </ul>
        <div id="clock"></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <table class="table table-hover table-bordered table-responsive border-0" cellpadding="0" cellspacing="0"
            style=" table-layout: fixed;">
            <colgroup>
              <col style="width: 20%">
              <col style="width: 10%">
              <col style="width: 30%">
              <col style="width: 15%">
              <col style="width: 14%">
            </colgroup>
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th class="text-center">Ảnh</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th class="text-center">Tính năng</th>
              </tr>
            </thead>
            <tbody v-if="authStore.usersData.length > 0">
              <tr v-for="user in authStore.usersData" :key="user.id">
                <td>
                  <b>{{ user.name }}</b>
                  <p class="mb-0">{{ user.email }}</p>
                </td>
                <td>
                  <div>
                    <photo-provider>
                      <photo-consumer :key="getAvatarUrl(user.user_info.avatar)"
                        :intro="getAvatarUrl(user.user_info.avatar)" :src="getAvatarUrl(user.user_info.avatar)">
                        <img :src="getAvatarUrl(user.user_info.avatar)" class="view-box" />
                      </photo-consumer>
                    </photo-provider>
                  </div>
                </td>
                <td>{{ user.user_info.address }}</td>
                <td>{{ user.user_info.phone }}</td>
                <td class="text-center">
                  <button type="button" @click="handleDeleteUser(user.id)"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    title="Xóa">
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    class="d-inline-flex align-items-center btn btn-primary btn-sm bg-warning border-0 text-white mb-0"
                    title="Sửa">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">Không tìm thấy kết quả</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getAvatarUrl } from "@/helpers/formatted";
import Loading from '@/components/Loading.vue';
import { useAuthStore } from '@/stores/auth';
import Vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchAllUser();
});

const handleDeleteUser = async (id) => {
  const res = await authStore.destroyUser([id])
  if (res) {
    await authStore.fetchAllUser();
  }
}


</script>
