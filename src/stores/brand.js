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

export const useBrandStore = defineStore('brand', () => {
  const isLoading = ref(true)

  const data = ref([])
  const brand = ref({
    name: '',
    status: '',
    image: null,
  })
  const previewImage = ref(null)

  async function fetchProductByBrand() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/brands')
      data.value = res.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchBrands() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/brands/all')
      data.value = res.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function showBrand(id) {
    try {
      const res = await axiosConfig.get(`/brands/show/${id}`)
      brand.value = {
        name: res.data.name,
        status: res.data.status,
        image: null,
      }
      previewImage.value = res.data.image
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function addBrand(formData, router) {
    try {
      const res = await axiosConfig.post('/brands/store', formData)
      router.push(`/admin/brand/edit/${res.data.brandId}`);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          errors: error.response.data.errors,
          code: 404
        }
      }
    }
  }

  async function editBrand(id, formData, router) {
    try {
      formData.append('_method', 'PUT')
      await axiosConfig.post(`/brands/update/${id}`, formData)
      resetFormBrand()
      router.push({
        name: 'brand'
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          errors: error.response.data.errors,
          code: 404
        }
      }
    }
  }

  async function deleteBrand(id) {
    isLoading.value = true
    try {
      const res = await axiosConfig.post(`/brand/destroy/${id}`)
      toast.success(res.data.message)
      fetchBrands()
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data.message)
      } else {
        console.log(e);
      }
    } finally {
      isLoading.value = false
    }
  }
  async function resetFormBrand() {
    brand.value = {
      name: '',
      status: '',
      image: null,
    }
    previewImage.value = null
  }

  return {
    isLoading,
    data,
    brand,
    previewImage,
    fetchProductByBrand,
    fetchBrands,
    addBrand,
    resetFormBrand,
    showBrand,
    editBrand,
    deleteBrand
  }
})