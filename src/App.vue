<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import HelloTsx from './components/HelloTsx.tsx';
</script>

<template>
  <div>
    <div><router-link to="/">Go to Home</router-link></div>
    <div><router-link to="/about">Go to About</router-link></div>
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
