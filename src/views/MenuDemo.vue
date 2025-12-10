<script setup lang="ts">
import Menu from '../components/Menu.vue'

const roles = ['ROLE_MANAGER', 'ROLE_ACCOUNTING_ASSISTANT', 'ROLE_EMPLOYEE', 'ROLE_HR']
const resolveRoute = (route?: string) => (route ? `/route/${route}` : '#')
</script>

<template>
  <main class="min-h-screen bg-slate-50 p-6 text-slate-900">
    <div class="mx-auto max-w-6xl space-y-6">
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
