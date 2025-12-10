<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'

const months = [
  { month: 'Jan', revenue: 152000, expenses: 98000 },
  { month: 'Feb', revenue: 161000, expenses: 102000 },
  { month: 'Mar', revenue: 170500, expenses: 110000 },
  { month: 'Apr', revenue: 165000, expenses: 104000 },
  { month: 'May', revenue: 174000, expenses: 112000 },
  { month: 'Jun', revenue: 180000, expenses: 119000 },
]
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Year overview</h1>
        <p class="text-slate-600">Revenue vs expenses by month.</p>
      </div>
      <Badge class="bg-teal-50 text-teal-700">FY 2024</Badge>
    </div>

    <Card class="p-4">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <div
          v-for="m in months"
          :key="m.month"
          class="rounded-xl border border-slate-100 p-3 hover:border-teal-100 hover:bg-teal-50/40 transition"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{{ m.month }}</p>
          <p class="text-sm text-slate-700">Revenue: €{{ m.revenue.toLocaleString('en-US') }}</p>
          <p class="text-sm text-slate-700">Expenses: €{{ m.expenses.toLocaleString('en-US') }}</p>
          <p class="text-sm font-semibold" :class="m.revenue - m.expenses >= 0 ? 'text-emerald-700' : 'text-rose-700'">
            Net: €{{ (m.revenue - m.expenses).toLocaleString('en-US') }}
          </p>
        </div>
      </div>
    </Card>
  </section>
</template>
