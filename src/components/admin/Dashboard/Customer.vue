<template>
  <div class="widget-small primary coloured-icon"><i class='icon bi bi-people fa-3x'></i>
    <div class="info">
      <h4>Tổng khách hàng</h4>
      <p><b>{{ authStore.usersData.length }} khách hàng</b></p>
      <p class="info-tong">Tổng số khách hàng được quản lý.</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchAllUser();
});

</script>