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
          <div class="row element-button" v-if="!isToggle">
            <div class="col-sm-2">
              <router-link to="/admin/category/add" class="btn btn-add btn-sm" title="Thêm"><i
                  class="bi bi-plus-lg"></i>
                Tạo mới danh mục</router-link>
            </div>
            <div class="col-sm-2">
              <a class="btn btn-excel btn-sm" href="" title="In"><i class="bi bi-filetype-csv"></i> Xuất Excel</a>
            </div>
            <div class="col-sm-2">
              <button @click="deleteValue" class="btn btn-delete btn-sm" type="button" title="Xóa"><i
                  class="bi bi-trash"></i> Xóa tất cả </button>
            </div>
            <div class="col-sm-2">
              <button @click="blockCategory" class="btn btn-delete btn-sm" type="button" title="Category"><i
                  class="bi bi-arrows-expand-vertical"></i> Danh sách xóa </button>
            </div>
          </div>
          <div class="row element-button" v-else>
            <div class="col-sm-2">
              <button @click="restoreCategory" class="btn btn-delete btn-sm" type="button" title="Category"><i
                  class="bi bi-arrow-clockwise"></i> Khôi phục </button>
            </div>
            <div class="col-sm-2">
              <button @click="blockCategory" class="btn btn-delete btn-sm" type="button" title="Category"><i
                  class="bi bi-back"></i> Danh mục</button>
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
                <th><input type="checkbox" id="all" @change="toggleAll" :checked="isChecked"></th>
                <th>Tên sản phẩm</th>
                <th class="text-center">Ảnh</th>
                <th class="text-center">Trạng thái</th>
                <th class="text-center">Tính năng</th>
              </tr>
            </thead>
            <tbody v-if="categoryStore.data.length > 0">
              <tr v-for="category in categoryStore.data" :key="category.id">
                <td><input type="checkbox" name="check1" v-model="selectedIds" :value="category.id"></td>

                <td>{{ category.name }}</td>
                <td><img class="img-card-person" :src="getAvatarUrl(category.image)" :alt="category.name"></td>
                <td class="text-center">
                  <button class="px-3 py-1 border-0 badge bg-info" type="button" v-if="category.status === 1"
                    @click="changeStatus(category.id)"><i class="bi bi-eye-fill"></i></button>
                  <button class="px-3 py-1 border-0 badge bg-danger" type="button" v-else
                    @click="changeStatus(category.id)"><i class="bi bi-eye-slash-fill"></i></button>
                </td>
                <td class="text-center">
                  <button type="button" @click="handleDeleteCategory(category.id)" v-if="!isToggle"
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
                <td colspan="5" class="text-center">
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
import { getAvatarUrl } from "@/helpers/formatted";
import Loading from '@/components/Loading.vue';
import { useCategoryStore } from '@/stores/category';
import { changeStatusData, deleteData, restoreData } from '@/helpers/getData';
import { toast } from 'vue3-toastify';

const categoryStore = useCategoryStore()
const selectedIds = ref([])
const isChecked = ref(false)
const isToggle = ref(0)

onMounted(async () => {
  await categoryStore.fetchCategories()
})

const toggleAll = (e) => {
  isChecked.value = true
  selectedIds.value = e.target.checked
    ? categoryStore.data.map(p => p.id)
    : [];
}

const handleDeleteCategory = async (id) => {
  const res = await deleteData([id], 'categories')
  if (res.data.code === 422) {
    const blocked = res.data.blocked;
    blocked.forEach(name => {
      toast.error(`Danh mục ${name} đang có sản phẩm`)
    });
    return
  }
  await categoryStore.fetchCategories()
}

const deleteValue = async () => {
  const res = await deleteData(selectedIds.value, 'categories')
  if (res) {
    if (res.data.code === 422) {
      const blocked = res.data.blocked;
      blocked.forEach(name => {
        toast.error(`Danh mục ${name} đang có sản phẩm`)
      });
    }
    await categoryStore.fetchCategories()
    selectedIds.value = []
    isChecked.value = false
  }
}

const blockCategory = async () => {
  isChecked.value = false
  selectedIds.value = []

  if (isToggle.value === 1) {
    isToggle.value = 0
    return await categoryStore.fetchCategories()
  }
  isToggle.value = 1
  return await categoryStore.fetchCategories('blockCategory')
}

const restoreCategory = async () => {
  const res = await restoreData(selectedIds.value, 'categories')
  if (res) {
    selectedIds.value = []
    isChecked.value = false
    isToggle.value = 0
    await categoryStore.fetchCategories()
  }
}

const changeStatus = async (id) => {
  const res = await changeStatusData(id, 'categories');
  if (res && res.data.code === 200) {
    await categoryStore.fetchCategories()
  }
}

</script>