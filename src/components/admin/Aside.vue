<template>
  <aside class="app-sidebar" :class="toogle ? 'active' : ''">
    <div class="app-sidebar__user"><img class="app-sidebar__user-avatar rounded-5 object-fit-cover"
        :src="getAvatarUrl(userStore.data.user_info.avatar)" width="50px" alt="User Image">
      <!-- https://i.pinimg.com/736x/a2/94/47/a29447c7320f68aa6c08845190e38152.jpg -->
      <div>
        <p class="app-sidebar__user-name text-white"><b>{{ userStore.data.name }}</b></p>
        <p class="app-sidebar__user-designation text-white">Chào mừng bạn trở lại</p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li>
        <router-link class="app-menu__item" to="/admin/dashboard">
          <i class='app-menu__icon bx bx-tachometer'></i>
          <span class="app-menu__label">Bảng điều khiển</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/product">
          <i class='app-menu__icon bx bx-purchase-tag-alt'></i>
          <span class="app-menu__label">Quản lý sản phẩm</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/category">
          <i class='app-menu__icon bx bx-purchase-tag-alt'></i>
          <span class="app-menu__label">Quản lý danh mục</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/brand">
          <i class='app-menu__icon bx bx-purchase-tag-alt'></i>
          <span class="app-menu__label">Quản lý thương hiệu</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item " to="/admin/staff">
          <i class='app-menu__icon bx bx-id-card'></i>
          <span class="app-menu__label">Quản lý nhân viên</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="/admin/client">
          <i class='app-menu__icon bx bx-user-voice'></i>
          <span class="app-menu__label">Quản lý khách hàng</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="table-data-oder.html">
          <i class='app-menu__icon bx bx-task'></i>
          <span class="app-menu__label">Quản lý đơn hàng</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="table-data-banned.html">
          <i class='app-menu__icon bx bx-run'></i>
          <span class="app-menu__label">Quản lý nội bộ</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="table-data-money.html">
          <i class='app-menu__icon bx bx-dollar'></i>
          <span class="app-menu__label">Bảng kê lương</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="quan-ly-bao-cao.html">
          <i class='app-menu__icon bx bx-pie-chart-alt-2'></i>
          <span class="app-menu__label">Báo cáo doanh thu</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="page-calendar.html">
          <i class='app-menu__icon bx bx-calendar-check'></i>
          <span class="app-menu__label">Lịch công tác</span>
        </router-link>
      </li>
      <li>
        <router-link class="app-menu__item" to="#">
          <i class='app-menu__icon bx bx-cog'></i>
          <span class="app-menu__label">Cài đặt hệ thống</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const toogle = defineModel()

import { getAvatarUrl } from '@/helpers/formatted';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

</script>