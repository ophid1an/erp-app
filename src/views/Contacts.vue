<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'
import { computed, ref } from 'vue'

type Contact = {
  id: number
  name: string
  role: string
  company: string
  email: string
  phone: string
  status: 'Active' | 'Archived'
}

const contacts = ref<Contact[]>([
  { id: 1, name: 'Maria K.', role: 'HR', company: 'Acme', email: 'maria@acme.com', phone: '+30 210 1234567', status: 'Active' },
  { id: 2, name: 'Alex P.', role: 'Finance', company: 'Speedex', email: 'alex@speedex.gr', phone: '+30 210 2223333', status: 'Active' },
  { id: 3, name: 'Nikos T.', role: 'CTO', company: 'Globex', email: 'nt@globex.com', phone: '+30 210 7654321', status: 'Archived' },
])

const search = ref('')
const filtered = computed(() =>
  contacts.value.filter((c) =>
    [c.name, c.company, c.email].some((field) => field.toLowerCase().includes(search.value.toLowerCase())),
  ),
)

const statusColor = (status: Contact['status']) =>
  status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Management</p>
        <h1 class="text-3xl font-bold text-slate-900">Contacts</h1>
        <p class="text-slate-600">Client and partner contacts.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">Add contact</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="space-y-2">
        <Label for="contacts-search">Search contacts</Label>
        <Input id="contacts-search" v-model="search" placeholder="Search by name, company, or email…" />
      </div>

      <div class="grid gap-3 lg:grid-cols-2">
        <Card v-for="contact in filtered" :key="contact.id" class="p-4 space-y-2">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ contact.name }}</p>
              <p class="text-sm text-slate-600">{{ contact.role }} · {{ contact.company }}</p>
              <p class="text-sm text-slate-500">{{ contact.email }} · {{ contact.phone }}</p>
            </div>
            <Badge :class="statusColor(contact.status)">{{ contact.status }}</Badge>
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
