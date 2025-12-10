<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const files = [
  { name: 'HR Handbook.pdf', type: 'Document', size: '1.2 MB', updated: '2024-12-08', status: 'Published' },
  { name: 'Brand Guidelines.zip', type: 'Archive', size: '8.5 MB', updated: '2024-11-30', status: 'Published' },
  { name: 'Office Map.png', type: 'Image', size: '640 KB', updated: '2024-11-25', status: 'Draft' },
]

const statusColor = (status: string) =>
  status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Content</p>
        <h1 class="text-3xl font-bold text-slate-900">Static files</h1>
        <p class="text-slate-600">Manage published documents and assets.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Upload</Button>
        <Button size="sm">New file</Button>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="file in files" :key="file.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ file.name }}</p>
            <p class="text-sm text-slate-600">{{ file.type }} · {{ file.size }}</p>
            <p class="text-xs text-slate-500">Updated {{ file.updated }}</p>
          </div>
          <Badge :class="statusColor(file.status)">{{ file.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Publish</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
