<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click']);

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <button
      type="button"
      @click="handleClick"
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
  font-weight: 500;
  font-family: inherit;
  color: var(--a2-900);
  cursor: pointer;
  transition: border-color 0.25s;
}

button:not([disabled]):hover {
  border: 2px solid var(--w-500);
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