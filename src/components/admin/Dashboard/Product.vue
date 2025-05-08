<template>
  <div class="widget-small info coloured-icon"><i class='icon bi bi-cash-coin fa-3x'></i>
    <div class="info">
      <h4>Tổng sản phẩm</h4>
      <p><b>{{ productStore.productData.length }} sản phẩm</b></p>
      <p class="info-tong">Tổng số sản phẩm được quản lý.</p>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>