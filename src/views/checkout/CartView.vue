<template>
  <Loading :isLoading="cartStore.isLoading" />
  <section class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__text">
            <h4>Shopping Cart</h4>
            <div class="breadcrumb__links">
              <a href="./index.html">Home</a>
              <a href="./shop.html">Shop</a>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="shopping-cart spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="shopping__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in cartStore.carts" :key="cart.id">
                  <td class="product__cart__item col-6">
                    <div class="product__cart__item__pic">
                      <img :src="getAvatarUrl(cart.product.image)" width="100" height="100" :alt="cart.product.name">
                    </div>
                    <div class="product__cart__item__text">
                      <h6>{{ cart.product.name }}</h6>
                      <h5>{{ formatPrice(cart.product.price) }}</h5>
                      <small v-for="(value, key) in cart.attributes" :key="key" class="d-flex align-items-center small">
                        <b>{{ key }}:</b>
                        <p class="m-0 ms-2">{{ value }}</p>
                      </small>
                    </div>
                  </td>
                  <td class="quantity__item col-2">
                    <div class="quantity">
                      <div class="pro-qty-2">
                        <input type="number" v-model.number="cart.qty" @keydown="(e) => onKeyDown(e, cart)"
                          @keyup="updateQty" />
                      </div>
                    </div>
                  </td>
                  <td class="cart__price col-3">{{ formatPrice(cart.product.price * cart.qty) }}</td>
                  <td class="cart__close col-1">
                    <button class="border-0 bg-transparent" type="button" @click="deleteItem(cart.id)"><i
                        class="bi bi-x-lg bg-transparent"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="continue__btn">
                <router-link to="/shop/">Continue Shopping</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="cart__discount">
            <h6>Discount codes</h6>
            <form action="#">
              <input type="text" placeholder="Coupon code">
              <button type="submit">Apply</button>
            </form>
          </div>
          <div class="cart__total">
            <h6>Cart total</h6>
            <ul>
              <li>Subtotal <span>$ 169.50</span></li>
              <li>Total <span>{{ total }}</span></li>
            </ul>
            <a href="#" class="primary-btn">Proceed to checkout</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loading from '@/components/Loading.vue';
import { formatPrice, getAvatarUrl } from '@/helpers/formatted';
import { useCartStore } from '@/stores/cart';
import { computed, onMounted } from 'vue';

const cartStore = useCartStore()
const total = computed(() => cartStore.totalQty)

const updateQty = (e) => {
  console.log('Giá trị sau khi thay đổi:', e.target.value)
}

const onKeyDown = (e, cart) => {
  if (e.key === 'ArrowUp') {
    console.log(e.target.value);

    cart.qty++
    e.preventDefault()
  }

  if (e.key === 'ArrowDown') {
    if (cart.qty > 1) {
      cart.qty--
      e.preventDefault()
    }
  }
}

const deleteItem = async (id) => {
  await cartStore.removeFromCart(id)
 }

onMounted(async () => {
  await cartStore.fetchCart()
})

</script>