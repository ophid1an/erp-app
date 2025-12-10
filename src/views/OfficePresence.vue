<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'

const people = [
  { name: 'Alex P.', location: 'Athens HQ', status: 'In office' },
  { name: 'Maria K.', location: 'Remote', status: 'Remote' },
  { name: 'Giannis D.', location: 'Athens HQ', status: 'In office' },
  { name: 'Sofia L.', location: 'Thessaloniki', status: 'In office' },
]

const statusColor = (status: string) =>
  status === 'In office' ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Who is at the office</h1>
        <p class="text-slate-600">Current presence across locations.</p>
      </div>
      <Badge class="bg-teal-50 text-teal-700">Live</Badge>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="person in people" :key="person.name" class="p-4 flex items-center justify-between">
        <div>
          <p class="text-lg font-semibold text-slate-900">{{ person.name }}</p>
          <p class="text-sm text-slate-600">{{ person.location }}</p>
        </div>
        <Badge :class="statusColor(person.status)">{{ person.status }}</Badge>
      </Card>
    </div>
  </section>
</template>
