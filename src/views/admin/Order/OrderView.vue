<template>
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
          <div class="row element-button">
            <div class="col-sm-2">

              <a class="btn btn-add btn-sm" href="form-add-don-hang.html" title="Thêm"><i class="fas fa-plus"></i>
                Tạo mới đơn hàng</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm nhap-tu-file mb-0" type="button" title="Nhập"
                onclick="myFunction(this)"><i class="fas fa-file-upload"></i> Tải từ file</a>
            </div>

            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm print-file mb-0" type="button" title="In" onclick="myApp.printTable()"><i
                  class="fas fa-print"></i> In dữ liệu</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm print-file js-textareacopybtn mb-0" type="button" title="Sao chép"><i
                  class="fas fa-copy"></i> Sao chép</a>
            </div>

            <div class="col-sm-2">
              <a class="btn btn-excel btn-sm" href="" title="In"><i class="fas fa-file-excel"></i> Xuất Excel</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm pdf-file mb-0" type="button" title="In" onclick="myFunction(this)"><i
                  class="fas fa-file-pdf"></i> Xuất PDF</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm mb-0" type="button" title="Xóa" onclick="myFunction(this)"><i
                  class="fas fa-trash-alt"></i> Xóa tất cả </a>
            </div>
          </div>
          <table class="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th width="10"><input type="checkbox" id="all"></th>
                <th>ID đơn hàng</th>
                <th>Khách hàng</th>
                <th>Đơn hàng</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
                <th>Tính năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td width="10"><input type="checkbox" name="check1" value="1"></td>
                <td>{{ order.id }}</td>
                <td>{{ order.shipping.shipping_name }}</td>
                <td>
                  <router-link :to="`/admin/order/${order.id}`" class="hover">Chi tiết đơn hàng</router-link>
                </td>
                <td>{{ order.order_total }}</td>
                <td>{{ formatPrice(order.product_summary) }}</td>
                <td>
                  <span v-if="order.order_status !== undefined" class="badge"
                    :class="getStatusBadgeClass(order.order_status)">
                    {{ order.order_status_label }}
                  </span>
                </td>
                <td class="text-center">
                  <button type="button"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    title="Xóa">
                    <i class="bi bi-trash"></i>
                  </button>
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

const orders = ref([])

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

<style scoped lang="scss">
.hover {
  &:hover {
    color: #000;
  }
}
</style>