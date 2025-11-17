<script setup lang="ts">
import {onMounted, ref} from "vue";

const temp = ref(0)


onMounted(async() => {
  const url = "/getWeatherFromZip?lat=39.4040&lon=-76.9506"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weather = await response.json()
    console.log(weather)

    const kelvin: number = weather.main.temp
    const fahrenheit: number = (kelvin - 273.15) * 9/5 + 32

    temp.value = fahrenheit
  } catch (error) {
    console.error('Error fetching weather data:', error)
    temp.value = 90
  }
})
</script>

<template>
  <h2>Dashboard</h2>
  <div class="card">
    <p>{{ temp }}f</p>
  </div>
</template>

<style scoped>

</style>