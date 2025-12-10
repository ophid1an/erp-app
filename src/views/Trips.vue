<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Trip = {
  id: string
  employee: string
  destination: string
  dates: string
  status: 'Planned' | 'Approved' | 'Completed'
  cost: number
}

const trips = ref<Trip[]>([
  { id: 'TRP-210', employee: 'Nikos T.', destination: 'London', dates: 'Dec 12-15', status: 'Approved', cost: 1850 },
  { id: 'TRP-208', employee: 'Maria K.', destination: 'Berlin', dates: 'Dec 18-20', status: 'Planned', cost: 0 },
  { id: 'TRP-204', employee: 'Alex P.', destination: 'Athens', dates: 'Dec 2-3', status: 'Completed', cost: 320 },
])

const search = ref('')
const statusFilter = ref<'All' | Trip['status']>('All')

const filtered = computed(() =>
  trips.value.filter((trip) => {
    const s = search.value.toLowerCase()
    const matches =
      trip.employee.toLowerCase().includes(s) || trip.destination.toLowerCase().includes(s) || trip.id.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : trip.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Trip['status']) => {
  if (status === 'Approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Planned') return 'bg-sky-50 text-sky-700'
  return 'bg-teal-50 text-teal-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Travel</p>
        <h1 class="text-3xl font-bold text-slate-900">Trips</h1>
        <p class="text-slate-600">Manage business trips and approvals.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Create trip</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="trip-search">Search trips</Label>
          <Input id="trip-search" v-model="search" placeholder="Search by employee, destination, or ID…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Planned', 'Approved', 'Completed']"
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

      <div class="grid gap-3 lg:grid-cols-2">
        <Card v-for="trip in filtered" :key="trip.id" class="p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ trip.destination }}</p>
              <p class="text-sm text-slate-600">{{ trip.employee }} · {{ trip.dates }}</p>
              <p class="text-sm text-slate-500">ID: {{ trip.id }}</p>
            </div>
            <Badge :class="statusColor(trip.status)">{{ trip.status }}</Badge>
          </div>
          <div class="flex items-center justify-between text-sm text-slate-700">
            <span>Estimated cost: €{{ trip.cost ? trip.cost.toLocaleString('en-US') : '—' }}</span>
            <div class="flex gap-2">
              <Button size="sm" variant="outline">View</Button>
              <Button size="sm" variant="ghost">Approve</Button>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  </section>
</template>
