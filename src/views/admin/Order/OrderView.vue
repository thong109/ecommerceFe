<template>
  <Loading :isLoading="isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Đơn hàng</b></li>
        </ul>
        <div id="clock"></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th width="10"><input type="checkbox" id="all"></th>
                <th>ID đơn hàng</th>
                <th>Khách hàng</th>
                <th>Đơn hàng</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td width="10"><input type="checkbox" name="check1" value="1"></td>
                <td>{{ order.id }}</td>
                <td>{{ order.shipping.shipping_name }}</td>
                <td>
                  <router-link :to="`/admin/order/${order.id}`" class="d-inline-block">
                    <p class="mb-0">Xem chi tiết</p>
                  </router-link>
                </td>
                <td>{{ order.order_total }}</td>
                <td>{{ formatPrice(order.product_summary) }}</td>
                <td>
                  <span v-if="order.order_status !== undefined" class="badge"
                    :class="getStatusBadgeClass(order.order_status)">
                    {{ order.order_status_label }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'
import { formatPrice } from '@/helpers/formatted';
import Loading from '@/components/Loading.vue';

const orders = ref([])
const isLoading = ref(false)

const fetchOrders = async () => {
  isLoading.value = true
  try {
    const res = await axiosConfig.get('/order/all')
    orders.value = res.data.orders
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}

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

onMounted(async () => {
  await fetchOrders()
})
</script>