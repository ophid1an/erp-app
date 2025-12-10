<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const links = [
  { name: 'API reference', href: '/documentation', status: 'Live' },
  { name: 'OpenAPI spec', href: '/documentation/openapi.json', status: 'Live' },
  { name: 'Postman collection', href: '#', status: 'Soon' },
]

const statusColor = (status: string) =>
  status === 'Live' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Developers</p>
        <h1 class="text-3xl font-bold text-slate-900">API docs</h1>
        <p class="text-slate-600">Reference and tools for integrations.</p>
      </div>
      <Button size="sm">Open docs</Button>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <Card v-for="link in links" :key="link.name" class="p-4 flex items-center justify-between">
        <div>
          <p class="text-lg font-semibold text-slate-900">{{ link.name }}</p>
          <p class="text-sm text-slate-600">{{ link.href }}</p>
        </div>
        <div class="flex items-center gap-2">
          <Badge :class="statusColor(link.status)">{{ link.status }}</Badge>
          <Button as="a" :href="link.href" size="sm" variant="outline">Open</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
