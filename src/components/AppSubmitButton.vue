<script setup lang="ts">

</script>

<template>
  <button
      type="submit">
    <slot/>
  </button>
</template>

<style scoped>
button {
  width: 100%;
  border-radius: 8px;
  border: 2px solid transparent;
  padding: 0.3em 0.7em;
  font-size: 1.3em;
  font-weight: 600;
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