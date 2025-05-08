<template>
  <div class="col-md-12">
    <Datepicker class="mb-3" v-model="date" range :enable-time-picker="false" placeholder="Chọn khoảng ngày"
      :clearable="false" />
    <div class="tile">
      <h3 class="tile-title">Thống kê theo ngày</h3>
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import axiosConfig from '@/helpers/axiosConfig'
Chart.register(...registerables)

const date = ref();
const chartRef = ref(null)
let chartInstance = null

onMounted(async () => {
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  date.value = [startDate, endDate];

  if (date.value[0] && date.value[1]) {
    const response = await axiosConfig.post('/sales-statistics-date', {
      start_date: date.value[0],
      end_date: date.value[1],
    })
    const data = await response.data
    fetchChart(data)
  } else {
    console.log("Vui lòng chọn cả ngày bắt đầu và kết thúc");
  }
})

const fetchChart = (data) => {
  const labels = data.map(item => item.day)
  const totals = data.map(item => item.total)

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Doanh thu (VNĐ)',
        data: totals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

watch(date, async (newValue) => {
  date.value = newValue
  const response = await axiosConfig.post('/sales-statistics-date', {
    start_date: date.value[0],
    end_date: date.value[1],
  })
  const data = await response.data
  fetchChart(data)
})
</script>
