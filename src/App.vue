<script setup lang="ts">
import EightBall from './components/EightBall.vue'
</script>

<template>
  <header>
    <div class="content">
      <h1>Magic Eight Ball Vite Vue TS</h1>
    </div>
  </header>
  <main>
    <div class="content">
      <EightBall/>
    </div>
  </main>
  <footer>
    <div class="footer">
      <ul>
        <li><a href="">Footer 1</a></li>
        <li><a href="">Footer 2</a></li>
        <li><a href="">Footer 3</a></li>
      </ul>
      <small class="footer-right">&copy;2025</small>
    </div>
  </footer>
</template>

<style scoped>

h1 {
  color: var(--p-600)
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  max-width: 720px;
  margin: 0 auto;
  padding: .7rem;
}

footer ul {
  display: flex;
  gap: 1em;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

footer ul li {
  margin: 0 0.5em;
}
</style>