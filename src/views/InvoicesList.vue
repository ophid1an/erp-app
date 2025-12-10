<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Invoice = {
  id: string
  client: string
  issued: string
  due: string
  amount: number
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
}

const invoices = ref<Invoice[]>([
  { id: 'INV-1042', client: 'Acme Corp', issued: '2024-12-05', due: '2025-01-05', amount: 4200, status: 'Sent' },
  { id: 'INV-1039', client: 'Speedex', issued: '2024-12-02', due: '2024-12-20', amount: 980, status: 'Overdue' },
  { id: 'INV-1035', client: 'One Seed', issued: '2024-11-28', due: '2024-12-28', amount: 12200, status: 'Paid' },
  { id: 'INV-1031', client: 'Initech', issued: '2024-11-25', due: '2024-12-25', amount: 3100, status: 'Sent' },
  { id: 'INV-1028', client: 'Globex', issued: '2024-11-22', due: '2024-12-10', amount: 1560, status: 'Draft' },
])

const search = ref('')
const statusFilter = ref<'All' | Invoice['status']>('All')

const filtered = computed(() =>
  invoices.value.filter((inv) => {
    const s = search.value.toLowerCase()
    const matches = inv.id.toLowerCase().includes(s) || inv.client.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : inv.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Invoice['status']) => {
  if (status === 'Paid') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Sent') return 'bg-sky-50 text-sky-700'
  if (status === 'Draft') return 'bg-slate-100 text-slate-700'
  return 'bg-rose-50 text-rose-700'
}

const formatAmount = (amount: number) => `€${amount.toLocaleString('en-US')}`
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Billing</p>
        <h1 class="text-3xl font-bold text-slate-900">Invoices</h1>
        <p class="text-slate-600">Track invoice lifecycle across clients.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Create invoice</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="invoice-search">Search invoices</Label>
          <Input id="invoice-search" v-model="search" placeholder="Search by ID or client…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Draft', 'Sent', 'Paid', 'Overdue']"
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
              <th class="px-4 py-3 text-left font-semibold">Client</th>
              <th class="px-4 py-3 text-left font-semibold">Issued</th>
              <th class="px-4 py-3 text-left font-semibold">Due</th>
              <th class="px-4 py-3 text-right font-semibold">Amount</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="inv in filtered" :key="inv.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ inv.id }}</td>
              <td class="px-4 py-3 text-slate-700">{{ inv.client }}</td>
              <td class="px-4 py-3 text-slate-700">{{ inv.issued }}</td>
              <td class="px-4 py-3 text-slate-700">{{ inv.due }}</td>
              <td class="px-4 py-3 text-right font-semibold text-slate-900">
                {{ formatAmount(inv.amount) }}
              </td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(inv.status)">{{ inv.status }}</Badge>
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
