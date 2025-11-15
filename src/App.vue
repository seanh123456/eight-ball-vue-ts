<script setup lang="ts">

</script>

<template>
  <header>
    <h1>Magic Eight Ball</h1>
  </header>
  <main>
    <div class="content">
      <RouterView />
    </div>
  </main>
  <footer>
    <div class="footer">
      <ul>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
        <li><RouterLink to="/legal">Legal</RouterLink></li>
      </ul>
      <small class="footer-right">Copyright &copy;2025 Hutch Rip.</small>
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
  padding: 1.2rem;
  border-top: 1px solid var(--n-200);
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