<script setup lang="ts">
import {onMounted, ref} from "vue";

const lastUpdate = ref("-")

const originTemp = ref("-")
const originSunrise = ref("-")
const originSunset = ref("-")
const originWindSpeed = ref("-")

const destinationTemp = ref("-")
const destinationSunrise = ref("-")
const destinationSunset = ref("-")
const destinationWindSpeed = ref("-")

onMounted(async() => {
  const originLat = 39.1047
  const originLon = -76.7722
  const destinationLat = 39.4040
  const destinationLon = -76.9506

  const originUrl = "/getWeatherFromZip?lat=" + originLat + "&lon=" + originLon
  const destinationUrl = "/getWeatherFromZip?lat=" + destinationLat + "&lon=" + destinationLon

  let updateTime: string

  let originFahrenheit: number
  let originSunriseTime: string
  let originSunsetTime: string
  let originWindSpeedMiles: string

  let destinationFahrenheit: number
  let destinationSunriseTime: string
  let destinationSunsetTime: string
  let destinationWindSpeedMiles: string

  try {
    const response = await fetch(originUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weather = await response.json()
    console.log(weather)

    const kelvin: number = weather.main.temp
    const sunriseEpoch: number = weather.sys.sunrise
    const sunsetEpoch: number = weather.sys.sunset
    const windSpeedMeters: number = weather.wind.speed

    originFahrenheit = (kelvin - 273.15) * 9/5 + 32
    originSunriseTime = new Date(sunriseEpoch * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    originSunsetTime = new Date(sunsetEpoch * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    originWindSpeedMiles = (windSpeedMeters * 2.23694).toFixed(1)

  } catch (error) {
    console.error('Error fetching weather data:', error)

    originFahrenheit = 70.1
    originSunriseTime = "6:07 AM"
    originSunsetTime = "5:48 PM"
    originWindSpeedMiles = "2.3 mph"
  }

  try {
    const response = await fetch(destinationUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weather = await response.json()
    console.log(weather)

    const dateTime = weather.dt
    const kelvin: number = weather.main.temp
    const sunriseEpoch: number = weather.sys.sunrise
    const sunsetEpoch: number = weather.sys.sunset
    const windSpeedMeters: number = weather.wind.speed

    updateTime = new Date(dateTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    destinationFahrenheit = (kelvin - 273.15) * 9/5 + 32
    destinationSunriseTime = new Date(sunriseEpoch * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    destinationSunsetTime = new Date(sunsetEpoch * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    destinationWindSpeedMiles = (windSpeedMeters * 2.23694).toFixed(1)


  } catch (error) {
    console.error('Error fetching weather data:', error)

    updateTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    destinationFahrenheit = 90.1
    destinationSunriseTime = "7:22 AM"
    destinationSunsetTime = "4:31 PM"
    destinationWindSpeedMiles = "1.1 mph"
  }

  lastUpdate.value = updateTime

  originTemp.value = originFahrenheit.toFixed(1).toString()
  originSunrise.value = originSunriseTime
  originSunset.value = originSunsetTime
  originWindSpeed.value = originWindSpeedMiles


  destinationTemp.value = destinationFahrenheit.toFixed(1).toString()
  destinationSunrise.value = destinationSunriseTime
  destinationSunset.value = destinationSunsetTime
  destinationWindSpeed.value = destinationWindSpeedMiles
})
</script>

<template>
  <h2>Dashboard</h2>
  <div class="card">
    <h3>Last Update</h3>
    <p>Last Update: {{ lastUpdate }}</p>
    <h3>Origin</h3>
    <p>Temp: {{ originTemp }} &deg;F</p>
    <p>Sunrise: {{ originSunrise }}</p>
    <p>Sunset: {{ originSunset }}</p>
    <p>Wind Speed: {{ originWindSpeed }}</p>
    <h3>Destination</h3>
    <p>Temp: {{ destinationTemp }} &deg;F</p>
    <p>Sunrise: {{ destinationSunrise }}</p>
    <p>Sunset: {{ destinationSunset }}</p>
    <p>Wind Speed: {{ destinationWindSpeed }}</p>
  </div>
</template>

<style scoped>

</style>