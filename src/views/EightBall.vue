<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import AppSubmitButton from "../components/AppSubmitButton.vue"
import AppValidationText from "../components/AppValidationText.vue"
import AppInputText from "../components/AppInputText.vue"
import AppUnorderedListFade from "../components/AppUnorderedListFade.vue";
import EightBallAnswerItem from "../components/EightBallListItem.vue"
import type {Answer} from "../constants/types.ts";
import {messages} from "../constants/messages.ts";

// --- state ---
const eightBallQuestion = ref('')
const answers = ref<Answer[]>([])
const inputRef = ref<InstanceType<typeof AppInputText> | null>(null);
const validationTextRef = ref<InstanceType<typeof AppValidationText> | null>(null);
const interrogative = ref<string | undefined>(undefined)

// --- logic ---
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()

  }
})

const rollBall = () => {
  const question = eightBallQuestion.value.trim()
  interrogative.value = checkInterrogative(question);

  if (interrogative.value) {
    validationTextRef.value?.setInvalid(`Ask a yes-or-no question, not "${interrogative.value}".`)
    return
  }

  validationTextRef.value?.setValid()

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  answers.value.push({time: new Date(), question, answer: randomMessage!})
  eightBallQuestion.value = ''
}

const checkInterrogative = (question: string) => {
  const interrogatives = ['who', 'what', 'when', 'where', 'why', 'how']
  const lower = question.toLowerCase()
  return interrogatives.find(word => lower.startsWith(word))
}

const clearValidationError = () => {
  if (!hasValidationError)
    return

  const question = eightBallQuestion.value.trim()

  if (!checkInterrogative(question)) {
    interrogative.value = undefined
    validationTextRef.value?.setValid()
  }
}

// --- computed ---
const hasValidationError = computed(
    () => !!interrogative.value
)
const isButtonDisabled = computed(
    () => eightBallQuestion.value.trim() === ''
)
</script>

<template>

  <h2>Magic Eight Ball</h2>

  <div class="card">

    <form @submit.prevent="rollBall">
      <AppInputText
          ref="inputRef"
          placeholder="Ask a (Yes or No) Question"
          :class="{ 'input-error': hasValidationError }"
          v-model.trim="eightBallQuestion"
          @change="clearValidationError"/>

      <AppValidationText
          ref="validationTextRef"/>

      <AppSubmitButton
          :disabled="isButtonDisabled">
        Roll the Magic Eight Ball
      </AppSubmitButton>
    </form>

    <AppUnorderedListFade class="reverse">
      <EightBallAnswerItem
          v-for="(answer, index) in answers"
          :key="index"
          :answer="answer"
      />
    </AppUnorderedListFade>

  </div>

</template>

<style scoped>

</style>