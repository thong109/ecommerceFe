<template>
  <Loading :isLoading="productStore.isLoading" />
  <div class="row">
    <div class="col-md-12">
      <div class="app-title align-items-center">
        <ul class="app-breadcrumb breadcrumb m-0">
          <li class="breadcrumb-item"><b>Sản phẩm</b></li>
        </ul>
        <div id="clock"></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="row element-button" v-if="!isToggle">
            <div class="col-sm-2">
              <router-link class="btn btn-add btn-sm" to="/admin/product/add" title="Thêm"><i class="bi bi-plus-lg"></i>
                Tạo mới sản phẩm</router-link>
            </div>
            <div class="col-sm-3">
              <form @submit.prevent="uploadFile">
                <label for="file" class="btn btn-delete btn-sm nhap-tu-file d-block" type="button" title="Nhập"><i
                    class="bi bi-file-earmark-arrow-up-fill"></i> Tải từ file
                  <input type="file" @change="handleFileChange" accept=".zip" hidden id="file" />
                </label>
                <button v-if="isShow" type="submit" :disabled="!zipFile">Upload ZIP</button>
              </form>
              <div v-if="Object.keys(errors).length > 0">
                <span class="text-danger small" v-for="(errorMessages, field) in errors" :key="field">
                  <div v-for="(message, idx) in errorMessages" :key="idx">{{ message }}</div>
                </span>
              </div>
            </div>
            <div class="col-sm-2">
              <button type="button" @click="copy" class="btn btn-delete btn-sm print-file m-auto mb-0"
                title="Sao chép"><i class="bi bi-files"></i> Sao chép</button>
            </div>

            <div class="col-sm-2">
              <button type="button" @click="exportProduct" class="btn btn-excel btn-sm" href="" title="In"><i
                  class="bi bi-filetype-csv"></i> Xuất Excel</button>
            </div>
            <div class="col-sm-2">
              <button @click="deleteValue" class="btn btn-delete btn-sm" type="button" title="Xóa"><i
                  class="bi bi-trash"></i> Xóa
              </button>
            </div>
            <div class="col-sm-2">
              <button @click="blockProduct" class="btn btn-delete btn-sm" type="button" title="Sản phẩm"><i
                  class="bi bi-arrows-expand-vertical"></i> Sản phẩm ngừng bán
              </button>
            </div>
          </div>
          <div class="row element-button" v-else>
            <div class="col-sm-2">
              <button @click="restoreProduct" class="btn btn-delete btn-sm" type="button" title="Khôi phục"><i
                  class="bi bi-arrow-clockwise"></i> Khôi phục
              </button>
            </div>
            <div class="col-sm-2">
              <button @click="blockProduct" class="btn btn-delete btn-sm" type="button" title="Sản phẩm"><i
                  class="bi bi-back"></i> Sản phẩm
              </button>
            </div>
          </div>
          <table class="table table-hover table-bordered table-responsive border-0" cellpadding="0" cellspacing="0"
            style=" table-layout: fixed;">
            <colgroup>
              <col style="width: 1%">
              <col style="width: 20%">
              <col style="width: 7%">
              <col style="width: 25%">
              <col style="width: 15%">
              <col style="width: 15%">
              <col style="width: 20%">
            </colgroup>
            <thead>
              <tr class="border-bottom-0">
                <th><input type="checkbox" id="all" @change="toggleAll" :checked="isChecked"></th>
                <th>Tên sản phẩm</th>
                <th class="text-center">Ảnh</th>
                <th>Thông tin</th>
                <th>Giá</th>
                <th>Chi tiết</th>
                <th class="text-center">Tính năng</th>
              </tr>
            </thead>
            <tbody v-if="productStore.productData.length > 0">
              <tr v-for="product in productStore.productData" :key="product.id">
                <td><input type="checkbox" name="check1" v-model="selectedIds" :value="product.id"></td>
                <td>{{ product.name }}</td>
                <td><img class="img-card-person" :src="getAvatarUrl(product.image)" :alt="product.name"></td>
                <td>
                  <div class="row">
                    <div class="col-12 small">
                      <strong>Danh mục:</strong> {{ product.categoryName }}
                    </div>
                    <div class="col-12 small">
                      <strong>Thương hiệu:</strong> {{ product.brandName }}
                    </div>
                    <div class="col-12 small">
                      <strong>Số lượng:</strong> {{ product.quantity }}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row">
                    <div class="col-12 small">
                      <strong>Giá bán:</strong> {{ formatPrice(product.price) }}
                    </div>
                    <div class="col-12 small">
                      <strong>Giá nhập:</strong> {{ formatPrice(product.cost) }}
                    </div>
                  </div>
                </td>
                <td>
                  <div v-for="(values, attrName) in product.attributes" :key="attrName">
                    <strong class="fw-bold small">{{ attrName }}:</strong>
                    <div class="flex flex-wrap">
                      <span v-for="(value, index) in values" :key="index" class="p-1 small">
                        {{ value }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <button
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 mb-0 bg-info"
                    type="button" v-if="product.status === 1" @click="changeStatus(product.id)"><i
                      class="bi bi-eye-fill"></i></button>
                  <button
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    type="button" v-else @click="changeStatus(product.id)"><i class="bi bi-eye-slash-fill"></i></button>
                  <button type="button" @click="handleDeleteProduct(product.id)" v-if="!isToggle"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm border-0 mr-1 bg-danger mb-0"
                    title="Xóa">
                    <i class="bi bi-trash"></i>
                  </button>
                  <router-link :to="`/admin/product/edit/${product.id}`"
                    class="d-inline-flex align-items-center btn btn-primary btn-sm bg-warning border-0 text-white mb-0"
                    title="Sửa">
                    <i class="bi bi-pencil-square"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">
                  <div class="p-5">Không tìm thấy kết quả</div>
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
import { formatPrice, getAvatarUrl } from "@/helpers/formatted";
import axiosConfig from '@/helpers/axiosConfig'
import Loading from '@/components/Loading.vue';
import { useProductStore } from '@/stores/product';
import { changeStatusData, copyData, deleteData, exportData, restoreData } from '@/helpers/getData'

const productStore = useProductStore()
const selectedIds = ref([])
const isChecked = ref(false)
const zipFile = ref(null)
const isShow = ref(false)
const errors = ref({})
const isToggle = ref(0)

onMounted(async () => {
  await productStore.fetchProducts()
})

const handleDeleteProduct = async (id) => {
  await productStore.deleteProduct([id])
}

const exportProduct = async () => {
  await exportData('products');
}

const toggleAll = (e) => {
  isChecked.value = true
  selectedIds.value = e.target.checked
    ? productStore.productData.map(p => p.id)
    : [];
}

const copy = async () => {
  const res = await copyData(selectedIds.value, 'products')
  if (res) {
    await productStore.fetchProducts()
    selectedIds.value = []
    isChecked.value = false
  }
}

const deleteValue = async () => {
  const res = await deleteData(selectedIds.value, 'products')
  if (res) {
    await productStore.fetchProducts()
    selectedIds.value = []
    isChecked.value = false
  }
}

const handleFileChange = (event) => {
  zipFile.value = event.target.files[0];
  isShow.value = true;
  errors.value = false
}

const uploadFile = async () => {
  if (!zipFile.value) return;

  const formData = new FormData();
  formData.append("zip_file", zipFile.value);

  try {
    // Gửi file ZIP lên server Laravel
    const response = await axiosConfig.post("/products/upload-zip", formData);
    await productStore.fetchProducts()
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 422) {
      // Lưu các lỗi vào biến `errors` để hiển thị
      errors.value = error.response.data.errors || {};
    }
  } finally {
    zipFile.value = null
    isShow.value = false;
  }
}

const blockProduct = async () => {
  if (isToggle.value === 1) {
    isToggle.value = 0
    return await productStore.fetchProducts()
  }
  isToggle.value = 1
  return await productStore.fetchProducts('blockProduct')
}

const restoreProduct = async () => {
  const res = await restoreData(selectedIds.value, 'products')
  if (res) {
    selectedIds.value = []
    isChecked.value = false
    isToggle.value = 0
    await productStore.fetchProducts()
  }
}

const changeStatus = async (id) => {
  const res = await changeStatusData(id, 'products');
  if (res && res.data.code === 200) {
    await productStore.fetchProducts()
  }
}


</script>