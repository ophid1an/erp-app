<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const accounts = [
  { name: 'Primary Bank', type: 'Checking', balance: 128400, currency: 'EUR', status: 'Active' },
  { name: 'Savings', type: 'Savings', balance: 40200, currency: 'EUR', status: 'Active' },
  { name: 'Petty cash', type: 'Cash', balance: 1800, currency: 'EUR', status: 'Active' },
]

const statusColor = (status: string) =>
  status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Accounts</h1>
        <p class="text-slate-600">Bank and cash accounts with balances.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add account</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="account in accounts" :key="account.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ account.name }}</p>
            <p class="text-sm text-slate-600">{{ account.type }} · {{ account.currency }}</p>
            <p class="text-sm text-slate-500">Balance: €{{ account.balance.toLocaleString('en-US') }}</p>
          </div>
          <Badge :class="statusColor(account.status)">{{ account.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
