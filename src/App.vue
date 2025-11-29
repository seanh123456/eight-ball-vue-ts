<script setup lang="ts">
import {ref} from "vue";
import {resetTheme} from "./functions/theme.ts";
import UserIcon from "./icons/UserIcon.vue";
import ProfileView from "./views/ProfileView.vue";

const appVersion = ref(import.meta.env.VITE_APP_VERSION);
const profileVisible = ref(false);

resetTheme()

const toggleProfile = () => {
  profileVisible.value = !profileVisible.value
}
</script>

<template>

  <header>
    <div class="header">
      <h1>
        <RouterLink to="/">Hutch</RouterLink>
      </h1>
      <ul class="horizontal">
        <li>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </li>
        <li>
          <RouterLink to="/eightball">Eight Ball</RouterLink>
        </li>
        <li>
          <UserIcon @click="toggleProfile"/>
        </li>
      </ul>
    </div>
  </header>

  <ProfileView v-show="profileVisible"/>

  <main>
    <div class="content">
      <RouterView/>
    </div>
  </main>

  <footer>
    <div class="footer">
      <ul class="horizontal">
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
        <li>
          <RouterLink to="/legal">Legal</RouterLink>
        </li>
      </ul>
      <small class="footer-right">ui v{{ appVersion }} &bull; Copyright &copy;2025 Hutch Rip.</small>
    </div>
  </footer>

</template>

<style scoped>
header {
  a {
    color: var(--p-600);
  }

  a:hover {
    color: var(--a2-600);
  }

  ul {
    a {
      font-size: 1.8em;
    }
  }
}

.header, .footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  max-width: 720px;
  margin: 0 auto;
  padding: 1.2rem;
  border-top: 1px solid var(--n-200);
}

ul.horizontal {
  display: flex;
  gap: 1em;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul.horizontal li {
  margin: auto 0.5em;
}

li:has(svg) {
  display: block;
}

svg {
  color: var(--p-600);
  width: 1.8em;
  height: 1.8em;
  cursor: pointer;
}

svg:hover {
  color: var(--a2-600);
}
</style>