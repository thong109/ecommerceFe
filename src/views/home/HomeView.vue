<template>
  <SectionBanner />
  <section class="special_offer_area py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="special_offer_item position-relative">
            <img
              class="img-fluid"
              src="https://preview.colorlib.com/theme/persuit/img/feature-add/special-offer-1.jpg"
              alt=""
            />
            <div
              class="p-4 hover_text h-100 d-flex flex-column justify-content-between"
            >
              <div class="content">
                <h5 class="mb-0 pb-0">Young Couple</h5>
              </div>
              <div class="d-flex justify-content-center">
                <router-link to="/shop" class="primary-btn"
                  >Shop Now</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="special_offer_item position-relative">
            <img
              class="img-fluid"
              src="https://preview.colorlib.com/theme/persuit/img/feature-add/special-offer-2.jpg"
              alt=""
            />
            <div
              class="p-4 hover_text h-100 d-flex flex-column justify-content-between"
            >
              <div class="content">
                <h5 class="mb-0 pb-0">girls bag</h5>
              </div>
              <div class="d-flex justify-content-center">
                <router-link to="/shop" class="primary-btn"
                  >Shop Now</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import SectionBanner from "@/components/home/Banner.vue";
</script>
