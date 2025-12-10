<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const loans = [
  { name: 'Working capital', lender: 'Alpha Bank', balance: 82000, rate: '4.2%', status: 'Active' },
  { name: 'Equipment', lender: 'Eurobank', balance: 24500, rate: '3.8%', status: 'Active' },
  { name: 'Legacy loan', lender: 'Piraeus', balance: 0, rate: '5.0%', status: 'Closed' },
]

const statusColor = (status: string) =>
  status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Loans</h1>
        <p class="text-slate-600">Track loan balances and rates.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add loan</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="loan in loans" :key="loan.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ loan.name }}</p>
            <p class="text-sm text-slate-600">{{ loan.lender }}</p>
            <p class="text-sm text-slate-600">Balance: €{{ loan.balance.toLocaleString('en-US') }}</p>
            <p class="text-sm text-slate-600">Rate: {{ loan.rate }}</p>
          </div>
          <Badge :class="statusColor(loan.status)">{{ loan.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
