import {
  defineStore
} from 'pinia'
import axiosConfig from '@/helpers/axiosConfig'
import {
  ref
} from 'vue'
import { toast } from 'vue3-toastify'

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
      resetFormProduct()
      router.push('/admin/product/')
    } catch (error) {
      console.error('Add product error:', error)
      throw error
    }
  }

  async function resetFormProduct() {
    product.value = {
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
    };
  }

  async function deleteProduct(id) {
    isLoading.value = true

    try {
      const res = await axiosConfig.post(`/products/destroy/${id}`)
      toast.success(res.data.message)
      fetchProducts()
    } catch (error) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    productData,
    product,
    fetchProducts,
    addProduct,
    deleteProduct
  }
})