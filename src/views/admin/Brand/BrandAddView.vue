<template>
  <div class="app-title align-items-center">
    <ul class="app-breadcrumb breadcrumb mb-0">
      <li class="breadcrumb-item">Danh sách thương hiệu</li>
      <li class="breadcrumb-item">Thêm thương hiệu</li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <h3 class="tile-title">Tạo mới thương hiệu</h3>
        <div class="tile-body">
          <form class="row" @submit.prevent="submitBrand">
            <div class="form-group col-md-3">
              <label class="control-label">Tên thương hiệu</label>
              <input class="form-control" type="text" v-model="brand.name">
            </div>
            <div class="form-group col-md-3 ">
              <label for="exampleSelect1" class="control-label">Trạng thái</label>
              <select class="form-control" id="exampleSelect1" v-model="brand.status">
                <option disabled>-- Chọn trạng thái --</option>
                <option value="1">Hiện</option>
                <option value="0">Ẩn</option>
              </select>
            </div>
            <div class="form-group col-md-12">
              <div class="control-label mb-2">Ảnh thương hiệu</div>
              <div id="myfileupload">
                <input type="file" id="uploadfile" ref="fileInput" name="ImageUpload" hidden @change="handleFileChange"
                  accept="image/*" />
              </div>
              <div id="thumbbox" v-if="previewImage">
                <img :src="getAvatarUrl(previewImage)" alt="Thumb image" id="thumbimage" height="450" width="400" />
                <button class="removeimg mb-0" type="button" @click="removeImage">×</button>
              </div>
              <div id="boxchoice">
                <label for="uploadfile" class="Choicefile p-2 rounded-2 fw-semibold mb-0">
                  <i class="bi bi-cloud-arrow-up-fill mr-2"></i>Chọn ảnh
                </label>
              </div>
            </div>
            <!-- <div class="form-group col-md-12">
              <label class="control-label">Mô tả thương hiệu</label>
              <textarea class="form-control" name="mota" id="mota"></textarea>
            </div> -->

            <div class="col-12">
              <button class="btn btn-small btn-outline-primary" type="submit">Lưu lại</button>
            </div>
            <!-- <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAvatarUrl } from '@/helpers/formatted'
import { useBrandStore } from '@/stores/brand'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const brandStore = useBrandStore()
const router = useRouter()
const route = useRoute()

const fileInput = ref(null)
const previewImage = ref(null)

const brandId = computed(() => route.params.id);
watch(() => brandStore.previewImage, (val) => {
  previewImage.value = val;
}, { immediate: true });

// computed brand
const brand = computed(() => brandStore.brand);

watch(brandId, (id) => {
  if (id) brandStore.showBrand(id);
}, { immediate: true });

const handleFileChange = (event) => {
  const file = event.target.files[0]

  // Kiểm tra loại file (chỉ cho phép hình ảnh)
  if (file && file.type.startsWith('image/')) {
    // Kiểm tra kích thước file (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('Ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn 5MB!')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result // Gán ảnh xem trước
    }
    reader.readAsDataURL(file)

    // Cập nhật vào brand.image
    brand.value.image = file // Sử dụng .value khi cập nhật vào `ref`
  } else {
    alert('Vui lòng chọn file ảnh hợp lệ!')
  }
}

const removeImage = () => {
  previewImage.value = null
  brand.value.image = null
  if (fileInput.value) {
    fileInput.value.value = '' // reset input file safely
  }
}

const submitBrand = async () => {
  const formData = new FormData()
  // Thêm thông tin brand vào FormData
  formData.append('name', brand.value.name)
  formData.append('status', brand.value.status)

  // Thêm ảnh vào FormData
  if (brand.value.image) {
    formData.append('image', brand.value.image)
  }

  try {
    if (brandId.value) {
      await brandStore.editBrand(brandId.value, formData, router)
    } else {
      await brandStore.addBrand(formData, router)
    }
  } catch (error) {
    console.error(error)
    alert('Có lỗi xảy ra khi thêm thương hiệu!')
  }
}
</script>