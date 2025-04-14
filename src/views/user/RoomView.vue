<template>
  <div>
    <label for="category">Chọn danh mục:</label>
    <select v-model="selectedCategoryId" @change="fetchAttributes">
      <option value="" disabled>Chọn danh mục</option>
      <option v-for="cat in categoryStore.data" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>

    <div v-if="attributes.length">
      <h4 class="mt-3">Thuộc tính:</h4>
      <div v-for="attr in attributes" :key="attr.id" class="mb-2">
        <label :for="`attr-${attr.id}`">{{ attr.name }}</label>

        <div v-if="attr.values.length">
          <div v-for="value in attr.values" :key="value.id" class="form-check">
            <input type="checkbox" :id="`attr-${attr.id}-value-${value.id}`" :value="value.id"
              v-model="selectedAttributes[attr.id]" class="form-check-input" />
            <label :for="`attr-${attr.id}-value-${value.id}`" class="form-check-label">{{ value.value }}</label>
          </div>
        </div>

        <input v-else type="text" :id="`attr-${attr.id}`" v-model="selectedAttributes[attr.id]" class="form-control"
          placeholder="Nhập thông tin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosConfig from '@/helpers/axiosConfig'
import { useCategoryStore } from '@/stores/category'

const categories = ref([])
const selectedCategoryId = ref(null)
const attributes = ref([])
const selectedAttributes = ref({})

const categoryStore = useCategoryStore()

// Lấy các thuộc tính của danh mục đã chọn
const fetchAttributes = async () => {
  if (!selectedCategoryId.value) return

  try {
    const res = await axiosConfig.get(`/categories/${selectedCategoryId.value}/attributes`)
    attributes.value = res.data

    selectedAttributes.value = {}
    attributes.value.forEach(attr => {
      selectedAttributes.value[attr.id] = []  // Khởi tạo như một mảng để chứa các lựa chọn
    })
  } catch (error) {
    console.error("Error fetching attributes:", error)
  }
}

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>
