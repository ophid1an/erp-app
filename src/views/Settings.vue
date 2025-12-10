<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

const settings = [
  { name: 'Company name', value: 'Codeseed', hint: 'Shown on invoices and emails' },
  { name: 'Default currency', value: 'EUR', hint: 'Used for new invoices and expenses' },
  { name: 'Timezone', value: 'Europe/Athens', hint: 'Affects reports and schedules' },
  { name: 'Feature version', value: 'Advanced', hint: 'Determines visible modules' },
]
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Configuration</p>
        <h1 class="text-3xl font-bold text-slate-900">Settings</h1>
        <p class="text-slate-600">Update global settings and defaults.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Reset</Button>
        <Button size="sm">Save changes</Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="item in settings" :key="item.name" class="space-y-2">
          <Label>{{ item.name }}</Label>
          <Input :value="item.value" />
          <p class="text-xs text-slate-500">{{ item.hint }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Badge class="bg-teal-50 text-teal-700">Live</Badge>
        <p class="text-sm text-slate-600">Changes take effect immediately for new records.</p>
      </div>
    </Card>
  </section>
</template>
