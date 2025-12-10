<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Transaction = {
  id: string
  date: string
  counterparty: string
  category: string
  amount: number
  status: 'Pending' | 'Settled' | 'Flagged'
}

const transactions = ref<Transaction[]>([
  { id: 'TX-9241', date: '2024-12-10', counterparty: 'Acme Corp', category: 'Invoice', amount: 1820, status: 'Pending' },
  { id: 'TX-9238', date: '2024-12-09', counterparty: 'Speedex', category: 'Logistics', amount: -240, status: 'Settled' },
  { id: 'TX-9231', date: '2024-12-08', counterparty: 'Payroll', category: 'Salary', amount: -9500, status: 'Settled' },
  { id: 'TX-9224', date: '2024-12-07', counterparty: 'Tax Office', category: 'VAT', amount: -4100, status: 'Pending' },
  { id: 'TX-9219', date: '2024-12-06', counterparty: 'One Seed', category: 'Invoice', amount: 12400, status: 'Settled' },
  { id: 'TX-9211', date: '2024-12-05', counterparty: 'Contractor', category: 'Services', amount: -1800, status: 'Flagged' },
])

const search = ref('')
const statusFilter = ref<'All' | Transaction['status']>('All')

const filtered = computed(() =>
  transactions.value.filter((tx) => {
    const matchesSearch =
      tx.counterparty.toLowerCase().includes(search.value.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' ? true : tx.status === statusFilter.value
    return matchesSearch && matchesStatus
  }),
)

const statusColor = (status: Transaction['status']) => {
  if (status === 'Settled') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Pending') return 'bg-amber-50 text-amber-700'
  return 'bg-rose-50 text-rose-700'
}

const formatAmount = (amount: number) =>
  `${amount < 0 ? '-' : '+'}€${Math.abs(amount).toLocaleString('en-US')}`
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Accounting</p>
        <h1 class="text-3xl font-bold text-slate-900">Transactions</h1>
        <p class="text-slate-600">Search and filter recent transactions. Replace with API data when wiring.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export CSV</Button>
        <Button size="sm">Add transaction</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="tx-search">Search</Label>
          <Input id="tx-search" v-model="search" placeholder="Search by ID or counterparty…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Pending', 'Settled', 'Flagged']"
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
              <th class="px-4 py-3 text-left font-semibold">Counterparty</th>
              <th class="px-4 py-3 text-left font-semibold">Category</th>
              <th class="px-4 py-3 text-right font-semibold">Amount</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="tx in filtered" :key="tx.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ tx.id }}</td>
              <td class="px-4 py-3 text-slate-700">{{ tx.date }}</td>
              <td class="px-4 py-3 text-slate-700">{{ tx.counterparty }}</td>
              <td class="px-4 py-3 text-slate-700">{{ tx.category }}</td>
              <td
                class="px-4 py-3 text-right font-semibold"
                :class="tx.amount < 0 ? 'text-rose-600' : 'text-emerald-600'"
              >
                {{ formatAmount(tx.amount) }}
              </td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(tx.status)">{{ tx.status }}</Badge>
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
