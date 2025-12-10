<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const kpis = [
  { label: 'Monthly revenue', value: '€182,400', change: '+8.2% vs last month' },
  { label: 'Open invoices', value: '42', change: '12 pending approval' },
  { label: 'Avg. payment time', value: '18 days', change: '-2.1 days' },
  { label: 'Active employees', value: '186', change: '5 on leave' },
]

const shortcuts = [
  { title: 'Create invoice', description: 'Draft a new customer invoice', cta: 'New invoice' },
  { title: 'Log transaction', description: 'Record a payment or expense', cta: 'Add transaction' },
  {
    title: 'Export reports',
    description: 'Monthly statements and tax exports',
    cta: 'Open exports',
  },
]

const graphBars = [
  { label: 'Mon', value: 52 },
  { label: 'Tue', value: 68 },
  { label: 'Wed', value: 90 },
  { label: 'Thu', value: 76 },
  { label: 'Fri', value: 64 },
  { label: 'Sat', value: 32 },
  { label: 'Sun', value: 24 },
]
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Download report</Button>
        <Button size="sm">Create invoice</Button>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="kpi in kpis" :key="kpi.label" class="p-4 space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
          {{ kpi.label }}
        </p>
        <p class="text-2xl font-bold text-slate-900">{{ kpi.value }}</p>
        <p class="text-sm text-emerald-600">{{ kpi.change }}</p>
      </Card>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="p-4 lg:col-span-2">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Cash flow
            </p>
            <h2 class="text-lg font-semibold text-slate-900">This week</h2>
          </div>
          <Badge>Live</Badge>
        </div>

        <div class="mt-6 grid grid-cols-7 gap-3 items-end">
          <div
            v-for="bar in graphBars"
            :key="bar.label"
            class="flex flex-col items-center justify-end gap-2 text-xs text-slate-600"
          >
            <div class="w-full rounded-lg bg-teal-100">
              <div
                class="rounded-lg bg-teal-500 transition-all"
                :style="{ height: `${bar.value}px`, minHeight: '12px' }"
              />
            </div>
            <span>{{ bar.label }}</span>
          </div>
        </div>
      </Card>

      <Card class="p-4 space-y-3">
        <div class="space-y-3">
          <div
            v-for="item in shortcuts"
            :key="item.title"
            class="rounded-xl border border-slate-100 p-3 hover:border-teal-100 hover:bg-teal-50/40 transition"
          >
            <p class="text-sm font-semibold text-slate-900">{{ item.title }}</p>
            <p class="text-xs text-slate-600">{{ item.description }}</p>
            <Button variant="ghost" size="sm" class="mt-2 px-0 text-teal-600">{{
              item.cta
            }}</Button>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>
