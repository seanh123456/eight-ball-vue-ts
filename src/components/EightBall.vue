<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import AppSubmitButton from "./AppSubmitButton.vue"
import AppValidationText from "./AppValidationText.vue"
import AppInputText from "./AppInputText.vue"
import AppUnorderedListFade from "./AppUnorderedListFade.vue";
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
    validationTextRef.value!.setInvalid(`Ask a yes-or-no question, not "${interrogative.value}".`)
    return
  }

  validationTextRef.value!.setValid()

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  answers.value.push({question, answer: randomMessage!})
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
    validationTextRef.value!.setValid()
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
      <li v-for="(answer, index) in answers" :key="index">
        <span class="question">Question:</span> {{ answer.question }}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="question">Answer: </span>
        <span :class="answer.answer.positivity">{{ answer.answer.value }}</span>
      </li>
    </AppUnorderedListFade>

  </div>
</template>

<style scoped>
ul .question {
  font-weight: bold;
}

.positive {
  color: forestgreen;
}

.neutral {
  color: grey;
}

.negative {
  color: red;
}
</style>