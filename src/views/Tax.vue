<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const filings = [
  { name: 'VAT Q4', due: '2025-01-20', amount: 12400, status: 'Pending' },
  { name: 'Income tax', due: '2025-03-31', amount: 34200, status: 'Scheduled' },
]

const statusColor = (status: string) =>
  status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Tax</h1>
        <p class="text-slate-600">Upcoming filings and amounts.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Pay</Button>
      </div>
    </div>

    <Card class="p-4 space-y-3">
      <div class="grid gap-3 md:grid-cols-2">
        <div
          v-for="f in filings"
          :key="f.name"
          class="rounded-xl border border-slate-100 p-3 hover:border-teal-100 hover:bg-teal-50/40 transition"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ f.name }}</p>
              <p class="text-sm text-slate-600">Due {{ f.due }}</p>
              <p class="text-sm text-slate-600">Amount: €{{ f.amount.toLocaleString('en-US') }}</p>
            </div>
            <Badge :class="statusColor(f.status)">{{ f.status }}</Badge>
          </div>
          <div class="flex gap-2 mt-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="ghost">Mark paid</Button>
          </div>
        </div>
      </div>
    </Card>
  </section>
</template>
