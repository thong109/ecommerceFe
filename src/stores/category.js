import {
  defineStore
} from 'pinia'
import axiosConfig from '@/helpers/axiosConfig'
import {
  ref
} from 'vue'
import {
  toast
} from 'vue3-toastify'

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(true)

  const data = ref([])
  const category = ref({
    name: '',
    status: '',
    image: null,
    attributes: [{
      name: '',
      values: ['']
    }]
  })

  const previewImage = ref(null)

  async function fetchProductByCategory() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/categories')
      const categories = res.data
      data.value = categories
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCategories() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/categories/all')
      data.value = res.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function addCategory(formData, router) {
    try {
      const res = await axiosConfig.post('/categories/store', formData)
      resetCategory()
      router.push({
        name: 'category',
      })
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          errors: error.response.data.errors,
          code: 404
        }
      }
    }
  }

  async function fetchCategory(id) {
    isLoading.value = true
    try {
      const res = await axiosConfig.get(`/categories/show/${id}`)

      // Gán lại vào category form

      category.value = {
        name: res.data.name || '',
        status: res.data.status,
        image: '', // giữ trống nếu đang chờ người dùng upload lại
        attributes: res.data.attributes || []
      }
      previewImage.value = res.data.image_url || null
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function updateCategory(id, formData, router) {
    try {
      formData.append('_method', 'PUT')
      await axiosConfig.post(`/categories/update/${id}`, formData)
      resetCategory()
      router.push({
        name: 'category'
      })
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  async function resetCategory() {
    category.value = {
      name: '',
      status: '',
      image: '',
      attributes: [{
        name: '',
        values: ['']
      }]
    }
  }

  return {
    isLoading,
    data,
    category,
    previewImage,
    fetchProductByCategory,
    fetchCategories,
    addCategory,
    fetchCategory,
    updateCategory,
    resetCategory
  }
})