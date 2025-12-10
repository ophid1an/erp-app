<script setup lang="ts">
import Menu from '../components/Menu.vue'

const roles = ['ROLE_MANAGER', 'ROLE_ACCOUNTING_ASSISTANT', 'ROLE_EMPLOYEE', 'ROLE_HR']
const resolveRoute = (route?: string) => (route ? `/route/${route}` : '#')
</script>

<template>
  <main class="min-h-screen bg-slate-50 p-6 text-slate-900">
    <div class="mx-auto max-w-6xl space-y-6">
      <header class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Demo</p>
        <h1 class="text-3xl font-bold text-slate-900">Vue Menu</h1>
        <p class="text-slate-600">
          Example usage with full roles; replace with your own role list, feature version, current route, and resolver.
        </p>
      </header>

      <Menu
        feature-version="Advanced"
        current-route="AppTransactionIndex"
        :user-roles="roles"
        environment="dev"
        :resolve-route="resolveRoute"
      />
    </div>
  </main>
</template>
