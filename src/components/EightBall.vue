<template>
  <div class="card">
    <input type="text" placeholder="Ask a (Yes or No) Question" v-model="newQuestion" @keyup.enter="rollBall()"/>
    <button type="button" @click="rollBall()">Roll the Magic Eight Ball</button>
    <ul class="answers">
      <li v-for="answer in answers">
        <span class="question">Question:</span> {{ answer.question }}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="question">Answer:</span> <span :class="answer.answer.positivity">{{ answer.answer.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  name: "What's This?",
  setup() {
    const newQuestion = ref("")
    const answers = ref<Answer[]>([])
    const rollBall = () => {
      if (!newQuestion.value.trim())
        return

      let message = messages[Math.floor(Math.random() * messages.length)]!
      answers.value.unshift({question: newQuestion.value, answer: message})
      newQuestion.value = ""
    }

    return {
      newQuestion,
      answers,
      rollBall,
    }
  }
}

interface Answer {
  question: string
  answer: Message
}

interface Message {
  value: string
  positivity: string
}

const messages = [
  {value: "It is certain", positivity: "positive"},
  {value: "It is decidedly so", positivity: "positive"},
  {value: "Yes definitely", positivity: "positive"},
  {value: "You may rely on it", positivity: "positive"},
  {value: "Without a doubt", positivity: "positive"},
  {value: "As I see it, yes", positivity: "positive"},
  {value: "Most likely", positivity: "positive"},
  {value: "Outlook good", positivity: "positive"},
  {value: "Yes", positivity: "positive"},
  {value: "Signs point to yes", positivity: "positive"},
  {value: "Reply hazy, try again", positivity: "neutral"},
  {value: "Ask again later", positivity: "neutral"},
  {value: "Better not tell you now", positivity: "neutral"},
  {value: "Cannot predict now", positivity: "neutral"},
  {value: "Concentrate and ask again", positivity: "neutral"},
  {value: "Don't count on it", positivity: "negative"},
  {value: "My reply is no", positivity: "negative"},
  {value: "My sources say no", positivity: "negative"},
  {value: "Outlook not so good", positivity: "negative"},
  {value: "Very doubtful", positivity: "negative"},
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

button:hover {
  border: 2px solid #f77f00;
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
