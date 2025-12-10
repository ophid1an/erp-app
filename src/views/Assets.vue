<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Asset = {
  id: string
  name: string
  owner: string
  type: string
  status: 'In use' | 'In repair' | 'Available'
  location: string
}

const assets = ref<Asset[]>([
  { id: 'AST-102', name: 'MacBook Pro 14"', owner: 'Alex P.', type: 'Laptop', status: 'In use', location: 'Athens' },
  { id: 'AST-099', name: 'Dell U2720Q', owner: 'Pool', type: 'Monitor', status: 'Available', location: 'HQ' },
  { id: 'AST-095', name: 'Pixel 7', owner: 'Maria K.', type: 'Phone', status: 'In repair', location: 'Service' },
  { id: 'AST-090', name: 'Magic Keyboard', owner: 'Pool', type: 'Peripheral', status: 'Available', location: 'HQ' },
])

const search = ref('')
const statusFilter = ref<'All' | Asset['status']>('All')

const filtered = computed(() =>
  assets.value.filter((asset) => {
    const s = search.value.toLowerCase()
    const matches = asset.name.toLowerCase().includes(s) || asset.owner.toLowerCase().includes(s) || asset.id.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : asset.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Asset['status']) => {
  if (status === 'In use') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Available') return 'bg-sky-50 text-sky-700'
  return 'bg-amber-50 text-amber-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Assets</p>
        <h1 class="text-3xl font-bold text-slate-900">Assets</h1>
        <p class="text-slate-600">Track company devices and inventory.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add asset</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="asset-search">Search assets</Label>
          <Input id="asset-search" v-model="search" placeholder="Search by name, owner, or ID…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'In use', 'Available', 'In repair']"
              :key="status"
              size="sm"
              :variant="statusFilter === status ? 'default' : 'outline'"
              @click="statusFilter = status as typeof statusFilter"
            >
              {{ status }}
            </Button>
          </div>
        </div>
      </div>

      <div class="grid gap-3 lg:grid-cols-2">
        <Card v-for="asset in filtered" :key="asset.id" class="p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ asset.name }}</p>
              <p class="text-sm text-slate-600">{{ asset.type }} · {{ asset.id }}</p>
              <p class="text-sm text-slate-500">Owner: {{ asset.owner }} · {{ asset.location }}</p>
            </div>
            <Badge :class="statusColor(asset.status)">{{ asset.status }}</Badge>
          </div>
          <div class="flex gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="ghost">Assign</Button>
          </div>
        </Card>
      </div>
    </Card>
  </section>
</template>
