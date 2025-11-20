<script setup lang="ts">
import {ref} from "vue";

const inputRef = ref<HTMLElement | null>(null)

const inputValue = defineModel<string>()
const emit = defineEmits(['change']);
defineExpose({
  focus,
})

function handleChange(event: any) {
  emit('change', event);
}

function focus() {
  if (inputRef.value)
    inputRef.value.focus()
}
</script>

<template>
  <textarea
      ref="inputRef"
      v-model="inputValue"
      @change="handleChange"
      rows="4"
  />
</template>

<style scoped>
textarea {
  width: 100%;
  border-radius: 6px;
  font-size: 1.5em;
  margin: 1em 0;
  padding: 2px 6px;
  border: 2px solid transparent;
  transition: border-color .25s;
  resize: vertical;

  box-sizing: border-box;
  /* Add vendor prefixes for wider browser support if needed */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

textarea:focus, textarea:hover {
  outline: none;
  border: 2px solid var(--w-500);
}

.input-error, textarea:focus.input-error, textarea:hover.input-error {
  border-color: var(--w-900);
}
</style>