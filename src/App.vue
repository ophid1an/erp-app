<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <NavBar />
    <main class="mx-auto max-w-6xl p-4 pb-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>
