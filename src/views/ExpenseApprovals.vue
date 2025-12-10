<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Approval = {
  id: string
  requester: string
  category: string
  amount: number
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const approvals = ref<Approval[]>([
  { id: 'EXP-410', requester: 'Alex P.', category: 'Travel', amount: 980, date: '2024-12-10', status: 'Pending' },
  { id: 'EXP-408', requester: 'Maria K.', category: 'Supplies', amount: 220, date: '2024-12-09', status: 'Approved' },
  { id: 'EXP-404', requester: 'Giannis D.', category: 'Training', amount: 450, date: '2024-12-08', status: 'Rejected' },
])

const search = ref('')
const statusFilter = ref<'All' | Approval['status']>('All')

const filtered = computed(() =>
  approvals.value.filter((item) => {
    const s = search.value.toLowerCase()
    const matches =
      item.id.toLowerCase().includes(s) ||
      item.requester.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : item.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Approval['status']) => {
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
        <h1 class="text-3xl font-bold text-slate-900">Expense approvals</h1>
        <p class="text-slate-600">Review and approve expense requests.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Bulk approve</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="approval-search">Search</Label>
          <Input id="approval-search" v-model="search" placeholder="Search by ID, requester, or category…" />
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
              <th class="px-4 py-3 text-left font-semibold">Requester</th>
              <th class="px-4 py-3 text-left font-semibold">Category</th>
              <th class="px-4 py-3 text-right font-semibold">Amount</th>
              <th class="px-4 py-3 text-left font-semibold">Date</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="item in filtered" :key="item.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ item.id }}</td>
              <td class="px-4 py-3 text-slate-700">{{ item.requester }}</td>
              <td class="px-4 py-3 text-slate-700">{{ item.category }}</td>
              <td class="px-4 py-3 text-right font-semibold text-slate-900">{{ formatAmount(item.amount) }}</td>
              <td class="px-4 py-3 text-slate-700">{{ item.date }}</td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(item.status)">{{ item.status }}</Badge>
              </td>
              <td class="px-4 py-3 text-right">
                <Button size="sm" variant="ghost">Approve</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </section>
</template>
