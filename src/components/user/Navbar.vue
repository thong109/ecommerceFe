<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
    navbar-main navbar-scroll="true">
    <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
      <nav>
        <!-- breadcrumb -->
        <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
          <li class="text-sm leading-normal">
            <a class="opacity-50 text-slate-700" href="javascript:;">Pages</a>
          </li>
          <li
            class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
            aria-current="page">{{ props.title }}</li>
        </ol>
        <h6 class="mb-0 font-bold capitalize">{{ props.title }}</h6>
      </nav>

      <div class="justify-end items-center mt-2 grow sm:mt-0 md:mr-0 flex basis-auto">
        <div class="flex items-center md:ml-auto md:pr-4">
          <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
            <span
              class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
              <i class="fas fa-search"></i>
            </span>
            <input type="text"
              class="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-black-300 focus:outline-none focus:transition-shadow"
              placeholder="Type here..." />
          </div>
        </div>
        <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
          <li class="flex items-center">
            <button class="block ml-2 px-0 py-2 text-sm font-semibold transition-all ease-nav-brand text-slate-500"
              @click="logout">
              <i class="fa fa-user sm:mr-1"></i>
              <span class="hidden sm:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const props = defineProps(['title'])
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout(router)
}
</script>