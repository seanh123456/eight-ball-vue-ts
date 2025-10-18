<template>
  <div class="card">
    <input
        ref="inputRef"
        v-model.trim="newQuestion"
        type="text"
        placeholder="Ask a (Yes or No) Question"
        :class="{ 'input-error': hasValidationError }"
        @change="clearValidationError"
        @keyup.enter="rollBall"
    />


    <div
        ref="validationRef"
        class="validation-message">
      {{ newQuestionMessage }}
    </div>

    <button
        type="button"
        @click="rollBall"
        :disabled="isButtonDisabled">
      Roll the Magic Eight Ball
    </button>

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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Answer {
  question: string
  answer: Message
}

interface Message {
  value: string
  positivity: 'positive' | 'neutral' | 'negative'
}

// --- state ---
const newQuestion = ref('')
const newQuestionMessage = ref('\u00A0')
const answers = ref<Answer[]>([])
const validationRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLElement | null>(null)

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
  const question = newQuestion.value.trim()
  newQuestionMessage.value = '\u00A0'

  if (!question)
    return

  if (!isYesNoQuestion(question)) {
    triggerValidationAnimation()
    return
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  answers.value.unshift({ question, answer: randomMessage! })
  // answers.value.unshift({question: question, answer: randomMessage})
  newQuestion.value = ''
}

const isYesNoQuestion = (question: string): boolean => {
  const invalidStarts = ['who', 'what', 'when', 'where', 'why', 'how']
  const lower = question.toLowerCase()

  const found = invalidStarts.find(word => lower.startsWith(word))
  if (found) {
    newQuestionMessage.value = `Ask a yes-or-no question, not "${found}".`
    return false
  }
  return true
}

/**
 * Restart the shake animation by manipulating the DOM class.
 * This is reliable across browsers since it forces a reflow.
 */
const triggerValidationAnimation = () => {
  const el = validationRef.value
  if (!el) return

  // ensure message is visible (in case it was a NBSP)
  if (newQuestionMessage.value.trim() === '\u00A0') {
    // if no message set yet, polite default
    newQuestionMessage.value = 'Please ask a yes-or-no question.'
  }

  // remove class if present, force reflow, then add it back
  el.classList.remove('shake')
  // force reflow — guaranteed to restart CSS animation on add
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  void el.offsetWidth
  el.classList.add('shake')
}

const clearValidationError = () => {
  if (isYesNoQuestion(newQuestion.value.trim())) {
    newQuestionMessage.value = '\u00A0'
  }
}


// --- computed ---
const hasValidationError = computed(
    () => newQuestionMessage.value.trim() !== ''
)
const isButtonDisabled = computed(
    () => newQuestion.value.trim() === ''
)
</script>

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

.input-error {
  border-color: #ff0000;
}

.validation-message {
  font-size: 0.9em;
  margin-top: -1.5em;
  margin-bottom: 0.5em;
  min-height: 1.2em;
  text-align: left;
}

/* Shake animation */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  30%, 90%{
    transform: translateX(-2px);
  }
  60%{
    transform: translateX(2px);
  }
}

.shake {
  animation: shake 0.2s ease-in-out;
}

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
