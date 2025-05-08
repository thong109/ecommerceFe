<template>
  <div class="col-md-12">
    <div class="tile">
      <h3 class="tile-title">Tình trạng đơn hàng</h3>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.shipping.shipping_name }}</td>
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
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'
import { formatPrice } from '@/helpers/formatted';

const orders = ref({})

const fetchOrders = async () => {
  try {
    const res = await axiosConfig.get('/order/all')
    orders.value = res.data.orders
  } catch (error) {
    console.log(error);
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