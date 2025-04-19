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
import {
  toast
} from 'vue3-toastify';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    carts: [],
    isLoading: false,
    discount: []
  }),

  actions: {
    async addToCart(productId, selectedAttributes, price, qty = 1) {
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
          qty: Number(qty),
          price: Number(price)
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
      if (res) {
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
    deleteCoupon() {
      localStorage.removeItem('applied_coupon')
      this.discount = [];
    },
    async checkCoupon(code) {
      try {
        const res = await axiosConfig.post('/check-coupon', {
          code: code
        })
        if (res) {
          this.discount = res.data
          if (this.discount.valid) toast.success(this.discount.message)
          if (!this.discount.valid) toast.error(this.discount.message)
          localStorage.setItem('applied_coupon', JSON.stringify(this.discount));
          return true
        }
      } catch (error) {
        console.log(error);
        return false
      }
    },
    restoreCouponFromStorage() {
      const saved = localStorage.getItem('applied_coupon');
      if (saved) {
        this.discount = JSON.parse(saved);
      }
    },
    async checkoutCart(formData) {
      try {
        const response = await axiosConfig.post('/checkout', formData);
        if (response.data.code === 200) {
          alert('Thanh toán thành công!');
          this.deleteCoupon()
          this.fetchCart()
        } else {
          alert('Thanh toán không thành công!');
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          return {
            errors: error.response.data.errors,
            code: 404
          }
        }
      }
    }
  },
  getters: {
    countCartItems() {
      return this.carts.length
    },
    getCartItems: (state) => state.carts,
    totalQty: (state) => {
      return state.carts.reduce((total, item) => total + (item.qty || 0), 0)
    },
    totalPrice: (state) => {
      return state.carts.reduce((total, item) => {
        return total + item.price;
      }, 0)
    },
    discountedTotalPrice: (state) => {
      if (state.discount.type === 'percent') {
        return state.totalPrice * (1 - state.discount.discount / 100)
      }
      return state.totalPrice - state.discount.discount;
    }
  }
});