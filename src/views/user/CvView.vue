<template>
  <form class="cv-container bg-white shadow-md rounded-xl overflow-hidden max-w-[210mm] w-full mx-auto relative"
    @submit.prevent="handleSubmitForm">
    <div class="border border-white py-10 px-10 mb-6 bg-white">
      <header>
        <ul>
          <li class="mb-2">
            <input class="w-full shadow-sm" v-model="profileForm.personal_info.linkedin_url"
              placeholder="Linkedin..." />
          </li>
          <li class="mb-2">
            <input class="w-full shadow-sm" v-model="profileForm.personal_info.github_url" placeholder="Github..." />
          </li>
          <li class="mb-2">
            <input class="w-full shadow-sm" v-model="profileForm.personal_info.devto_url" placeholder="Dev..." />
          </li>
        </ul>
        <div class="flex justify-between items-center">
          <div>
            <div class="bg-cover bg-no-repeat rounded-full overflow-hidden 
            w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 mr-2">
              <img
                src="data:image/jpeg;base64,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"
                alt="" class="w-full h-full object-cover">
            </div>
          </div>
          <div class="grid justify-items-end">
            <h1 class="block w-full !text-4xl !sm:text-5xl !md:text-6xl !lg:text-7xl font-extrabold">
              <input class="w-full shadow-sm" v-model="profileForm.personal_info.name" placeholder="Name..." />
            </h1>
            <p class="block w-full text-xl mt-5">
              <input class="w-full shadow-sm" v-model="profileForm.personal_info.position" placeholder="Position..." />
            </p>
          </div>
        </div>
      </header>
      <main class="sm:flex gap-x-10 mt-10 text-black block">
        <div class="sm:w-2/6 w-full">
          <strong class="text-xl font-bold">Contact Details</strong>
          <ul class="mt-2 mb-10">
            <li class="px-2 mt-2">
              <input class="w-full shadow-sm" v-model="profileForm.personal_info.phone" placeholder="Phone..." />
            </li>
            <li class="px-2 mt-2">
              <input class="w-full shadow-sm" v-model="profileForm.personal_info.email" placeholder="Email..." />
            </li>
            <li class="px-2 mt-2">
              <input class="w-full shadow-sm" v-model="profileForm.personal_info.address" placeholder="Address..." />
            </li>
          </ul>
          <strong class="text-xl font-bold">Skills</strong>
          <div class="mt-2 mb-10">
            <div v-for="(skill, index) in profileForm.skills" :key="index" class="mb-2">
              <input v-model="profileForm.skills[index]" placeholder="Skill..." class="w-full" />
            </div>
            <button type="button" @click="profileForm.skills.push('')">+ Add skill</button>
          </div>
          <strong class="text-xl font-bold">Interests & Hobbies</strong>
          <div class="mt-2">
            <div v-for="(interest, index) in profileForm.interests" :key="index" class="mb-2">
              <input v-model="profileForm.interests[index]" placeholder="Interest..." class="w-full" />
            </div>
            <button type="button" @click="profileForm.interests.push('')">+ Add interest</button>
          </div>
        </div>
        <div class="sm:w-4/6 w-full">
          <section>
            <h2 class="text-2xl pb-1 border-b font-semibold">About</h2>
            <textarea rows="3" class="w-full mt-3 resize-none" v-model="profileForm.personal_info.about"
              placeholder="About..."></textarea>
          </section>
          <section>
            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold">Projects</h2>
            <ul class="mt-1">
              <li class="py-2" v-for="(project, index) in profileForm.projects" :key="index">
                <div class="wrapper relative group">
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="project.title" placeholder="Title..."
                      @input="clearProjectError(index, 'title')" />
                    <p v-if="projectErrors[index]?.title" class="block text-red-500 text-sm">
                      {{ projectErrors[index].title }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="project.time" placeholder="Time..."
                      @input="clearProjectError(index, 'time')" />
                    <p v-if="projectErrors[index]?.time" class="block text-red-500 text-sm">
                      {{ projectErrors[index].time }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="project.position" placeholder="Position..."
                      @input="clearProjectError(index, 'position')" />
                    <p v-if="projectErrors[index]?.position" class="block text-red-500 text-sm">
                      {{ projectErrors[index].position }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="project.language" placeholder="Language..."
                      @input="clearProjectError(index, 'language')" />
                    <p v-if="projectErrors[index]?.language" class="block text-red-500 text-sm">
                      {{ projectErrors[index].language }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="project.url" placeholder="Link project..."
                      @input="clearProjectError(index, 'url')" />
                    <p v-if="projectErrors[index]?.url" class="block text-red-500 text-sm">
                      {{ projectErrors[index].url }}
                    </p>
                  </div>
                  <textarea rows="3" class="w-full shadow-sm resize-none" v-model="project.description"
                    placeholder="Description..." @input="clearProjectError(index, 'description')"></textarea>
                  <p v-if="projectErrors[index]?.description" class="block text-red-500 text-sm">
                    {{ projectErrors[index].description }}
                  </p>

                  <!-- Nút xóa (chỉ hiện nếu không phải dòng đầu) -->
                  <button type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-black h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    v-if="index !== 0" @click="removeProject(index, 'projects')">-</button>

                  <!-- Nút thêm (chỉ hiện ở dòng đầu) -->
                  <button v-if="index === 0" type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-red-500 h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    @click="addItem('projects')">+</button>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold">Work Experiences</h2>
            <ul class="mt-1">
              <li class="py-2" v-for="(work, index) in profileForm.works" :key="index">
                <div class="wrapper relative group">
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="work.title" placeholder="Title..."
                      @input="clearProjectError(index, 'title')" />
                    <p v-if="projectErrors[index]?.title" class="block text-red-500 text-sm">
                      {{ projectErrors[index].title }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="work.time" placeholder="Time..."
                      @input="clearProjectError(index, 'time')" />
                    <p v-if="projectErrors[index]?.time" class="block text-red-500 text-sm">
                      {{ projectErrors[index].time }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="work.position" placeholder="Position..."
                      @input="clearProjectError(index, 'position')" />
                    <p v-if="projectErrors[index]?.position" class="block text-red-500 text-sm">
                      {{ projectErrors[index].position }}
                    </p>
                  </div>
                  <textarea rows="3" class="w-full shadow-sm resize-none" v-model="work.description"
                    placeholder="Description..." @input="clearProjectError(index, 'description')"></textarea>
                  <p v-if="projectErrors[index]?.description" class="block text-red-500 text-sm">
                    {{ projectErrors[index].description }}
                  </p>

                  <!-- Nút xóa (chỉ hiện nếu không phải dòng đầu) -->
                  <button type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-black h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    v-if="index !== 0" @click="removeProject(index, 'works')">-</button>

                  <!-- Nút thêm (chỉ hiện ở dòng đầu) -->
                  <button v-if="index === 0" type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-red-500 h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    @click="addItem('works')">+</button>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold">Education</h2>
            <ul class="mt-1">
              <li class="py-2" v-for="(education, index) in profileForm.educations" :key="index">
                <div class="wrapper relative group">
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="education.title" placeholder="Title..."
                      @input="clearProjectError(index, 'title')" />
                    <p v-if="projectErrors[index]?.title" class="block text-red-500 text-sm">
                      {{ projectErrors[index].title }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="education.time" placeholder="Time..."
                      @input="clearProjectError(index, 'time')" />
                    <p v-if="projectErrors[index]?.time" class="block text-red-500 text-sm">
                      {{ projectErrors[index].time }}
                    </p>
                  </div>
                  <div class="my-3">
                    <input class="w-full shadow-sm" v-model="education.position" placeholder="Position..."
                      @input="clearProjectError(index, 'position')" />
                    <p v-if="projectErrors[index]?.position" class="block text-red-500 text-sm">
                      {{ projectErrors[index].position }}
                    </p>
                  </div>
                  <!-- Nút xóa (chỉ hiện nếu không phải dòng đầu) -->
                  <button type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-black h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    v-if="index !== 0" @click="removeProject(index, 'educations')">-</button>

                  <!-- Nút thêm (chỉ hiện ở dòng đầu) -->
                  <button v-if="index === 0" type="button"
                    class="absolute top-0 right-0 px-3 py-1 flex items-center justify-center rounded-sm text-white bg-red-500 h-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    @click="addItem('educations')">+</button>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
    <div class="flex justify-center fixed right-0 bottom-10">
      <button type="submit"
        class="w-full m-auto inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-black border border-solid shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-black-500 text-white-500 hover:opacity-75 hover:shadow-none">Save</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import axiosConfig from '@/helpers/axiosConfig'

const projectErrors = reactive({})
const profileForm = reactive({
  personal_info: {
    linkedin_url: '',
    github_url: '',
    devto_url: '',
    profile_image: '',
    name: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    about: '',
  },
  projects: [
    {
      title: '',
      position: '',
      language: '',
      description: '',
      url: '',
      time: ''
    }
  ],
  works: [
    {
      title: '',
      position: '',
      description: '',
      time: ''
    }
  ],
  educations: [
    {
      title: '',
      position: '',
      time: '',
    }
  ],
  skills: [''],
  certificates: [
    {
      title: 'Freecodecamp',
      url: 'Freecodecamp.com'
    }
  ],
  interests: ['']
})

const templates = {
  projects: {
    title: '',
    time: '',
    position: '',
    url: '',
    description: '',
    language: ''
  },
  educations: {
    title: '',
    position: '',
    time: '',
  },
  works: {
    title: '',
    position: '',
    description: '',
    time: ''
  },
}

const handleSubmitForm = async () => {
  try {
    await axiosConfig.post('/user/cv/store', profileForm)
  } catch (error) {
    const serverErrors = error.response.data.errors
    Object.keys(serverErrors).forEach((key) => {
      const matches = key.match(/^projects\.(\d+)\.(\w+)$/)
      if (matches) {
        const index = matches[1]
        const field = matches[2]
        if (!projectErrors[index]) projectErrors[index] = {}
        projectErrors[index][field] = serverErrors[key][0].replace(/projects\.\d+\./, '')
      }
    })
  }
}

const addItem = (type) => {
  if (profileForm[type] && templates[type]) {
    profileForm[type].push({ ...templates[type] })
  }
}

const removeProject = (index, type) => {
  if (profileForm[type] && Array.isArray(profileForm[type])) {
    profileForm[type].splice(index, 1)
  }
}

const clearProjectError = (index, field) => {
  if (projectErrors[index]?.[field]) {
    delete projectErrors[index][field];

    if (Object.keys(projectErrors[index]).length === 0) {
      delete projectErrors[index];
    }
  }
}


</script>