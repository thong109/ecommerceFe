<template>
  <div class="widget-small warning coloured-icon"><i class='icon bi bi-truck fa-3x'></i>
    <div class="info">
      <h4>Tổng đơn hàng</h4>
      <p><b>{{ orders.length }} đơn hàng</b></p>
      <p class="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'

const orders = ref({})

const fetchOrders = async () => {
  try {
    const res = await axiosConfig.get('/order/all')
    orders.value = res.data.orders
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchOrders()
})
</script>