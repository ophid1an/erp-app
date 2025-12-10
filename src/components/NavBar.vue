<script setup lang="ts">
import Button from './ui/Button.vue'
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div class="flex items-center gap-3">
        <img
          src="assets/codeseed-logo-dark.svg"
          alt="Codeseed logo"
          class="h-8 w-auto"
        />
      </div>

      <nav class="flex w-full flex-wrap items-center gap-3 overflow-x-auto text-sm font-semibold text-slate-700 sm:flex">
        <RouterLink to="/" class="hover:text-teal-600">Dashboard</RouterLink>
        <RouterLink to="/transactions" class="hover:text-teal-600">Transactions</RouterLink>
        <RouterLink to="/invoices" class="hover:text-teal-600">Invoices</RouterLink>
        <RouterLink to="/clients" class="hover:text-teal-600">Clients</RouterLink>
        <RouterLink to="/expenses" class="hover:text-teal-600">Expenses</RouterLink>
        <RouterLink to="/suppliers" class="hover:text-teal-600">Suppliers</RouterLink>
        <RouterLink to="/payroll" class="hover:text-teal-600">Payroll</RouterLink>
        <RouterLink to="/reports" class="hover:text-teal-600">Reports</RouterLink>
        <RouterLink to="/contacts" class="hover:text-teal-600">Contacts</RouterLink>
        <RouterLink to="/memos" class="hover:text-teal-600">Memos</RouterLink>
        <RouterLink to="/offices" class="hover:text-teal-600">Offices</RouterLink>
        <RouterLink to="/decisions" class="hover:text-teal-600">Decisions</RouterLink>
        <RouterLink to="/expense-approvals" class="hover:text-teal-600">Expense approvals</RouterLink>
        <RouterLink to="/accounts" class="hover:text-teal-600">Accounts</RouterLink>
        <RouterLink to="/year-overview" class="hover:text-teal-600">Year overview</RouterLink>
        <RouterLink to="/tax" class="hover:text-teal-600">Tax</RouterLink>
        <RouterLink to="/loans" class="hover:text-teal-600">Loans</RouterLink>
        <RouterLink to="/worklog" class="hover:text-teal-600">Worklog</RouterLink>
        <RouterLink to="/assets" class="hover:text-teal-600">Assets</RouterLink>
        <RouterLink to="/trips" class="hover:text-teal-600">Trips</RouterLink>
        <RouterLink to="/leave-book" class="hover:text-teal-600">Leave book</RouterLink>
        <RouterLink to="/pt-board" class="hover:text-teal-600">PT Board</RouterLink>
        <RouterLink to="/office" class="hover:text-teal-600">Office</RouterLink>
        <RouterLink to="/random-pick" class="hover:text-teal-600">Random pick</RouterLink>
        <RouterLink to="/vacancies" class="hover:text-teal-600">Vacancies</RouterLink>
        <RouterLink to="/statistics" class="hover:text-teal-600">Statistics</RouterLink>
        <RouterLink to="/metrics" class="hover:text-teal-600">Metrics</RouterLink>
        <RouterLink to="/marketplace" class="hover:text-teal-600">Marketplace</RouterLink>
        <RouterLink to="/static-files" class="hover:text-teal-600">Static files</RouterLink>
        <RouterLink to="/commands" class="hover:text-teal-600">Commands</RouterLink>
        <RouterLink to="/settings" class="hover:text-teal-600">Settings</RouterLink>
        <RouterLink to="/api-docs" class="hover:text-teal-600">API docs</RouterLink>
        <RouterLink to="/change-password" class="hover:text-teal-600">Change password</RouterLink>
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
