<template>
  <section class="page_404 py-5 bg-white">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-10 col-sm-offset-1 m-auto text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center ">404</h1>
            </div>
            <div class="mt-n5">
              <h3 class="h2">
                Trang không tồn tại!
              </h3>
              <p>Trang không tồn tại ....</p>
              <router-link to="/" class="primary-btn">Trang chủ</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.four_zero_four_bg {
  background: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;

  h1 {
    font-size: 80px;
  }

  h3 {
    font-size: 80px;
  }
}
</style>