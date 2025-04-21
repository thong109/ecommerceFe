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
    created_at: '',
    user_info: {
      phone: '',
      address: '',
      avatar: '',
      location: '',
      description: ''
    },
  })

  const wishlists = ref([])
  const usersData = ref([])

  async function fetchUser() {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/user')
      const user = res.data

      data.value.id = user.id
      data.value.name = user.name
      data.value.email = user.email
      data.value.created_at = user.created_at
      data.value.user_info = {
        phone: user.user_info?.phone ?? '',
        address: user.user_info?.address ?? '',
        avatar: user.user_info?.avatar ?? '',
        location: user.user_info?.location ?? '',
        description: user.user_info?.description ?? ''
      }
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function updateUserProfile() {
    try {
      const formData = new FormData();
      formData.append('name', data.value.name);

      const userInfo = data.value.user_info;
      formData.append('user_info[phone]', userInfo.phone);
      formData.append('user_info[address]', userInfo.address);
      formData.append('user_info[location]', userInfo.location);
      formData.append('user_info[description]', userInfo.description);

      if (userInfo.avatar instanceof File) {
        formData.append('user_info[avatar]', userInfo.avatar);
      }

      const res = await axiosConfig.post(`/user/update/${data.value.id}`, formData)
      toast.success(res.data.message)
      fetchUser()
    } catch (e) {
      console.error(e)
    }
  }

  const fetchAllUser = async () => {
    isLoading.value = true
    try {
      const res = await axiosConfig.get('/users')
      usersData.value = res.data.users
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    data,
    usersData,
    fetchUser,
    fetchAllUser,
    updateUserProfile,
  }
})