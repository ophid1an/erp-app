<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Leave = {
  id: number
  person: string
  type: string
  from: string
  to: string
  days: number
  status: 'Pending' | 'Approved' | 'Rejected'
}

const leaves = ref<Leave[]>([
  { id: 1, person: 'Alex P.', type: 'Annual', from: '2024-12-20', to: '2024-12-27', days: 6, status: 'Approved' },
  { id: 2, person: 'Maria K.', type: 'Sick', from: '2024-12-10', to: '2024-12-12', days: 3, status: 'Pending' },
  { id: 3, person: 'Giannis D.', type: 'Parental', from: '2024-12-05', to: '2024-12-19', days: 11, status: 'Approved' },
])

const search = ref('')
const statusFilter = ref<'All' | Leave['status']>('All')

const filtered = computed(() =>
  leaves.value.filter((leave) => {
    const s = search.value.toLowerCase()
    const matches = leave.person.toLowerCase().includes(s) || leave.type.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : leave.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Leave['status']) => {
  if (status === 'Approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Pending') return 'bg-amber-50 text-amber-700'
  return 'bg-rose-50 text-rose-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Leave book</h1>
        <p class="text-slate-600">Track employee leave requests and approvals.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">New request</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="leave-search">Search</Label>
          <Input id="leave-search" v-model="search" placeholder="Search by person or type…" />
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
              <th class="px-4 py-3 text-left font-semibold">Person</th>
              <th class="px-4 py-3 text-left font-semibold">Type</th>
              <th class="px-4 py-3 text-left font-semibold">From</th>
              <th class="px-4 py-3 text-left font-semibold">To</th>
              <th class="px-4 py-3 text-right font-semibold">Days</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="leave in filtered" :key="leave.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ leave.person }}</td>
              <td class="px-4 py-3 text-slate-700">{{ leave.type }}</td>
              <td class="px-4 py-3 text-slate-700">{{ leave.from }}</td>
              <td class="px-4 py-3 text-slate-700">{{ leave.to }}</td>
              <td class="px-4 py-3 text-right text-slate-900">{{ leave.days }}</td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(leave.status)">{{ leave.status }}</Badge>
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
