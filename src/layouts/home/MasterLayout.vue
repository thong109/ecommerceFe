<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue';
import Footer from '@/components/home/Footer.vue';
import { provide } from 'vue';

const datas = [
  { name: 'Sr. React Native Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 1 },
  { name: 'Lead UI/UX Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 2 },
  { name: 'Head of Inbound Marketing', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 3 },
  { name: 'Lead Brand Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Los Angeles', id: 4 },
  { name: 'Lead UI/UX Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 5 },
  { name: 'Sr. React JS Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Los Angeles', id: 6 },
  { name: 'Product Manager', category: 'Management', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Part Time', location: 'New York', id: 7 },
  { name: 'Content Strategist', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Freelance', location: 'Remote', id: 8 },
  { name: 'Backend Node.js Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Austin', id: 9 },
  { name: 'QA Tester', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Contract', location: 'Denver', id: 10 },
  { name: 'Digital Marketing Analyst', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Chicago', id: 11 },
  { name: 'Mobile App Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Freelance', location: 'Remote', id: 12 },
  { name: 'Scrum Master', category: 'Management', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Part Time', location: 'Boston', id: 13 },
  { name: 'DevOps Engineer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Diego', id: 14 },
  { name: 'Graphic Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Contract', location: 'Miami', id: 15 },
  { name: 'Email Marketing Specialist', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Freelance', location: 'Remote', id: 16 },
  { name: 'React Native Intern', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Internship', location: 'Seattle', id: 17 },
  { name: 'UI Prototyper', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 18 },
  { name: 'SEO Specialist', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Part Time', location: 'Dallas', id: 19 },
  { name: 'Project Coordinator', category: 'Management', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Contract', location: 'Philadelphia', id: 20 },
  { name: 'Frontend Angular Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Portland', id: 21 },
  { name: 'Visual Designer', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Freelance', location: 'Remote', id: 22 },
  { name: 'PPC Campaign Manager', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Houston', id: 23 },
  { name: 'Technical Project Manager', category: 'Management', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Part Time', location: 'Atlanta', id: 24 },
  { name: 'Junior React Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Internship', location: 'New York', id: 25 },
  { name: 'UX Researcher', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Contract', location: 'Los Angeles', id: 26 },
  { name: 'Social Media Manager', category: 'Marketing', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Chicago', id: 27 },
  { name: 'Agile Coach', category: 'Management', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Contract', location: 'Remote', id: 28 },
  { name: 'Full Stack Developer', category: 'Development', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'Phoenix', id: 29 },
  { name: 'Creative Director', category: 'Design', detail: 'Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam lorem amet eget in netus laoreet', time: 'Full Time', location: 'San Francisco', id: 30 },
];

const dataObj = Object.fromEntries(datas.map(item => [item.id, item]))
provide('datas', dataObj)

</script>
