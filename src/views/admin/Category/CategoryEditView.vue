<template>
  <div class="app-title align-items-center">
    <ul class="app-breadcrumb breadcrumb mb-0">
      <li class="breadcrumb-item">Danh sách danh mục</li>
      <li class="breadcrumb-item">Thêm danh mục</li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <h3 class="tile-title">Tạo mới danh mục</h3>
        <div class="tile-body">
          <form class="row" @submit.prevent="submitCategory">
            <div class="form-group col-md-3">
              <label class="control-label">Tên danh mục</label>
              <input class="form-control" type="text" v-model="category.name">
            </div>
            <div class="form-group col-md-3 ">
              <label for="exampleSelect1" class="control-label">Tình trạng</label>
              <select class="form-control" id="exampleSelect1" v-model="category.status">
                <option disabled :value="null">-- Chọn tình trạng --</option>
                <option :value="1">Hiện</option>
                <option :value="0">Ẩn</option>
              </select>
            </div>
            <!-- Danh sách thuộc tính -->
            <div class="form-group mb-3">
              <label class="d-block control-label">Thuộc tính</label>
              <div v-for="(attr, index) in category.attributes" :key="index" class="mb-3">
                <!-- Tên thuộc tính -->
                <input type="text" class="form-control mb-2" v-model="attr.name" placeholder="Tên thuộc tính"
                  :class="{ 'is-invalid': duplicateAttrIndexes.has(index) || isEmptyValue(attr.name) }" />
                <!-- Giá trị thuộc tính -->
                <div v-for="(_, i) in attr.values" :key="i" class="d-flex align-items-center mb-3">
                  <input type="text" class="form-control me-2" v-model="attr.values[i]" placeholder="Giá trị..." :class="{
                    'is-invalid': getDuplicateValueIndexes(attr.values).has(i) || isEmptyValue(attr.values[i])
                  }" />
                  <button type="button" class="btn btn-danger btn-sm mb-0" @click="removeValue(index, i)">X</button>
                </div>
                <button type="button" class="btn btn-secondary btn-sm mb-0" @click="addValue(index)">
                  <i class="bi bi-plus-lg"></i> Thêm giá trị
                </button>
                <hr />
                <button type="button" class="btn btn-outline-danger btn-sm mb-0" @click="removeAttribute(index)">
                  Xoá thuộc tính này
                </button>
              </div>

              <button type="button" class="btn btn-sm btn-outline-primary mb-0" @click="addAttribute">
                + Thêm thuộc tính
              </button>
            </div>
            <div class="form-group col-md-12">
              <div class="control-label mb-2">Ảnh sản phẩm</div>
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
              <label class="control-label">Mô tả sản phẩm</label>
              <textarea class="form-control" name="mota" id="mota"></textarea>
            </div> -->

            <button class="btn btn-save" type="submit">Lưu lại</button>
            <!-- <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAvatarUrl } from '@/helpers/formatted'
import { useCategoryStore } from '@/stores/category'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const categoryStore = useCategoryStore()
const router = useRouter()
const route = useRoute()
const fileInput = ref(null)
const previewImage = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]

  if (file && file.type.startsWith('image/')) {
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('Ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn 5MB!')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)

    category.image = file // Cập nhật ảnh vào category
  } else {
    alert('Vui lòng chọn file ảnh hợp lệ!')
  }
}

const removeImage = () => {
  previewImage.value = null
  category.image = null
  if (fileInput.value) {
    fileInput.value.value = '' // reset input file safely
  }
}

// Sử dụng `computed` để đảm bảo category có giá trị mặc định
const category = computed(() => {
  // Đảm bảo category luôn có giá trị mặc định
  previewImage.value = categoryStore.previewImage
  return categoryStore.category || { attributes: [] }
})

const addAttribute = () => {
  // Kiểm tra và đảm bảo category.attributes là mảng
  if (Array.isArray(category.value.attributes)) {
    category.value.attributes.push({
      name: '',
      values: ['']
    })
  }
}

const removeAttribute = (index) => {
  category.value.attributes.splice(index, 1)
}

const addValue = (attrIndex) => {
  category.value.attributes[attrIndex].values.push('')
}

const removeValue = (attrIndex, valIndex) => {
  category.value.attributes[attrIndex].values.splice(valIndex, 1)
}

const duplicateAttrIndexes = computed(() => {
  const seen = {}
  const duplicates = new Set()

  if (Array.isArray(category.value.attributes)) {
    category.value.attributes.forEach((attr, index) => {
      const name = attr.name.trim().toLowerCase()
      if (seen[name] !== undefined) {
        duplicates.add(index)
        duplicates.add(seen[name])
      } else {
        seen[name] = index
      }
    })
  }

  return duplicates
})

const getDuplicateValueIndexes = (values) => {
  const seen = {}
  const duplicates = new Set()

  values.forEach((val, i) => {
    const normalized = normalizeValue(val)
    if (!normalized) return // Bỏ qua ô trống

    if (seen[normalized] !== undefined) {
      duplicates.add(i)
      duplicates.add(seen[normalized])
    } else {
      seen[normalized] = i
    }
  })

  return duplicates
}

const normalizeValue = (val) => {
  return val.replace(/[\[\]]/g, '').trim().toLowerCase()
}

const isEmptyValue = (val) => {
  return !val || val.trim() === ''
}

const hasEmptyValues = () => {
  return category.value.attributes.some(attr =>
    attr.values.some(val => isEmptyValue(val))
  )
}

const hasDuplicateValues = () => {
  return category.value.attributes.some(attr => {
    const dup = getDuplicateValueIndexes(attr.values)
    return dup.size > 0
  })
}

const hasEmptyAttributeNames = () => {
  return category.value.attributes.some(attr => isEmptyValue(attr.name))
}

const submitCategory = async () => {
  if (duplicateAttrIndexes.value.size > 0) {
    alert('Tên thuộc tính bị trùng, vui lòng sửa lại.')
    return
  }

  if (hasDuplicateValues()) {
    alert('Có giá trị bị trùng trong một số thuộc tính.')
    return
  }

  if (hasEmptyAttributeNames()) {
    alert('Có thuộc tính chưa nhập tên, vui lòng kiểm tra.')
    return
  }

  if (hasEmptyValues()) {
    alert('Có ô giá trị bị bỏ trống, vui lòng kiểm tra.')
    return
  }

  const formData = new FormData()

  // Thêm thông tin category vào FormData
  formData.append('name', category.value.name)
  formData.append('status', category.value.status)

  // Thêm ảnh vào FormData nếu có ảnh
  if (category.value.image) {
    formData.append('image', category.value.image)
  }

  // Thêm các thuộc tính vào FormData
  category.value.attributes.forEach((attr, index) => {
    formData.append(`attributes[${index}][name]`, attr.name)
    attr.values.forEach((val, valueIndex) => {
      formData.append(`attributes[${index}][values][${valueIndex}]`, val)
    })
  })

  await categoryStore.updateCategory(route.params.id, formData, router)
}

onMounted(async () => {
  await categoryStore.fetchCategory(route.params.id)
})
</script>
