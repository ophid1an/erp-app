<script setup lang="ts">
import Button from './ui/Button.vue'
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <img
          src="https://codeseed.gr/wp-content/uploads/2021/05/logo-codeseed.svg"
          alt="Codeseed logo"
          class="h-8 w-auto"
        />
        <div>
          <p class="text-sm font-semibold text-slate-900">Codeseed ERP</p>
          <p class="text-xs text-slate-500">Vue + Tailwind</p>
        </div>
      </div>

      <nav class="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
        <RouterLink to="/" class="hover:text-teal-600">Dashboard</RouterLink>
        <RouterLink to="/transactions" class="hover:text-teal-600">Transactions</RouterLink>
        <RouterLink to="/invoices" class="hover:text-teal-600">Invoices</RouterLink>
        <RouterLink to="/clients" class="hover:text-teal-600">Clients</RouterLink>
        <RouterLink to="/expenses" class="hover:text-teal-600">Expenses</RouterLink>
        <RouterLink to="/suppliers" class="hover:text-teal-600">Suppliers</RouterLink>
        <RouterLink to="/payroll" class="hover:text-teal-600">Payroll</RouterLink>
        <RouterLink to="/reports" class="hover:text-teal-600">Reports</RouterLink>
        <RouterLink to="/worklog" class="hover:text-teal-600">Worklog</RouterLink>
        <RouterLink to="/assets" class="hover:text-teal-600">Assets</RouterLink>
        <RouterLink to="/trips" class="hover:text-teal-600">Trips</RouterLink>
        <RouterLink to="/static-files" class="hover:text-teal-600">Static files</RouterLink>
        <RouterLink to="/commands" class="hover:text-teal-600">Commands</RouterLink>
        <RouterLink to="/settings" class="hover:text-teal-600">Settings</RouterLink>
        <RouterLink to="/menu" class="hover:text-teal-600">Menu</RouterLink>
        <RouterLink to="/employees" class="hover:text-teal-600">Employees</RouterLink>
        <RouterLink to="/login" class="hover:text-teal-600">Login</RouterLink>
        <RouterLink to="/reset" class="hover:text-teal-600">Reset</RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <Button as="a" variant="outline" size="sm" href="/login">Sign in</Button>
        <Button as="a" size="sm" href="/employees">Employees</Button>
      </div>
    </div>
  </header>
</template>
