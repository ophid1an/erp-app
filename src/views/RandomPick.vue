<script setup lang="ts">
import { ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'

const people = ['Alex P.', 'Maria K.', 'Giannis D.', 'Sofia L.', 'Nikos T.', 'Eleni S.', 'Ioanna L.']
const picked = ref<string | null>(null)

const pick = () => {
  const idx = Math.floor(Math.random() * people.length)
  picked.value = people[idx]
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">People</p>
        <h1 class="text-3xl font-bold text-slate-900">Random pick</h1>
        <p class="text-slate-600">Pick a random employee (e.g., for standups, reviews).</p>
      </div>
      <Button size="sm" @click="pick">Pick someone</Button>
    </div>

    <Card class="p-6 text-center space-y-3">
      <p class="text-sm text-slate-600">Click the button to pick</p>
      <div class="flex justify-center">
        <Badge v-if="picked" class="bg-teal-50 text-teal-700 text-lg px-4 py-2">{{ picked }}</Badge>
      </div>
      <Button variant="outline" size="sm" @click="pick">Pick again</Button>
    </Card>
  </section>
</template>
