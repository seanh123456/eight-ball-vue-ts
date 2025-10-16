<template>
  <div class="card">
    <input
        v-model="newQuestion"
        type="text"
        placeholder="Ask a (Yes or No) Question"
        :class="{ 'validation-error': hasValidationError }"
        @change="clearValidationError"
        @keyup.enter="rollBall"/>


    <div
        ref="validationRef"
        class="validation-error">
      {{ newQuestionMessage }}
    </div>

    <button
        type="button"
        @click="rollBall"
        :disabled="isButtonDisabled">
      Roll the Magic Eight Ball
    </button>

    <ul class="answers">
      <li v-for="answer in answers">
        <span class="question">Question:</span> {{ answer.question }}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="question">Answer:</span> <span :class="answer.answer.positivity">{{ answer.answer.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const newQuestion = ref('')
const newQuestionMessage = ref('\u00A0')
const answers = ref<Answer[]>([])
const validationRef = ref<HTMLInputElement | null>(null)

const rollBall = () => {
  console.log('roll');
  const question = newQuestion.value.trim()
  newQuestionMessage.value = '\u00A0'

  if (!question)
    return

  if (!isYesNoQuestion(question)) {
    triggerValidationAnimation()
    return
  }

  let randomMessage = messages[Math.floor(Math.random() * messages.length)]!
  answers.value.unshift({question: newQuestion.value, answer: randomMessage})
  newQuestion.value = ''
}

const isYesNoQuestion = (question: string): boolean => {
  return !hasInvalidStartWord(question, 'who') &&
      !hasInvalidStartWord(question, 'what') &&
      !hasInvalidStartWord(question, 'when') &&
      !hasInvalidStartWord(question, 'where') &&
      !hasInvalidStartWord(question, 'why') &&
      !hasInvalidStartWord(question, 'how');
}

const hasInvalidStartWord = (question: string, invalidStart: string): boolean => {
  if (question.toLowerCase().startsWith(invalidStart)) {
    console.log("has: " + invalidStart)
    newQuestionMessage.value = 'Ask a yes-or-no question, not "' + invalidStart + '".'
    return true;
  }
  return false;
}

const triggerValidationAnimation = () => {
  if (!validationRef.value)
    return

  validationRef.value.classList.remove('validation-error')
  // force reflow
  void validationRef.value.offsetWidth
  validationRef.value.classList.add('validation-error')
}

const clearValidationError = () => {
  console.log('clear 1');
  if (!hasValidationError)
    return
  const question = newQuestion.value.trim()
  console.log('clear 2');
  if (!isYesNoQuestion(question))
    return;
  newQuestionMessage.value = '\u00A0'
}

const hasValidationError = computed(() => {
  return newQuestionMessage.value.trim().length > 0
})

const isButtonDisabled = computed(() => {
  return newQuestion.value.trim() === '';
});

interface Answer {
  question: string
  answer: Message
}

interface Message {
  value: string
  positivity: string
}

const messages = [
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

.validation-error {
  border-color: #ff0000;
}

/* Combo flicker + shake animation */
@keyframes flicker-shake {
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

div.validation-error {
  animation: flicker-shake 0.2s ease-in-out;
   font-size: 0.9em;
   margin-top: -1.5em;
   margin-bottom: 0.5em;
   min-height: 1.2em; /* keeps layout stable */
  text-align: left;
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
