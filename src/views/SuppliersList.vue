<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Supplier = {
  id: number
  name: string
  contact: string
  email: string
  balance: number
  status: 'Active' | 'Suspended'
}

const suppliers = ref<Supplier[]>([
  { id: 1, name: 'Speedex', contact: 'Nikos T.', email: 'nt@speedex.gr', balance: 1240, status: 'Active' },
  { id: 2, name: 'OfficeMart', contact: 'Eleni S.', email: 'eleni@officemart.com', balance: 320, status: 'Active' },
  { id: 3, name: 'Travel SA', contact: 'Dimitris K.', email: 'dk@travel-sa.gr', balance: 0, status: 'Suspended' },
  { id: 4, name: 'CloudCo', contact: 'Maria P.', email: 'mp@cloudco.com', balance: 480, status: 'Active' },
])

const search = ref('')

const filtered = computed(() =>
  suppliers.value.filter((sup) => {
    const s = search.value.toLowerCase()
    return sup.name.toLowerCase().includes(s) || sup.contact.toLowerCase().includes(s) || sup.email.toLowerCase().includes(s)
  }),
)

const statusColor = (status: Supplier['status']) =>
  status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Vendors</p>
        <h1 class="text-3xl font-bold text-slate-900">Suppliers</h1>
        <p class="text-slate-600">Manage supplier balances and contacts.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add supplier</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="supplier-search">Search suppliers</Label>
          <Input id="supplier-search" v-model="search" placeholder="Search by name, contact, or email…" />
        </div>
      </div>

      <div class="grid gap-3 lg:grid-cols-2">
        <Card v-for="sup in filtered" :key="sup.id" class="p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ sup.name }}</p>
              <p class="text-sm text-slate-600">{{ sup.email }}</p>
              <p class="text-sm text-slate-500">Contact: {{ sup.contact }}</p>
            </div>
            <Badge :class="statusColor(sup.status)">{{ sup.status }}</Badge>
          </div>
          <p class="text-sm text-slate-700">Open balance: €{{ sup.balance.toLocaleString('en-US') }}</p>
          <div class="flex gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="ghost">Pay</Button>
          </div>
        </Card>
      </div>
    </Card>
  </section>
</template>
