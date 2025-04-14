import {
  defineStore
} from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  actions: {
    addToCart(product, selectedAttributes, qty) {
      // Tạo một "unique key" cho sản phẩm dựa trên thuộc tính đã chọn và ID sản phẩm
      const productKey = `${product.id}-${JSON.stringify(selectedAttributes)}`;

      // Tìm xem sản phẩm với thuộc tính đã chọn có trong giỏ hàng chưa
      const existingProduct = this.items.find(item => item.productKey === productKey);

      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingProduct.quantity += qty;
      } else {
        // Nếu chưa có trong giỏ hàng, thêm mới
        this.items.push({
          product,
          selectedAttributes,
          quantity: qty,
          productKey, // Thêm khóa duy nhất để phân biệt sản phẩm theo thuộc tính
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