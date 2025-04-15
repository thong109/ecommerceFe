import {
  defineStore
} from 'pinia'
import axiosConfig from '@/helpers/axiosConfig'
import {
  ref
} from 'vue'

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(true)

  const productData = ref([])

  async function fetchProducts() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/products/all')
      productData.value = res.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    productData,
    fetchProducts,
  }
})