<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const reports = [
  { name: 'Monthly P&L', description: 'Revenue, expenses, and profit', schedule: '1st of month' },
  { name: 'VAT export', description: 'Tax-ready export for AADE', schedule: 'Weekly' },
  { name: 'Worklog report', description: 'Hours per employee and project', schedule: 'Daily' },
  { name: 'Payroll summary', description: 'Gross/net, contributions, taxes', schedule: 'Monthly' },
]
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Reports & Exports</p>
        <h1 class="text-3xl font-bold text-slate-900">Reports</h1>
        <p class="text-slate-600">Common financial and operational exports.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Download all</Button>
        <Button size="sm">Schedule report</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="report in reports" :key="report.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ report.name }}</p>
            <p class="text-sm text-slate-600">{{ report.description }}</p>
          </div>
          <Badge class="bg-slate-100 text-slate-700">Schedule: {{ report.schedule }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Download</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
