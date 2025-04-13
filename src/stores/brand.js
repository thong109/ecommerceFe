import {
  defineStore
} from 'pinia'
import axiosConfig from '@/helpers/axiosConfig'
import {
  ref
} from 'vue'

export const useBrandStore = defineStore('brand', () => {
  const isLoading = ref(true)

  const data = ref([])

  async function fetchBrands() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/brands')
      const brands = res.data
      data.value = brands
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    data,
    fetchBrands,
  }
})
