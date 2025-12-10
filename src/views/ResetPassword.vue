<script setup lang="ts">
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'

const onSubmit = (event: Event) => {
  event.preventDefault()
  // Wire to reset endpoint
}
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-2">
    <div class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Password reset</p>
      <h1 class="text-3xl font-bold">Reset your password</h1>
      <p class="text-slate-600">
        Enter the email associated with your account and we’ll send a reset link. Links expire after 15 minutes.
      </p>
    </div>

    <Card class="p-6">
      <form class="space-y-4" @submit="onSubmit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>

        <Button type="submit" class="w-full">Send reset link</Button>
        <p class="text-center text-sm text-slate-500">
          Remembered it? <RouterLink to="/login" class="text-indigo-600 hover:text-indigo-500">Back to login</RouterLink>
        </p>
      </form>
    </Card>
  </section>
</template>
