<template>
  <main>
    <section class="page-hero py-16">
      <div class="container">
        <div class="text-center">
          <ul
            class="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
            <li class="leading-none text-dark">
              <router-link class="inline-flex items-center text-primary" to="/">
                <svg class="mr-1.5" width="15" height="15" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
                    fill="black"></path>
                </svg>
                <span class="text-sm leading-none">Home</span>
              </router-link>
            </li>
            <li class="leading-none text-dark">
              <span class="text-sm leading-none">/ Career</span>
            </li>
          </ul>
        </div>
        <div class="page-hero-content mx-auto max-w-[768px] text-center">
          <h1 class="mb-5 mt-8">Career In Pinwheel</h1>
          <p>
            Donec sollicitudin molestie malesda. Donec sollitudin molestie malesuada
            Mauris pellentesque nec egestas non nisi Cras
          </p>
        </div>
        <div class="mt-14 flex justify-center">
          <div class="relative">
            <img src="https://themewagon.github.io/pinwheel/images/career/career-hero-img-1.png" alt="">
            <img
              class="absolute -left-[8%] bottom-[12%] z-[-1] h-20 w-20 -rotate-90 lg:-left-8 lg:bottom-4 lg:h-[150px] lg:w-[150px]"
              src="https://themewagon.github.io/pinwheel/images/shape.svg" alt="">
          </div>
          <div class="relative -ml-[10%] mt-[10%] lg:-ml-[6%] lg:mt-[6%]">
            <img src="https://themewagon.github.io/pinwheel/images/career/career-hero-img-2.png" alt="">
            <img class="absolute -right-4 -bottom-4 z-[-1] h-16 w-16 -rotate-90"
              src="https://themewagon.github.io/pinwheel/images/shape.svg" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="mx-auto text-center lg:col-8">
            <h2>Open positions</h2>
            <p class="mt-4">
              Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor amet,
              consectetur <br>
              adipiscing elit. Praesent sapien massa, convallis
            </p>
            <div class="relative mt-4">
              <input v-model="search" type="text" placeholder="Search..."
                class="w-full pl-10 pr-10 py-2 border rounded-lg" />

              <!-- Icon search -->
              <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>

              <!-- Icon clear -->
              <svg v-if="search" @click="handleClickDelete"
                class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <ul class="flex gap-2">
              <li>
                <button :class="['filter-btn btn btn-sm', selectedCategory === 'All' ? 'filter-btn-active' : '']"
                  @click="clickFilter('All')">All Categories</button>
              </li>
              <li>
                <button :class="['filter-btn btn btn-sm', selectedCategory === 'Design' ? 'filter-btn-active' : '']"
                  @click="clickFilter('Design')">Design</button>
              </li>
              <li>
                <button
                  :class="['filter-btn btn btn-sm', selectedCategory === 'Development' ? 'filter-btn-active' : '']"
                  @click="clickFilter('Development')">Development</button>
              </li>
              <li>
                <button :class="['filter-btn btn btn-sm', selectedCategory === 'Marketing' ? 'filter-btn-active' : '']"
                  @click="clickFilter('Marketing')">Marketing</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row mt-12">
          <div class="row" v-if="paginatedData.length > 0">
            <div class="mb-8 md:col-6" v-for="data in paginatedData" :key="data.id">
              <div class="rounded-xl bg-white p-5 shadow-lg lg:p-10">
                <h3 class="h4">{{ data.name }}</h3>
                <p class="mt-6">{{ data.detail }}</p>
                <ul class="mt-6 flex flex-wrap items-center text-dark">
                  <li class="my-1 mr-8 inline-flex items-center">
                    <svg class="mr-1" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                        fill="currentColor"></path>
                    </svg>
                    {{ data.time }}
                  </li>
                  <li class="my-1 mr-8 inline-flex items-center">
                    <svg class="mr-1" width="16" height="20" viewBox="0 0 23 33" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.5007 0.970703C5.61504 0.970703 0.824219 5.75958 0.824219 11.6472C0.824219 20.1359 10.3612 31.2259 10.7669 31.6956L11.5007 32.5401L12.2345 31.6937C12.6402 31.2259 22.1772 20.1359 22.1772 11.6472C22.1772 5.75958 17.3863 0.970703 11.5007 0.970703ZM11.5007 29.5351C9.2761 26.7709 2.7654 18.1229 2.7654 11.6472C2.7654 6.83111 6.68463 2.91188 11.5007 2.91188C16.3167 2.91188 20.236 6.83111 20.236 11.6472C20.236 18.1171 13.7253 26.7709 11.5007 29.5351ZM11.5007 6.09347C8.28998 6.09347 5.67716 8.70629 5.67716 11.917C5.67716 15.1277 8.28998 17.7405 11.5007 17.7405C14.7114 17.7405 17.3242 15.1277 17.3242 11.917C17.3242 8.70629 14.7114 6.09347 11.5007 6.09347ZM11.5007 15.7993C9.35957 15.7993 7.61834 14.0581 7.61834 11.917C7.61834 9.77588 9.35957 8.03464 11.5007 8.03464C13.6418 8.03464 15.383 9.77588 15.383 11.917C15.383 14.0581 13.6418 15.7993 11.5007 15.7993Z"
                        fill="currentColor"></path>
                    </svg>
                    {{ data.location }}
                  </li>
                  <li class="my-1 mr-8">
                    <router-link :to="`/career/${data.id}`"
                      class="inline-flex items-center font-semibold text-primary">Read More
                      <img class="ml-1.5" src="https://themewagon.github.io/pinwheel/images/icons/arrow-right.svg"
                        alt="">
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="mb-8 col-12 text-center">
              No item...
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-6 space-x-2">
          <button class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100" :disabled="currentPage === 1"
            @click="currentPage--">
            ←
          </button>

          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-1 rounded-md border"
            :class="{
              'bg-blue-500 text-white border-blue-500': currentPage === page,
              'hover:bg-gray-100 border-gray-300': currentPage !== page
            }">
            {{ page }}
          </button>

          <button class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            :disabled="currentPage === totalPages" @click="currentPage++">
            →
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const search = ref('')
const selectedCategory = ref('All')
const datas = inject('datas')

const currentPage = ref(1)
const itemsPerPage = 6

const paginatedData = computed(() => {
  const keyword = search.value.toLowerCase()

  const filtered = Object.values(datas).filter(item => {
    const matchKeyword = item.name.toLowerCase().includes(keyword) || item.location.toLowerCase().includes(keyword)
    const matchCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value
    return matchKeyword && matchCategory
  })

  totalFiltered.value = filtered.length

  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  return filtered.slice(start, end)
})

const totalFiltered = ref(0)
const totalPages = computed(() => Math.ceil(totalFiltered.value / itemsPerPage))

const handleClickDelete = () => {
  search.value = ''
}

const clickFilter = (category) => {
  selectedCategory.value = category
}

</script>