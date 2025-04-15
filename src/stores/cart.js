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
    items: [],
  }),

  actions: {
    async addToCart(id, selectedAttributes, qty) {
      const quantity = Number(qty);
      const rawAttributes = toRaw(selectedAttributes);

      const productKey = `${id}-${JSON.stringify(rawAttributes)}`;

      // Tìm sản phẩm trong giỏ hàng theo productKey
      let cartItem = this.items.find(item => item.productId.id === id);

      if (!cartItem) {
        // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới
        this.items.push({
          productId: {
            id
          }, // Lưu sản phẩm dưới dạng plain object, chứa id
          attrs: [{
            selectedAttributes: rawAttributes,
            quantity,
            productKey,
          }]
        });
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng, tìm thuộc tính (attrs) tương ứng
        const existingAttrIndex = cartItem.attrs.findIndex(attr => attr.productKey === productKey);

        if (existingAttrIndex !== -1) {
          // Nếu biến thể đã tồn tại, cập nhật số lượng
          cartItem.attrs[existingAttrIndex].quantity = quantity;
        } else {
          // Nếu biến thể mới, thêm vào attrs
          cartItem.attrs.push({
            selectedAttributes: rawAttributes,
            quantity,
            productKey,
          });
        }
      }

      // Lưu giỏ hàng vào localStorage sau khi chuyển đổi thành chuỗi JSON
      const authStore = useAuthStore();
      if (!authStore.token) {
        const cartData = JSON.stringify(this.items);
        localStorage.setItem('cart', cartData);
      }

      // Gửi dữ liệu giỏ hàng lên server nếu có token
      const res = await axiosConfig.post('/add-to-cart', toRaw(this.items));
      console.log(res);
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
    },
    updateQuantity(productId, quantity) {
      const product = this.items.find(item => item.product.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    saveCartToLocalStorage(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  },
});