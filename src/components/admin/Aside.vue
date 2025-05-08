<template>
  <aside class="app-sidebar" :class="toogle ? 'active' : ''">
    <div class="app-sidebar__user"><img class="app-sidebar__user-avatar rounded-5 object-fit-cover"
        :src="getAvatarUrl(authStore?.user?.user_info.avatar)" width="50px" alt="User Image">
      <!-- https://i.pinimg.com/736x/a2/94/47/a29447c7320f68aa6c08845190e38152.jpg -->
      <div>
        <p class="app-sidebar__user-name text-white"><b>{{ authStore?.user?.name }}</b></p>
        <p class="app-sidebar__user-designation text-white">Chào mừng bạn trở lại</p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li>
        <router-link class="app-menu__item" to="/admin/dashboard">
          <i class='app-menu__icon bi bi-speedometer'></i>
          <span class="app-menu__label">Bảng điều khiển</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/product">
          <i class='app-menu__icon bi bi-p-square'></i>
          <span class="app-menu__label">Quản lý sản phẩm</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/category">
          <i class='app-menu__icon bi bi-bookmarks'></i>
          <span class="app-menu__label">Quản lý danh mục</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/brand">
          <i class='app-menu__icon bi bi-bootstrap'></i>
          <span class="app-menu__label">Quản lý thương hiệu</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link class="app-menu__item " to="/admin/staff">
          <i class='app-menu__icon bx bx-id-card'></i>
          <span class="app-menu__label">Quản lý nhân viên</span>
        </router-link>
      </li> -->
      <li>
        <router-link class="app-menu__item" to="/admin/client">
          <i class='app-menu__icon bi bi-people'></i>
          <span class="app-menu__label">Quản lý khách hàng</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/order/">
          <i class='app-menu__icon bi bi-truck'></i>
          <span class="app-menu__label">Quản lý đơn hàng</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/settings">
          <i class='app-menu__icon bi bi-gear'></i>
          <span class="app-menu__label">Cài đặt hệ thống</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const toogle = defineModel()

import { getAvatarUrl } from '@/helpers/formatted';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchUser()
})

</script>