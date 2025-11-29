<script setup lang="ts">
defineProps<{ radioName: string, radioKey: string, radioLabel: string }>()

const inputValue = defineModel()
const emit = defineEmits(['change']);

function handleChange(event: any) {
  emit('change', event);
}
</script>

<template>
  <input :name="radioName"
         type="radio"
         :id="radioKey"
         :value="radioKey"
         @change="handleChange"
         v-model="inputValue"
  />
  <label :for="radioKey">{{ radioLabel }}</label>
</template>

<style scoped>

</style>