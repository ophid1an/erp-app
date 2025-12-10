<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Expense = {
  id: string
  date: string
  supplier: string
  category: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
}

const expenses = ref<Expense[]>([
  { id: 'EXP-341', date: '2024-12-08', supplier: 'Speedex', category: 'Logistics', amount: 280, status: 'Pending' },
  { id: 'EXP-338', date: '2024-12-06', supplier: 'CloudCo', category: 'SaaS', amount: 520, status: 'Approved' },
  { id: 'EXP-335', date: '2024-12-04', supplier: 'Travel SA', category: 'Travel', amount: 1240, status: 'Approved' },
  { id: 'EXP-329', date: '2024-12-02', supplier: 'OfficeMart', category: 'Supplies', amount: 180, status: 'Rejected' },
  { id: 'EXP-324', date: '2024-11-30', supplier: 'One Seed', category: 'Services', amount: 900, status: 'Pending' },
])

const search = ref('')
const statusFilter = ref<'All' | Expense['status']>('All')

const filtered = computed(() =>
  expenses.value.filter((exp) => {
    const s = search.value.toLowerCase()
    const matches = exp.id.toLowerCase().includes(s) || exp.supplier.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : exp.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Expense['status']) => {
  if (status === 'Approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Pending') return 'bg-amber-50 text-amber-700'
  return 'bg-rose-50 text-rose-700'
}

const formatAmount = (amount: number) => `€${amount.toLocaleString('en-US')}`
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Expenses</h1>
        <p class="text-slate-600">Track expense requests and approvals.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">New expense</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="expense-search">Search expenses</Label>
          <Input id="expense-search" v-model="search" placeholder="Search by ID or supplier…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Pending', 'Approved', 'Rejected']"
              :key="status"
              size="sm"
              :variant="statusFilter === status ? 'default' : 'outline'"
              @click="statusFilter = status as typeof statusFilter"
            >
              {{ status }}
            </Button>
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-xl border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-slate-600">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">ID</th>
              <th class="px-4 py-3 text-left font-semibold">Date</th>
              <th class="px-4 py-3 text-left font-semibold">Supplier</th>
              <th class="px-4 py-3 text-left font-semibold">Category</th>
              <th class="px-4 py-3 text-right font-semibold">Amount</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="exp in filtered" :key="exp.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ exp.id }}</td>
              <td class="px-4 py-3 text-slate-700">{{ exp.date }}</td>
              <td class="px-4 py-3 text-slate-700">{{ exp.supplier }}</td>
              <td class="px-4 py-3 text-slate-700">{{ exp.category }}</td>
              <td class="px-4 py-3 text-right font-semibold text-slate-900">{{ formatAmount(exp.amount) }}</td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(exp.status)">{{ exp.status }}</Badge>
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
