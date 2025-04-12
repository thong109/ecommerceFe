import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'
import axiosConfig from '@/helpers/axiosConfig' // hoặc đường dẫn bạn đang dùng
import {
  toast
} from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(true)

  const data = ref({
    id: null,
    name: '',
    email: '',
    user_info: {
      phone: '',
      address: '',
      avatar: '',
      location: '',
      description: ''
    },
    user_cvs: []
  })

  async function fetchUser() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/user')
      const user = res.data

      data.value.id = user.id
      data.value.name = user.name
      data.value.email = user.email
      data.value.user_info = {
        phone: user.user_info?.phone ?? '',
        address: user.user_info?.address ?? '',
        avatar: user.user_info?.avatar ?? '',
        location: user.user_info?.location ?? '',
        description: user.user_info?.description ?? ''
      }
      data.value.user_cvs = user.user_cvs ?? []
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function updateUserProfile() {
    try {
      const res = await axiosConfig.post(`/user/update/${data.value.id}`, data.value)
      toast.success(res.data.message)
      fetchUser()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isLoading,
    data,
    fetchUser,
    updateUserProfile
  }
})