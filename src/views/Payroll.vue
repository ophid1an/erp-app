<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

type PayrollRun = {
  id: string
  period: string
  processed: string
  employees: number
  total: number
  status: 'Pending' | 'Processed'
}

const runs: PayrollRun[] = [
  { id: 'PAY-2024-11', period: 'Nov 2024', processed: '2024-11-30', employees: 186, total: 186000, status: 'Processed' },
  { id: 'PAY-2024-12', period: 'Dec 2024', processed: '—', employees: 189, total: 0, status: 'Pending' },
]

const statusColor = (status: PayrollRun['status']) =>
  status === 'Processed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Payroll</p>
        <h1 class="text-3xl font-bold text-slate-900">Payroll runs</h1>
        <p class="text-slate-600">Upcoming and completed payroll cycles.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Start payroll</Button>
      </div>
    </div>

    <Card class="p-4 space-y-3">
      <div class="overflow-hidden rounded-xl border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-slate-600">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Period</th>
              <th class="px-4 py-3 text-left font-semibold">Processed on</th>
              <th class="px-4 py-3 text-left font-semibold">Employees</th>
              <th class="px-4 py-3 text-right font-semibold">Total</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="run in runs" :key="run.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ run.period }}</td>
              <td class="px-4 py-3 text-slate-700">{{ run.processed }}</td>
              <td class="px-4 py-3 text-slate-700">{{ run.employees }}</td>
              <td class="px-4 py-3 text-right font-semibold text-slate-900">
                €{{ run.total ? run.total.toLocaleString('en-US') : '—' }}
              </td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(run.status)">{{ run.status }}</Badge>
              </td>
              <td class="px-4 py-3 text-right">
                <Button size="sm" variant="ghost">View</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </section>
</template>
