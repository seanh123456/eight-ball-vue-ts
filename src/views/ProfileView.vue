<script setup lang="ts">
import AppRadioButton from "../components/AppRadioButton.vue";
import {theme} from "../functions/theme.ts";
import {ref} from "vue";

const storedTheme = localStorage.getItem('theme')
const selectedTheme = ref(storedTheme === null ? 'auto' : storedTheme)

const themeOptions: Map<string, string> = new Map<string, string>([
  ["auto", "Auto"],
  ["light", "Light"],
  ["dark", "Dark"],
  ["atom", "Atom"]
])
</script>

<template>
<div class="profile">
  <div class="content">
    <h2>Profile</h2>
    <div>Theme:</div>
    <AppRadioButton
        v-for="[key, value] in themeOptions"
        :key="key"
        radioName="theme"
        :radioKey="key"
        :radioLabel="value"
        @change="theme(key)"
        v-model="selectedTheme"
    />
  </div>
</div>
</template>

<style scoped>
.profile {
  display: flex;
  background-color: var(--n-200);
}
</style>