<template>
  <section class="spad">
    <div class="container text-center py-5 my-4">
      <h1>Thanh toán MoMo</h1>
      <p v-if="paymentStatus === 'success'">Thanh toán thành công!</p>
      <p v-else-if="paymentStatus === 'failed'">
        Thanh toán thất bại: {{ errorMessage }}
      </p>
      <p v-else>Đang xử lý...</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosConfig from "@/helpers/axiosConfig";

const paymentStatus = ref(null);
const errorMessage = ref(null);

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const resultCode = params.get("resultCode");
  const orderId = params.get("orderId");
  errorMessage.value = params.get("message");

  const res = await axiosConfig.post("/payment/momo-result", {
    orderId,
    resultCode,
  });

  if (resultCode === "0") {
    paymentStatus.value = "success";
  } else {
    paymentStatus.value = "failed";
  }
});
</script>
