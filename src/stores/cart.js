import {
  defineStore
} from 'pinia';
import {
  useAuthStore
} from './auth';
import axiosConfig from '@/helpers/axiosConfig'
import {
  toRaw
} from 'vue';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    carts: [],
    isLoading: true
  }),

  actions: {
    async addToCart(productId, selectedAttributes, qty = 1) {
      // Tìm xem đã có sản phẩm này với đúng thuộc tính chưa

      const existingItem = this.cartItems.find(item =>
        item.id === productId &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      )

      if (existingItem) {
        existingItem.qty += Number(qty)
      } else {
        // Tạo mới item (tuỳ bạn truyền thêm name, image, price... từ component vào cũng được)
        this.cartItems.push({
          id: productId,
          selectedAttributes: {
            ...selectedAttributes
          },
          qty: Number(qty)
        })
      }

      // Lưu giỏ hàng vào localStorage sau khi chuyển đổi thành chuỗi JSON
      const authStore = useAuthStore();
      if (!authStore.token) {
        const cartData = JSON.stringify(this.cartItems);
        localStorage.setItem('cart', cartData);
      }

      // Gửi dữ liệu giỏ hàng lên server nếu có token
      const res = await axiosConfig.post('/add-to-cart', toRaw(this.cartItems));
      if(res) {
        this.cartItems = []
        this.fetchCart()
      }
    },
    async removeFromCart(productId) {
      try {
        const res = await axiosConfig.delete(`/carts/delete/${productId}`);
        if (res.data.code === 200) {
          this.fetchCart();
        }
      } catch (e) {
        console.log(e);
      }
    },
    updateQuantity(productId, quantity) {
      try {} catch (e) {}
    },
    saveCartToLocalStorage(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    async fetchCart() {
      this.isLoading = true
      try {
        const response = await axiosConfig.get('/carts/get')
        this.carts = response.data
        this.isLoading = false
      } catch (error) {
        this.error = 'Failed to load cart'
        this.isLoading = false
      }
    },
  },
  getters: {
    countCartItems() {
      return this.carts.length
    },
    getCartItems: (state) => state.carts,
    totalQty: (state) => {
      return state.carts.reduce((total, item) => total + (item.qty || 0), 0)
    },
  }
});