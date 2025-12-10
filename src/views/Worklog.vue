<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Entry = {
  id: number
  person: string
  project: string
  date: string
  hours: number
  status: 'Submitted' | 'Approved' | 'Missing'
}

const entries = ref<Entry[]>([
  { id: 1, person: 'Alex P.', project: 'Platform', date: '2024-12-10', hours: 8, status: 'Approved' },
  { id: 2, person: 'Maria K.', project: 'Product', date: '2024-12-10', hours: 7.5, status: 'Submitted' },
  { id: 3, person: 'Giannis D.', project: 'HR Ops', date: '2024-12-09', hours: 0, status: 'Missing' },
  { id: 4, person: 'Sofia L.', project: 'Design', date: '2024-12-09', hours: 6, status: 'Approved' },
])

const search = ref('')
const statusFilter = ref<'All' | Entry['status']>('All')

const filtered = computed(() =>
  entries.value.filter((entry) => {
    const s = search.value.toLowerCase()
    const matches =
      entry.person.toLowerCase().includes(s) || entry.project.toLowerCase().includes(s) || entry.date.includes(s)
    const statusOk = statusFilter.value === 'All' ? true : entry.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Entry['status']) => {
  if (status === 'Approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Submitted') return 'bg-sky-50 text-sky-700'
  return 'bg-rose-50 text-rose-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Worklog</h1>
        <p class="text-slate-600">Monitor daily submissions across projects.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Remind missing</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="worklog-search">Search worklogs</Label>
          <Input id="worklog-search" v-model="search" placeholder="Search by person, project, or date…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Submitted', 'Approved', 'Missing']"
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
              <th class="px-4 py-3 text-left font-semibold">Project</th>
              <th class="px-4 py-3 text-left font-semibold">Date</th>
              <th class="px-4 py-3 text-right font-semibold">Hours</th>
              <th class="px-4 py-3 text-left font-semibold">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="entry in filtered" :key="entry.id" class="hover:bg-slate-50/60">
              <td class="px-4 py-3 font-semibold text-slate-900">{{ entry.person }}</td>
              <td class="px-4 py-3 text-slate-700">{{ entry.project }}</td>
              <td class="px-4 py-3 text-slate-700">{{ entry.date }}</td>
              <td class="px-4 py-3 text-right text-slate-900">{{ entry.hours || '—' }}</td>
              <td class="px-4 py-3">
                <Badge :class="statusColor(entry.status)">{{ entry.status }}</Badge>
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
