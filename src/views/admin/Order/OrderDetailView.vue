<template>
  <Loading :isLoading="isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Chi tiết đơn hàng</b></li>
        </ul>
        <div id="clock"></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile mb-0" id="print">
        <div class="tile-body">
          <table class="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Điện thoại</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ order?.shipping.shipping_name }}</td>
                <td>{{ order?.shipping.shipping_email }}</td>
                <td>{{ order?.shipping.shipping_address }}</td>
                <td>{{ order?.shipping.shipping_phone }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-hover table-bordered" id="sampleTable">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 35%" />
              <col style="width: 10%" />
              <col style="width: 15%" />
              <col style="width: 35%" />
            </colgroup>
            <thead>
              <tr>
                <th>ID sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="or in order?.order_details"
                :key="or.id"
                :class="or.invalid ? 'table-danger' : ''"
              >
                <td>{{ or.id }}</td>
                <td>{{ or.product_name }}</td>
                <td>{{ or.product_sales_quantity }}</td>
                <td>{{ formatPrice(or.product_price) }}</td>
                <td>
                  <span v-if="or.invalid" class="badge bg-danger">{{
                    or.invalidMessage
                  }}</span>
                </td>
              </tr>
              <tr v-if="order?.order_discount_type">
                <td><strong>Mã giảm giá:</strong></td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {{
                      order?.order_discount_type === "fixed"
                        ? "-" + formatPrice(order?.order_discount)
                        : order?.order_discount_type === "percent"
                        ? "-" + formatFixed(order?.order_discount)
                        : ""
                    }}
                  </strong>
                </td>
                <td></td>
              </tr>
              <tr>
                <td><strong>Tổng tiền:</strong></td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {{
                      formatPrice(
                        order?.order_details?.reduce((sum, or) => {
                          if (order?.order_discount_type === "fixed")
                            return (
                              sum + (or.product_price - order?.order_discount)
                            );
                          if (order?.order_discount_type === "percent")
                            return (
                              sum +
                              (or.product_price -
                                (or.product_price * order?.order_discount) /
                                  100)
                            );
                          return sum + or.product_price;
                        }, 0)
                      )
                    }}
                  </strong>
                </td>
                <td>
                  {{ order?.payment_method }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-hover table-bordered" id="delivery">
            <thead>
              <tr>
                <th>Trạng thái đơn hàng</th>
                <th v-if="order?.order_status !== undefined">
                  <select
                    v-model="selectStatus"
                    @change="handleChangeStatus"
                    :disabled="[0, 4, 5].includes(order.order_status)"
                    class="form-control form-control-sm"
                  >
                    <option
                      v-for="option in statusOptions"
                      :key="option.value"
                      :value="option.value"
                      :class="'text-' + option.color"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </th>
              </tr>
            </thead>
          </table>
          <ButtonBack class="btn border border-black text-capitalize" />
          <button
            type="button"
            class="btn border border-black text-capitalize mb-0 ms-3"
            @click="printSection"
          >
            In hóa đơn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosConfig from "@/helpers/axiosConfig";
import { formatFixed, formatPrice } from "@/helpers/formatted";
import Loading from "@/components/Loading.vue";
import { useOrderStatus } from "@/helpers/constant";
import { toast } from "vue3-toastify";
import ButtonBack from "@/components/button/ButtonBack.vue";

const router = useRoute();
const isLoading = ref(false);
const { statusOptions } = useOrderStatus();
const order = ref({
  shipping: {},
  order_details: [],
  order_status: "",
});
const selectStatus = ref(null);

const handleChangeStatus = async (event) => {
  const previousStatus = order.value.order_status;
  const newStatus = selectStatus.value;

  order.value.order_details.forEach((item) => {
    item.invalid = false;
    item.invalidMessage = "";
  });

  try {
    const res = await axiosConfig.post(`/order/update/`, {
      order_id: router.params.id,
      order_status: newStatus,
    });

    order.value.order_status = newStatus;
    toast.success(res.data.message);
  } catch (error) {
    selectStatus.value = previousStatus;

    if (error.response?.data?.invalidItems) {
      const result = error.response.data;
      order.value.order_details.forEach((item) => {
        const found = result.invalidItems.find(
          (i) => i.product_id === item.product_id
        );
        if (found) {
          item.invalid = true;
          item.invalidMessage = found.message;
        } else {
          item.invalid = false;
          item.invalidMessage = "";
        }
      });
    }
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await axiosConfig.get(`/order/show/${router.params.id}`);
    order.value = res.data;
    selectStatus.value = order.value.order_status;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

function printSection() {
  const content = document.getElementById("print").innerHTML;
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>In nội dung</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
</script>

<style lang="scss" scoped>
.border-danger {
  border: 1px solid #dc3545 !important;
}

@media print {
  #delivery {
    display: none;
  }
}
</style>
