<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const memos = [
  { title: 'Holiday schedule', author: 'HR', date: '2024-12-05', status: 'Published' },
  { title: 'Office move', author: 'Operations', date: '2024-11-28', status: 'Draft' },
  { title: 'Security update', author: 'IT', date: '2024-11-20', status: 'Published' },
]

const statusColor = (status: string) =>
  status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Management</p>
        <h1 class="text-3xl font-bold text-slate-900">Memos</h1>
        <p class="text-slate-600">Internal announcements and policies.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">New memo</Button>
        <Button size="sm">Publish</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="memo in memos" :key="memo.title" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ memo.title }}</p>
            <p class="text-sm text-slate-600">By {{ memo.author }} · {{ memo.date }}</p>
          </div>
          <Badge :class="statusColor(memo.status)">{{ memo.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
