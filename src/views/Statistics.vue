<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'

const stats = [
  { label: 'Headcount', value: '186', change: '+5 vs last month' },
  { label: 'Attrition', value: '8%', change: '-1.2pp vs last quarter' },
  { label: 'Avg tenure', value: '2.8 yrs', change: '+0.1 yr' },
  { label: 'Open roles', value: '6', change: 'Hiring across 3 teams' },
]
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Statistics</h1>
        <p class="text-slate-600">Key workforce numbers.</p>
      </div>
      <Badge class="bg-teal-50 text-teal-700">Monthly</Badge>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.label" class="p-4 space-y-1">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{{ stat.label }}</p>
        <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
        <p class="text-sm text-emerald-700">{{ stat.change }}</p>
      </Card>
    </div>
  </section>
</template>
