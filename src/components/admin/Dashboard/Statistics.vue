<template>
  <div class="col-md-12">
    <div class="tile">
      <h3 class="tile-title">Thống kê 6 tháng doanh thu</h3>
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import axiosConfig from '@/helpers/axiosConfig'
Chart.register(...registerables)

const chartRef = ref(null)
let chartInstance = null

onMounted(async () => {
  const response = await axiosConfig.get('/sales-statistics')
  const data = await response.data

  const labels = data.map(item => item.month)
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
})
</script>