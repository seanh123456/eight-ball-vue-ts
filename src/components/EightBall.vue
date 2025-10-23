<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppButton from "./AppButton.vue";
import AppValidationText from "./AppValidationText.vue";
import AppInputText from "./AppInputText.vue";

interface Answer {
  question: string
  answer: Message
}

interface Message {
  value: string
  positivity: 'positive' | 'neutral' | 'negative'
}

// --- state ---
const eightBallQuestion = ref('')
const answers = ref<Answer[]>([])
const inputRef = ref<typeof AppInputText | null>(null)
const validationTextRef = ref<typeof AppValidationText | null>(null)
const interrogative = ref<string | undefined>(undefined)

// --- constants ---
const messages: Message[] = [
  {value: 'It is certain', positivity: 'positive'},
  {value: 'It is decidedly so', positivity: 'positive'},
  {value: 'Yes definitely', positivity: 'positive'},
  {value: 'You may rely on it', positivity: 'positive'},
  {value: 'Without a doubt', positivity: 'positive'},
  {value: 'As I see it, yes', positivity: 'positive'},
  {value: 'Most likely', positivity: 'positive'},
  {value: 'Outlook good', positivity: 'positive'},
  {value: 'Yes', positivity: 'positive'},
  {value: 'Signs point to yes', positivity: 'positive'},
  {value: 'Reply hazy, try again', positivity: 'neutral'},
  {value: 'Ask again later', positivity: 'neutral'},
  {value: 'Better not tell you now', positivity: 'neutral'},
  {value: 'Cannot predict now', positivity: 'neutral'},
  {value: 'Concentrate and ask again', positivity: 'neutral'},
  {value: 'Don\'t count on it', positivity: 'negative'},
  {value: 'My reply is no', positivity: 'negative'},
  {value: 'My sources say no', positivity: 'negative'},
  {value: 'Outlook not so good', positivity: 'negative'},
  {value: 'Very doubtful', positivity: 'negative'},
]

// const inputRef = ref(null);
// --- logic ---
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

const rollBall = () => {
  const question = eightBallQuestion.value.trim()

  if (!question)
    return

  interrogative.value = checkInterrogative(question);

  if (interrogative.value) {
    validationTextRef.value!.setInvalid(`Ask a yes-or-no question, not "${interrogative.value}".`)
    return
  }

  validationTextRef.value!.setValid()

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  answers.value.unshift({ question, answer: randomMessage! })
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
    <AppInputText
        ref="inputRef"
        v-model.trim="eightBallQuestion"
        placeholder="Ask a (Yes or No) Question"
        :hasValidationError="hasValidationError"
        @change="clearValidationError"
        @keyup.enter="rollBall" />

    <AppValidationText
        ref="validationTextRef"/>
    <AppButton
        :disabled="isButtonDisabled"
        @click="rollBall">
      Roll the Magic Eight Ball
    </AppButton>

    <ul class="answers">
      <li v-for="(answer, index) in answers" :key="index">
        <span class="question">Question:</span> {{ answer.question }}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="question">Answer: </span>
        <span :class="answer.answer.positivity">{{ answer.answer.value }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;
  text-align: left;
  color: #003049;
}

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
