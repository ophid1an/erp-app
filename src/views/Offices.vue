<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const offices = [
  { name: 'Athens HQ', address: 'Syntagma, Athens', seats: 120, status: 'Open' },
  { name: 'Thessaloniki', address: 'Tsimiski 10, Thessaloniki', seats: 40, status: 'Open' },
  { name: 'Remote hub', address: 'Virtual', seats: 999, status: 'Open' },
]

const statusColor = (status: string) =>
  status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Locations</p>
        <h1 class="text-3xl font-bold text-slate-900">Offices</h1>
        <p class="text-slate-600">Manage office capacity and status.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Add office</Button>
        <Button size="sm">Export</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="office in offices" :key="office.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ office.name }}</p>
            <p class="text-sm text-slate-600">{{ office.address }}</p>
            <p class="text-sm text-slate-500">Seats: {{ office.seats }}</p>
          </div>
          <Badge :class="statusColor(office.status)">{{ office.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
