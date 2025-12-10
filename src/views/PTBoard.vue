<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'

const teams = [
  { name: 'Platform', members: 8, lead: 'Alex P.', status: 'Healthy' },
  { name: 'Product', members: 6, lead: 'Maria K.', status: 'At risk' },
  { name: 'Design', members: 4, lead: 'Sofia L.', status: 'Healthy' },
]

const statusColor = (status: string) =>
  status === 'Healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">PT Board</h1>
        <p class="text-slate-600">Snapshot of project teams.</p>
      </div>
      <Badge class="bg-teal-50 text-teal-700">Live</Badge>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <Card v-for="team in teams" :key="team.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ team.name }}</p>
            <p class="text-sm text-slate-600">Lead: {{ team.lead }}</p>
            <p class="text-sm text-slate-600">Members: {{ team.members }}</p>
          </div>
          <Badge :class="statusColor(team.status)">{{ team.status }}</Badge>
        </div>
      </Card>
    </div>
  </section>
</template>
