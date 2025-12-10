<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'

const metrics = [
  { label: 'Utilization', value: '78%', hint: 'Billable / total hours' },
  { label: 'NPS', value: '54', hint: 'Customer satisfaction' },
  { label: 'Time to hire', value: '32 days', hint: 'Avg from posting to acceptance' },
  { label: 'Absence rate', value: '3.1%', hint: 'Sick + vacation' },
]
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Metrics</h1>
        <p class="text-slate-600">Operational KPIs.</p>
      </div>
      <Badge class="bg-teal-50 text-teal-700">Snapshot</Badge>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="metric in metrics" :key="metric.label" class="p-4 space-y-1">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{{ metric.label }}</p>
        <p class="text-2xl font-bold text-slate-900">{{ metric.value }}</p>
        <p class="text-sm text-slate-600">{{ metric.hint }}</p>
      </Card>
    </div>
  </section>
</template>
