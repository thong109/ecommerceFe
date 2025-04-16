<template>
  <Loading :isLoading="categoryStore.isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Danh mục</b></li>
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
              <router-link to="/admin/category/add" class="btn btn-add btn-sm" title="Thêm"><i class="bi bi-plus-lg"></i>
                Tạo mới danh mục</router-link>
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
              <col style="width: 20%">
              <col style="width: 25%">
              <col style="width: 20%">
            </colgroup>
            <thead>
              <tr class="border-bottom-0">
                <th><input type="checkbox" id="all"></th>
                <th>Tên sản phẩm</th>
                <th class="text-center">Ảnh</th>
                <th class="text-center">Trạng thái</th>
                <th class="text-center">Tính năng</th>
              </tr>
            </thead>
            <tbody v-if="categoryStore.data.length > 0">
              <tr v-for="category in categoryStore.data" :key="category.id">
                <td><input type="checkbox" name="check1" v-model="category.id"></td>
                <td>{{ category.name }}</td>
                <td><img class="img-card-person" :src="getAvatarUrl(category.image)" :alt="category.name"></td>
                <td class="text-center">
                  <button class="px-3 py-1 border-0 badge bg-info" type="button" v-if="category.status === 1"><i class="bi bi-eye-fill"></i></button>
                  <button class="px-3 py-1 border-0 badge bg-danger" type="button" v-else><i class="bi bi-eye-slash-fill"></i></button>
                </td>
                <td class="text-center">
                  <button type="button" @click="handleDeleteCategory(category.id)"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    title="Xóa">
                    <i class="bi bi-trash"></i>
                  </button>
                  <router-link :to="`/admin/category/edit/${category.id}`"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm bg-warning border-0 text-white mb-0"
                    title="Sửa">
                    <i class="bi bi-pencil-square"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="text-center">Không tìm thấy kết quả</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { formatPrice, getAvatarUrl } from "@/helpers/formatted";
import Loading from '@/components/Loading.vue';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.fetchCategories()
})

const handleDeleteCategory = (id) => {
  console.log(id);
}

</script>