<template>
  <div style="height: 100vh; width: 100vh">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { apiMixin } from '../apiMixin.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, LinearScale, CategoryScale);

export default {
  mixins: [apiMixin],
  name: 'VerticalBarChart',
};
</script>
