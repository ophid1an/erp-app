<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'

type Employee = {
  id: number
  name: string
  title: string
  location: string
  team: string
  status: 'Active' | 'On leave' | 'Contractor'
}

const employees = ref<Employee[]>([
  { id: 1, name: 'Alexandros P.', title: 'Senior Engineer', location: 'Athens', team: 'Platform', status: 'Active' },
  { id: 2, name: 'Maria K.', title: 'Product Manager', location: 'Thessaloniki', team: 'Product', status: 'Active' },
  { id: 3, name: 'Giannis D.', title: 'HR Specialist', location: 'Remote', team: 'HR', status: 'On leave' },
  { id: 4, name: 'Sofia L.', title: 'Designer', location: 'Athens', team: 'Design', status: 'Contractor' },
  { id: 5, name: 'Nikos T.', title: 'Finance Analyst', location: 'Athens', team: 'Finance', status: 'Active' },
])

const search = ref('')
const filtered = computed(() =>
  employees.value.filter((employee) =>
    employee.name.toLowerCase().includes(search.value.trim().toLowerCase()),
  ),
)

const statusColor = (status: Employee['status']) => {
  if (status === 'Active') return 'bg-emerald-50 text-emerald-700'
  if (status === 'On leave') return 'bg-amber-50 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold">Employees</h1>
        <p class="text-slate-600">Quick lookup of employees. Replace with API integration when ready.</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add employee</Button>
      </div>
    </div>

    <Card class="p-4">
      <div class="grid gap-4 md:grid-cols-3">
        <div class="md:col-span-2">
          <Label for="search">Search employees</Label>
          <Input id="search" v-model="search" placeholder="Search by name…" class="mt-1" />
        </div>
        <div class="flex items-end justify-end gap-2">
          <Button variant="outline" size="sm">Filters</Button>
          <Button size="sm">Apply</Button>
        </div>
      </div>
    </Card>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="employee in filtered" :key="employee.id" class="p-4">
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <p class="text-lg font-semibold text-slate-900">{{ employee.name }}</p>
            <p class="text-sm text-slate-600">{{ employee.title }}</p>
            <p class="text-sm text-slate-500">{{ employee.team }} · {{ employee.location }}</p>
          </div>
          <Badge :class="statusColor(employee.status)">{{ employee.status }}</Badge>
        </div>
        <div class="mt-4 flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Message</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
