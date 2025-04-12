import {
  defineStore
} from 'pinia'
import axiosConfig from '@/helpers/axiosConfig'
import {
  ref
} from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(true)

  const data = ref([])

  async function fetchCategories() {
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

  return {
    isLoading,
    data,
    fetchCategories,
  }
})