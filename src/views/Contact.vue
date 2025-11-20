<script setup lang="ts">

import AppInputText from "../components/AppInputText.vue";
import AppInputEmail from "../components/AppInputEmail.vue";
import AppSubmitButton from "../components/AppSubmitButton.vue";
import AppTextArea from "../components/AppTextArea.vue";
import {onMounted, ref} from "vue";

// --- state ---
const nameRef = ref<InstanceType<typeof AppInputText>>()
const name = ref('')
const email = ref('')
const message = ref('')

// --- logic ---
onMounted(() => {
  if (nameRef.value) {
    nameRef.value.focus()
  }
})

const submitForm = () => {
  console.log('name: ' + name.value)
  console.log('email: ' + email.value)
  console.log('message: ' + message.value)
}
</script>

<template>
  <h2>Contact</h2>
  <div class="card">
    <form @submit.prevent="submitForm" class="form">
      <div class="field">
        <label for="name">Name</label>
        <AppInputText id="name" ref="nameRef" v-model.trim="name" />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <AppInputEmail id="email" v-model.trim="email" />
      </div>

      <div class="field">
        <label for="message">Message</label>
        <AppTextArea id="message" v-model.trim="message" />
      </div>

      <AppSubmitButton>Send</AppSubmitButton>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: grid;
  gap: 1rem;
}

.field {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  align-self: center;
}

input, textarea {
  margin: 0.4rem 0;
}
</style>