<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const commands = [
  { name: 'Send daily issues email', key: 'erp:issues:notify', schedule: 'Daily 09:00', status: 'Enabled' },
  { name: 'Generate invoices', key: 'erp:invoice:generate', schedule: 'Monthly 1st', status: 'Enabled' },
  { name: 'Cleanup attachments', key: 'erp:attachments:cleanup', schedule: 'Weekly Sunday', status: 'Disabled' },
]

const statusColor = (status: string) =>
  status === 'Enabled' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">System</p>
        <h1 class="text-3xl font-bold text-slate-900">Commands</h1>
        <p class="text-slate-600">Scheduled and manual commands.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Run selected</Button>
        <Button size="sm">New command</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="cmd in commands" :key="cmd.key" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ cmd.name }}</p>
            <p class="text-sm text-slate-600">{{ cmd.key }}</p>
            <p class="text-xs text-slate-500">Schedule: {{ cmd.schedule }}</p>
          </div>
          <Badge :class="statusColor(cmd.status)">{{ cmd.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">Run now</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
