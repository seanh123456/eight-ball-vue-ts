<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
      type="submit"
      :disabled="disabled">
    <slot/>
  </button>
</template>

<style scoped>
button {
  border-radius: 8px;
  border: 2px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 550;
  font-family: inherit;
  color: #003049;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:not([disabled]):hover {
  border: 2px solid #f77f00;
}

button[disabled] {
  opacity: 0.6;
  cursor: default;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>