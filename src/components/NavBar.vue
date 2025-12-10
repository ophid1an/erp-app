<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from './ui/Button.vue'

const navGroups = [
  {
    label: 'Overview',
    links: [
      { label: 'Dashboard', to: '/' },
      { label: 'Reports', to: '/reports' },
      { label: 'Year overview', to: '/year-overview' },
      { label: 'Metrics', to: '/metrics' },
      { label: 'Statistics', to: '/statistics' },
    ],
  },
  {
    label: 'Finance',
    links: [
      { label: 'Transactions', to: '/transactions' },
      { label: 'Invoices', to: '/invoices' },
      { label: 'Expenses', to: '/expenses' },
      { label: 'Suppliers', to: '/suppliers' },
      { label: 'Expense approvals', to: '/expense-approvals' },
      { label: 'Accounts', to: '/accounts' },
      { label: 'Tax', to: '/tax' },
      { label: 'Loans', to: '/loans' },
      { label: 'Assets', to: '/assets' },
    ],
  },
  {
    label: 'People',
    links: [
      { label: 'Clients', to: '/clients' },
      { label: 'Contacts', to: '/contacts' },
      { label: 'Employees', to: '/employees' },
      { label: 'Vacancies', to: '/vacancies' },
      { label: 'Payroll', to: '/payroll' },
      { label: 'Worklog', to: '/worklog' },
      { label: 'Leave book', to: '/leave-book' },
      { label: 'PT Board', to: '/pt-board' },
    ],
  },
  {
    label: 'Operations',
    links: [
      { label: 'Trips', to: '/trips' },
      { label: 'Offices', to: '/offices' },
      { label: 'Office', to: '/office' },
      { label: 'Decisions', to: '/decisions' },
      { label: 'Marketplace', to: '/marketplace' },
      { label: 'Commands', to: '/commands' },
      { label: 'Memos', to: '/memos' },
      { label: 'Menu', to: '/menu' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Static files', to: '/static-files' },
      { label: 'API docs', to: '/api-docs' },
      { label: 'Random pick', to: '/random-pick' },
    ],
  },
  {
    label: 'Account',
    links: [
      { label: 'Settings', to: '/settings' },
      { label: 'Change password', to: '/change-password' },
      { label: 'Login', to: '/login' },
      { label: 'Reset', to: '/reset' },
    ],
  },
]

const isExpanded = ref(true)
const flatLinks = computed(() => navGroups.flatMap((group) => group.links))
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div class="flex flex-col max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div class="flex items-center gap-3">
        <img src="../assets/codeseed-logo-dark.svg" alt="Codeseed logo" class="h-8 w-auto" />
      </div>

      <div class="flex items-center gap-2 flex-row-reverse sm:flex-row justify-center">
        <Button as="a" variant="outline" size="sm" href="/login">Sign in</Button>
        <Button as="a" size="sm" href="/employees">Employees</Button>
        <div class="flex w-full flex-col gap-3">
          <div class="flex flex-row-reverse items-center justify-between gap-3">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              @click="isExpanded = !isExpanded"
              :aria-label="isExpanded ? 'Collapse menu' : 'Expand all'"
            >
              <svg
                class="h-4 w-4 transition"
                :class="isExpanded ? 'rotate-180 text-teal-600' : 'text-slate-500'"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M10 11a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 13.414l-4.293 4.293A1 1 0 014.293 15.293l5-5A1 1 0 0110 11z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <nav
            v-if="isExpanded"
            class="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <RouterLink
              v-for="link in flatLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-full border border-slate-200 bg-white px-3 py-1 transition hover:border-teal-200 hover:text-teal-700"
            >
              {{ link.label }}
            </RouterLink>
          </nav>

          <div v-else class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <section
              v-for="group in navGroups"
              :key="group.label"
              class="rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-teal-200"
            >
              <details class="group relative overflow-visible open:shadow-md">
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-slate-800 transition group-open:text-teal-700"
                >
                  <span>{{ group.label }}</span>
                  <svg
                    class="h-4 w-4 transition group-open:rotate-180 group-open:text-teal-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-5-5A1 1 0 015.707 5.293L10 9.586l4.293-4.293A1 1 0 1115.707 6.707l-5 5A1 1 0 0110 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </summary>
                <div
                  class="absolute left-0 right-0 top-full z-30 hidden rounded-lg border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 group-open:block"
                >
                  <div class="flex flex-col gap-1 px-3 py-3 text-sm font-semibold text-slate-700">
                    <RouterLink
                      v-for="link in group.links"
                      :key="link.to"
                      :to="link.to"
                      class="rounded-md px-2 py-1 transition hover:bg-teal-50 hover:text-teal-700"
                    >
                      {{ link.label }}
                    </RouterLink>
                  </div>
                </div>
              </details>
            </section>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
