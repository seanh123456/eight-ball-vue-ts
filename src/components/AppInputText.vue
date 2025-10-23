<script setup lang="ts">
import {ref} from "vue";

const inputRef = ref<HTMLElement | null>(null)

defineProps({
  placeholderMessage: {
    type: String,
    default: '',
  },
  hasValidationError: {
    type: Boolean,
    default: false,
  }
})
const inputValue = defineModel()
const emit = defineEmits(['change', 'keyup.enter']);
defineExpose({
  focus,
})

function handleChange(event: any) {
  emit('change', event);
}
function handleEnter(event: KeyboardEvent) {
  emit('keyup.enter', event);
}
function focus() {
  if (inputRef.value)
    inputRef.value.focus()
}
</script>

<template>
  <input
      ref="inputRef"
      v-model="inputValue"
      type="text"
      :placeholder="placeholderMessage"
      :class="{ 'input-error': hasValidationError }"
      @change="handleChange"
      @keyup.enter="handleEnter"
  />
</template>

<style scoped>
input {
  width: 100%;
  border-radius: 6px;
  font-size: 1.5em;
  margin: 1em 0;
  padding: 2px 6px;
  border: 2px solid transparent;
  transition: border-color .25s;
  color: #003049;
}

input:focus, input:hover {
  outline: none;
  border: 2px solid #f77f00;
}

.input-error, input:focus.input-error, input:hover.input-error {
  border-color: #ff0000;
}
</style>