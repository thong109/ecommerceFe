import {
  defineStore
} from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  actions: {
    addToCart(product) {
      const existingProduct = this.items.find(item => item.product.id === product.id);
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingProduct.quantity += 1;
      } else {
        // Nếu chưa có trong giỏ hàng, thêm mới
        console.log(2);

        this.items.push({
          product,
          quantity: 1,
        });
      }

      console.log(this.items);

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
  },
});