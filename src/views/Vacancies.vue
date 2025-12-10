<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const vacancies = [
  { title: 'Senior Engineer', team: 'Platform', location: 'Athens/Remote', status: 'Open' },
  { title: 'Product Manager', team: 'Product', location: 'Remote', status: 'Interviewing' },
  { title: 'UI Designer', team: 'Design', location: 'Athens', status: 'Open' },
]

const statusColor = (status: string) =>
  status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Hiring</p>
        <h1 class="text-3xl font-bold text-slate-900">Vacancies</h1>
        <p class="text-slate-600">Open roles across teams.</p>
      </div>
      <Button size="sm">Post new role</Button>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="vacancy in vacancies" :key="vacancy.title" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ vacancy.title }}</p>
            <p class="text-sm text-slate-600">{{ vacancy.team }} · {{ vacancy.location }}</p>
          </div>
          <Badge :class="statusColor(vacancy.status)">{{ vacancy.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Share</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
