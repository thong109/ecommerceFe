<template>
  <Loading :isLoading="isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Bảng điều khiển</b></li>
        </ul>
        <div id="clock"></div>
      </div>
    </div>
  </div>
  <div class="row dashboard">
    <!--Left-->
    <div class="col-md-12 col-lg-6">
      <div class="row">
        <!-- col-6 -->
        <div class="col-12">
          <Customer />
        </div>
        <!-- col-6 -->
        <div class="col-12">
          <Product />
        </div>
        <!-- col-6 -->
        <div class="col-12">
          <Order />
        </div>
        <!-- col-6 -->
        <div class="col-12">
          <ProductQuantity />
        </div>
        <!-- col-12 -->
        <!-- / col-12 -->
      </div>
    </div>
    <!--END left-->
    <!--Right-->
    <div class="col-md-12 col-lg-6">
      <div class="row">
        <StatisticsFromDayToDay />
        <Statistics />
      </div>

    </div>
    <!--END right-->
  </div>
  <div class="row">
    <OrderStatus />
  </div>
</template>

<script setup>
import Customer from '@/components/admin/Dashboard/Customer.vue';
import Order from '@/components/admin/Dashboard/Order.vue';
import OrderStatus from '@/components/admin/Dashboard/OrderStatus.vue';
import Product from '@/components/admin/Dashboard/Product.vue';
import ProductQuantity from '@/components/admin/Dashboard/ProductQuantity.vue';
import Statistics from '@/components/admin/Dashboard/Statistics.vue';
import StatisticsFromDayToDay from '@/components/admin/Dashboard/StatisticsFromDayToDay.vue';
import Loading from '@/components/Loading.vue';
import { onMounted, ref } from 'vue';

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000);
})
</script>