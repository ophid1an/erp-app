<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const products = [
  { name: 'Ergonomic Chair', category: 'Office', price: 320, status: 'Available' },
  { name: 'Noise-canceling Headphones', category: 'Office', price: 240, status: 'Available' },
  { name: 'Laptop Stand', category: 'Accessory', price: 60, status: 'Limited' },
]

const statusColor = (status: string) =>
  status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Employees</p>
        <h1 class="text-3xl font-bold text-slate-900">Marketplace</h1>
        <p class="text-slate-600">Request or browse available assets.</p>
      </div>
      <Button size="sm">Request item</Button>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <Card v-for="product in products" :key="product.name" class="p-4 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-lg font-semibold text-slate-900">{{ product.name }}</p>
            <p class="text-sm text-slate-600">{{ product.category }}</p>
            <p class="text-sm text-slate-600">€{{ product.price }}</p>
          </div>
          <Badge :class="statusColor(product.status)">{{ product.status }}</Badge>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Request</Button>
        </div>
      </Card>
    </div>
  </section>
</template>
