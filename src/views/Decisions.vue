<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const decisions = [
  { title: 'Adopt new expense policy', author: 'Finance', date: '2024-12-01', status: 'Approved' },
  { title: 'Remote work Fridays', author: 'HR', date: '2024-11-18', status: 'Approved' },
  { title: 'Office move proposal', author: 'Operations', date: '2024-11-25', status: 'Pending' },
]

const statusColor = (status: string) =>
  status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Governance</p>
        <h1 class="text-3xl font-bold text-slate-900">Decisions</h1>
        <p class="text-slate-600">Track organizational decisions.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">New decision</Button>
        <Button size="sm">Publish</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="decision in decisions" :key="decision.title" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ decision.title }}</p>
            <p class="text-sm text-slate-600">By {{ decision.author }} · {{ decision.date }}</p>
          </div>
          <Badge :class="statusColor(decision.status)">{{ decision.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
