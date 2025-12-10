<script setup lang="ts">
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'

const onSubmit = (event: Event) => {
  event.preventDefault()
  // Hook to password change endpoint
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Security</p>
        <h1 class="text-3xl font-bold text-slate-900">Change password</h1>
        <p class="text-slate-600">Update your account password.</p>
      </div>
    </div>

    <Card class="p-6">
      <form class="space-y-4" @submit="onSubmit">
        <div class="space-y-2">
          <Label for="current">Current password</Label>
          <Input id="current" type="password" placeholder="••••••••" required />
        </div>
        <div class="space-y-2">
          <Label for="new">New password</Label>
          <Input id="new" type="password" placeholder="••••••••" required />
        </div>
        <div class="space-y-2">
          <Label for="confirm">Confirm password</Label>
          <Input id="confirm" type="password" placeholder="••••••••" required />
        </div>
        <Button type="submit" class="w-full">Update password</Button>
      </form>
    </Card>
  </section>
</template>
