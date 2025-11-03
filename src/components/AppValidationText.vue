<script setup lang="ts">
import {ref} from "vue";

const validationRef = ref<HTMLElement | null>(null)
const validationTextMessage = ref<string>('\u00A0')

const setInvalid = (validationMessage: string) => {
  validationTextMessage.value = validationMessage
  shake()
}

const setValid = () => {
  validationTextMessage.value = '\u00A0'
}

const shake = () => {
  const validationElement = validationRef.value
  if (!validationElement)
    return

  // retrigger animation
  validationElement.classList.remove('shake')
  void validationElement.offsetWidth
  validationElement.classList.add('shake')
}

defineExpose({
  setInvalid,
  setValid,
})
</script>

<template>
  <div ref="validationRef">
    {{ validationTextMessage }}
  </div>
</template>

<style scoped>
div {
  font-size: 0.9em;
  margin-top: -1.5em;
  margin-bottom: 0.5em;
  min-height: 1.2em;
  text-align: left;
  color: var(--w-900);
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  30%, 90% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(2px);
  }
}

.shake {
  animation: shake 0.2s ease-in-out;
}
</style>