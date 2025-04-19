<template>
  <button type="button" @click.prevent="toggleWishlist" class="border rounded-2 bg-opacity-8 bg-dark-subtle">
    <i :class="['bi', isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart text-dark']">
    </i>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  productId: Number
})

const authStore = useAuthStore()

const isWishlisted = computed(() =>
  authStore.wishlists.some(w => w.product_id === props.productId)
)

const toggleWishlist = () => {
  authStore.toggle(props.productId)
}
</script>
