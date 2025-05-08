<template>
  <div class="widget-small danger coloured-icon"><i class='icon bi bi-exclamation-octagon-fill fa-3x'></i>
    <div class="info">
      <h4>Sắp hết hàng</h4>
      <p><b>{{ productQuantity.length }} sản phẩm</b></p>
      <p class="info-tong">Số sản phẩm cảnh báo hết cần nhập thêm.</p>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { onMounted, ref } from 'vue';

const productStore = useProductStore()
const productQuantity = ref([])

onMounted(async () => {
  await productStore.fetchProducts()

  productQuantity.value = productStore.productData.filter(item => item.quantity <= 20)
})
</script>