<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

type Client = {
  id: number
  name: string
  contact: string
  email: string
  status: 'Active' | 'Prospect' | 'On hold'
  mrr: number
  invoices: number
}

const clients = ref<Client[]>([
  { id: 1, name: 'Acme Corp', contact: 'Maria K.', email: 'maria@acme.com', status: 'Active', mrr: 8200, invoices: 12 },
  { id: 2, name: 'Speedex', contact: 'Nikos T.', email: 'nt@speedex.gr', status: 'Active', mrr: 5400, invoices: 8 },
  { id: 3, name: 'One Seed', contact: 'Alex P.', email: 'alex@seed.gr', status: 'On hold', mrr: 2100, invoices: 4 },
  { id: 4, name: 'Globex', contact: 'Eleni S.', email: 'eleni@globex.com', status: 'Prospect', mrr: 0, invoices: 0 },
  { id: 5, name: 'Initech', contact: 'Ioanna L.', email: 'ioanna@initech.com', status: 'Active', mrr: 4600, invoices: 6 },
])

const search = ref('')
const statusFilter = ref<'All' | Client['status']>('All')

const filtered = computed(() =>
  clients.value.filter((client) => {
    const s = search.value.toLowerCase()
    const matches =
      client.name.toLowerCase().includes(s) ||
      client.contact.toLowerCase().includes(s) ||
      client.email.toLowerCase().includes(s)
    const statusOk = statusFilter.value === 'All' ? true : client.status === statusFilter.value
    return matches && statusOk
  }),
)

const statusColor = (status: Client['status']) => {
  if (status === 'Active') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Prospect') return 'bg-sky-50 text-sky-700'
  return 'bg-amber-50 text-amber-700'
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">CRM</p>
        <h1 class="text-3xl font-bold text-slate-900">Clients</h1>
        <p class="text-slate-600">Customer roster with status, MRR, and contact details.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add client</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div class="md:col-span-2 space-y-2">
          <Label for="client-search">Search clients</Label>
          <Input id="client-search" v-model="search" placeholder="Search by name, contact, or email…" />
        </div>
        <div class="space-y-2">
          <Label>Status</Label>
          <div class="flex gap-2">
            <Button
              v-for="status in ['All', 'Active', 'Prospect', 'On hold']"
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
        <Card v-for="client in filtered" :key="client.id" class="p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ client.name }}</p>
              <p class="text-sm text-slate-600">{{ client.email }}</p>
              <p class="text-sm text-slate-500">Contact: {{ client.contact }}</p>
            </div>
            <Badge :class="statusColor(client.status)">{{ client.status }}</Badge>
          </div>
          <div class="flex items-center gap-4 text-sm text-slate-700">
            <span>MRR: €{{ client.mrr.toLocaleString('en-US') }}</span>
            <span>Invoices: {{ client.invoices }}</span>
          </div>
          <div class="flex gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="ghost">Email</Button>
          </div>
        </Card>
      </div>
    </Card>
  </section>
</template>
