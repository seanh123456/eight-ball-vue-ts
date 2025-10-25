<script setup lang="ts">

</script>

<template>
  <transition-group name="fade" tag="ul">
    <slot/>
  </transition-group>
</template>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;
  text-align: left;
  color: #003049;
}

ul.reverse {
  display: flex;
  flex-direction: column-reverse;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>