<script setup lang="ts">
import Button from './ui/Button.vue'
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
          ERP
        </span>
        <div>
          <p class="text-sm font-semibold text-slate-900">ERP Demo</p>
          <p class="text-xs text-slate-500">Vue + Tailwind + shadcn-style</p>
        </div>
      </div>

      <nav class="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
        <RouterLink to="/" class="hover:text-indigo-600">Dashboard</RouterLink>
        <RouterLink to="/transactions" class="hover:text-indigo-600">Transactions</RouterLink>
        <RouterLink to="/invoices" class="hover:text-indigo-600">Invoices</RouterLink>
        <RouterLink to="/clients" class="hover:text-indigo-600">Clients</RouterLink>
        <RouterLink to="/expenses" class="hover:text-indigo-600">Expenses</RouterLink>
        <RouterLink to="/suppliers" class="hover:text-indigo-600">Suppliers</RouterLink>
        <RouterLink to="/payroll" class="hover:text-indigo-600">Payroll</RouterLink>
        <RouterLink to="/reports" class="hover:text-indigo-600">Reports</RouterLink>
        <RouterLink to="/menu" class="hover:text-indigo-600">Menu</RouterLink>
        <RouterLink to="/employees" class="hover:text-indigo-600">Employees</RouterLink>
        <RouterLink to="/login" class="hover:text-indigo-600">Login</RouterLink>
        <RouterLink to="/reset" class="hover:text-indigo-600">Reset</RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <Button as="a" variant="outline" size="sm" href="/login">Sign in</Button>
        <Button as="a" size="sm" href="/employees">Employees</Button>
      </div>
    </div>
  </header>
</template>
