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

  const product = ref({
    name: '',
    quantity: '',
    status: '',
    price: '',
    cost: '',
    discounted: '',
    tag: '',
    image: null,
    short_desc: '',
    description: '',
    brand_id: '',
  });

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

  async function addProduct(formData, router) {
    try {
      await axiosConfig.post('/products/store', formData)
      router.push('/admin/products/')
    } catch (error) {
      console.error('Add product error:', error)
      throw error
    }
  }

  return {
    isLoading,
    productData,
    product,
    fetchProducts,
    addProduct,
  }
})