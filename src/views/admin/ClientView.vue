<template>
  <Loading :isLoading="userStore.isLoading" />
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
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="row element-button">
            <div class="col-sm-2">
              <a class="btn btn-add btn-sm" href="form-add-nhan-vien.html" title="Thêm"><i class="bi bi-plus-lg"></i>
                Tạo mới nhân viên</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm nhap-tu-file" type="button" title="Nhập"><i
                  class="bi bi-file-earmark-arrow-up-fill"></i> Tải từ file</a>
            </div>

            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm print-file" type="button" title="In" onclick="myApp.printTable()"><i
                  class="bi bi-file-earmark-break-fill"></i> In dữ liệu</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm print-file js-textareacopybtn" type="button" title="Sao chép"><i
                  class="bi bi-files"></i> Sao chép</a>
            </div>

            <div class="col-sm-2">
              <a class="btn btn-excel btn-sm" href="" title="In"><i class="bi bi-filetype-csv"></i> Xuất Excel</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm pdf-file" type="button" title="In"><i class="bi bi-file-pdf-fill"></i>
                Xuất PDF</a>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-delete btn-sm" type="button" title="Xóa"><i class="bi bi-trash"></i> Xóa tất cả </a>
            </div>
          </div>
          <table class="table table-hover table-bordered table-responsive border-0" cellpadding="0" cellspacing="0"
            style=" table-layout: fixed;">
            <colgroup>
              <col style="width: 1%">
              <col style="width: 20%">
              <col style="width: 10%">
              <col style="width: 30%">
              <col style="width: 15%">
              <col style="width: 14%">
            </colgroup>
            <thead>
              <tr>
                <th><input type="checkbox" id="all"></th>
                <th>Họ và tên</th>
                <th class="text-center">Ảnh</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th class="text-center">Tính năng</th>
              </tr>
            </thead>
            <tbody v-if="userStore.usersData.length > 0">
              <tr v-for="user in userStore.usersData" :key="user.id">
                <td><input type="checkbox" name="check1" value="1"></td>
                <td>{{ user.name }}</td>
                <td><img class="img-card-person" :src="getAvatarUrl(user.user_info.avatar)" :alt="user.name"></td>
                <td>{{ user.user_info.address }}</td>
                <td>{{ user.user_info.phone }}</td>
                <td class="text-center">
                  <button type="button" @click="handleDeleteUser(user.id)"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    title="Xóa">
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    class="d-inline-flex align-items-center btn btn-primary btn-sm bg-warning border-0 text-white mb-0"
                    title="Sửa">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">Không tìm thấy kết quả</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { getAvatarUrl } from "@/helpers/formatted";
import Loading from '@/components/Loading.vue';
import { useProductStore } from '@/stores/product';

const userStore = useUserStore()
const productStore = useProductStore()

onMounted(async () => {
  await userStore.fetchAllUser()
  await productStore.fetchProducts()
})

const handleDeleteUser = (id) => {
  console.log(id);
}
</script>